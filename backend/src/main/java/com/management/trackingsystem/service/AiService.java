package com.management.trackingsystem.service;

import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.stereotype.Service;

@Service
public class AiService {

    private final OpenAiChatModel chatModel;

    public AiService(OpenAiChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String askAi(String prompt) {
        try {
            return chatModel.call(prompt);
        } catch (Exception e) {
            System.err.println("OpenAI API Connection Failed: " + e.getMessage());
            return "AI Service error: " + e.getMessage();
        }
    } 
} 