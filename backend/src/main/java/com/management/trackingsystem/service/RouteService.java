package com.management.trackingsystem.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;


@Service
public class RouteService {

    private final String orsApiKey;
    private final RestTemplate restTemplate;

    // Constructor Injection (Best Practice)
    public RouteService(@Value("${ors.api.key}") String orsApiKey) {
        this.orsApiKey = orsApiKey;
        this.restTemplate = new RestTemplate(); 
    }

    public String getRouteDetails(double startLat, double startLng, double endLat, double endLng) {
        // %f coordinates ke liye sahi hai
        String url = String.format(
            "https://api.distancematrix.ai/maps/api/distancematrix/json?origins=51.4822656,-0.1933769&destinations=51.4994794,-0.1269979&key=cwxcHxXicaBBKaSkoxVde0GZ3CQC52FPnL3N06ftYUNhHNzqVuLth3rAc2DZ2rLX",
            startLat, startLng, endLat, endLng, orsApiKey
        );

        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            return response.getBody();
        } catch (Exception e) {
            // Log error here in real app
            return "{\"status\": \"ERROR\", \"message\": \"" + e.getMessage() + "\"}";
        }
    }
}