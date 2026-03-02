package com.coweave.backend.controller;

import com.coweave.backend.dto.CodeEditMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CodeEditorController {

    // When a user sends a message to /app/code.edit
    @MessageMapping("/code.edit")

    // broadcast the return value to everyone subscribed to /topic/code-updates
    @SendTo("/topic/code-updates")

    public CodeEditMessage broadcastCodeChange(CodeEditMessage message) {
        // Right now, we just instantly pass the message through to everyone else.
        // In Phase 4, we will use Redis here to save the state!
        return message;
    }
}
