package com.coweave.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // this turns on the web socket server
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {

        // this url would be used by frontend to connect to the socket
        registry.addEndpoint("/ws-coweave").setAllowedOriginPatterns("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        // the server broadcast the message to any url starting with topic
        registry.enableSimpleBroker("/topic");

        // any message send from frontend to the server must start with app
        registry.setApplicationDestinationPrefixes("/app");
    }
}
