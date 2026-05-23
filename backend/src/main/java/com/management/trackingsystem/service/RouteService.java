package com.management.trackingsystem.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

@Service
public class RouteService {

    private final String orsApiKey;
    private final RestTemplate restTemplate;


    public RouteService(@Value("${ors.api.key:dummy_key_backup}") String orsApiKey) {
        this.orsApiKey = orsApiKey;
        this.restTemplate = new RestTemplate(); 
    }

    public String getRouteDetails(double startLat, double startLng, double endLat, double endLng) {
        
        String url = String.format(
            "https://api.distancematrix.ai/maps/api/distancematrix/json?origins=%f,%f&destinations=%f,%f&key=%s",
            startLat, startLng, endLat, endLng, orsApiKey
        );

        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            return response.getBody();
        } catch (Exception e) {
            return "{\"status\": \"ERROR\", \"message\": \"" + e.getMessage() + "\"}";
        }
    }
}