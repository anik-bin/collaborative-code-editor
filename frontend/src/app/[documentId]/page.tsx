'use client';
import { useCodeEditor } from "@/hooks/useCodeEditor";
import { Editor } from "@monaco-editor/react";
import { useParams, useSearchParams } from "next/navigation";

export default function DocumentPage() {

    const params = useParams();
    const searchParams = useSearchParams();

    const documentId = params.documentId as string;

    // When the pass the homepage, assign them a name
    const currentUser = searchParams.get('user') || `User_${Math.floor(Math.random() * 10000)}`;


    const {code, isConnected, sendCodeUpdate} = useCodeEditor(documentId, currentUser);

    const handleEditorChange = (value: string | undefined) => {
        if(value !== undefined) {
            sendCodeUpdate(value);
        }
    };

    return (
        <main className="flex h-screen flex-col bg-[#1e1e1e] text-white">
            <header className="flex items-center justify-between bg-[#2d2d2d] px-6 py-3 border-b border-gray-700">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold text-blue-400">CoWeave</h1>
                    <span className="text-sm text-gray-400 border-l border-gray-600 pl-4">
                        Room: <span className="text-white font-mono">{documentId}</span>
                    </span>
                    <span className="text-sm text-gray-400 border-l border-gray-600 pl-4">
                        User: <span className="text-white">{currentUser}</span>
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm font-medium text-gray-300">
                        {isConnected ? 'Connected' : 'Disconnected'}
                    </span>
                </div>
            </header>

            <div className="flex-grow w-full pt-4">
                <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    theme="vs-dark"
                    value={code}
                    onChange={handleEditorChange}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 16,
                        wordWrap: 'on',
                        padding: { top: 16 }
                    }}
                />
            </div>
        </main>
    );
}