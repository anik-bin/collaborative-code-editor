package com.coweave.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // this class handles web request in spring
@RequestMapping("/api/health") // base url

public class HealthController {
    @GetMapping // maps http get requests
    public String checkHealth() {
        return "Coweave backend is running successfully";
    }
}
