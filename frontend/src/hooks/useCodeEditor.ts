import { useCallback, useEffect, useRef, useState } from "react"
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const useCodeEditor = (documentId: string, currentUser: string) => 
{
    const [code, setCode] = useState<string>('');
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const stompClientRef = useRef<Client | null>(null);
    const debouncedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(()=> {

        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
        const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:8080';

        // fetch the initial saved state from redis API
        fetch(`${API_BASE_URL}/api/documents/${documentId}`)
            .then(res => res.text())
            .then(initialCode => {
                if (initialCode) setCode(initialCode)
            })
            .catch(err => console.error("Failed to fetch initial code", err));

        // setup websocket

        const client = new Client({
            webSocketFactory: ()=> new SockJS(`${WS_BASE_URL}/ws-coweave`),
            reconnectDelay: 5000,

            onConnect: ()=> {
                console.log("✅ Connected to coweave server");
                setIsConnected(true);

                // subscribe to broadcast channel code
                client.subscribe(`/topic/document/${documentId}`, (message)=> {
                    const receivedData = JSON.parse(message.body);


                    // function to check and only update if message came from someone else
                    if(receivedData.sender !== currentUser) {
                        setCode(receivedData.content);
                    }
                });
            },
            onDisconnect: ()=> {
                console.log("❌ Server disconnected");
                setIsConnected(false);
            }
        });

        // start connection
        client.activate();
        stompClientRef.current = client;

        // Disconnect when the user leaves function
        return ()=> {
            client.deactivate();
            if (debouncedTimeoutRef.current) clearTimeout(debouncedTimeoutRef.current);
        };
    }, [documentId, currentUser]);

    // Function for the UI to send code updates to the server

    const sendCodeUpdate = useCallback((newCode: string)=> {
        setCode(newCode);

        if(debouncedTimeoutRef.current) {
            clearTimeout(debouncedTimeoutRef.current);
        }

        debouncedTimeoutRef.current = setTimeout(() => {
            if (stompClientRef.current && stompClientRef.current.connected) {
                stompClientRef.current.publish({
                    destination: '/app/code.edit',
                    body: JSON.stringify({
                        documentId: documentId,
                        content: newCode,
                        sender: currentUser
                    })
                });
            }
        }, 300);
    }, [documentId, currentUser]);

    return { code, isConnected, sendCodeUpdate };
}

