package com.coweave.backend.controller;

import com.coweave.backend.service.DocumentStateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*") // Allows the frontend to talk
public class DocumentController {

    private final DocumentStateService documentStateService;

    public DocumentController(DocumentStateService documentStateService) {
        this.documentStateService = documentStateService;
    }

    // When the frontend asks for a specific document
    @GetMapping("/{documentId}")
    public ResponseEntity<String> getDocument(@PathVariable String documentId) {
        // Fetch the saved code from Redis
        String content = documentStateService.getDocumentContent(documentId);

        return ResponseEntity.ok(content);
    }
}
