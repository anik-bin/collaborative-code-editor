package com.coweave.backend.service;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class DocumentStateService {

    private final StringRedisTemplate redisTemplate;

    public DocumentStateService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    // this saves the latest code to redis
    public void saveDocumentState(String documentId, String content) {
        redisTemplate.opsForValue().set("doc:" + documentId, content);
    }

    // fetch the code when a new user joins
    public String getDocumentContent(String documentId) {
        String content = redisTemplate.opsForValue().get("doc:" + documentId);
        return content != null ? content : ""; // return empty string if document is new
    }
}
