package com.coweave.backend.controller;

import com.coweave.backend.dto.CodeEditMessage;
import com.coweave.backend.service.DocumentStateService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class CodeEditorController {

    private final DocumentStateService documentStateService;
    private final SimpMessagingTemplate messagingTemplate;

    // Inject the Redis service into our controller
    public CodeEditorController(DocumentStateService documentStateService, SimpMessagingTemplate messagingTemplate) {
        this.documentStateService = documentStateService;
        this.messagingTemplate = messagingTemplate;
    }

    // When a user sends a message to /app/code.edit
    @MessageMapping("/code.edit")
    public void handleCodeEdit(CodeEditMessage message) {
        // 1. Save the latest code to Redis (This is already working perfectly!)
        documentStateService.saveDocumentState(message.getDocumentId(), message.getContent());

        // 2. Dynamically build the room URL based on the document ID
        String destination = "/topic/document/" + message.getDocumentId();

        // 3. Broadcast the exact message ONLY to users subscribed to that specific room
        messagingTemplate.convertAndSend(destination, message);
    }
}
