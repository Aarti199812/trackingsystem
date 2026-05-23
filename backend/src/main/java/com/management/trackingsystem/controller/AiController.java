package com.management.trackingsystem.controller;

import com.management.trackingsystem.service.AiService;
import org.springframework.web.bind.annotation.CrossOrigin; 
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    // Endpoint: http://localhost:9023/api/ai/ask?prompt=Hello
    @GetMapping("/api/ai/ask")
    public String askQuestion(@RequestParam(value = "prompt") String prompt) {
        return aiService.askAi(prompt);
    }
}