package com.management.trackingsystem.controller;

import com.management.trackingsystem.dto.ParcelRequest;
import com.management.trackingsystem.model.Parcel;
import com.management.trackingsystem.service.ParcelService;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/parcels")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT})
public class ParcelController {

    @Autowired
    private ParcelService parcelService;

    
    @PostMapping("/book")
    public ResponseEntity<?> bookParcel(@RequestBody ParcelRequest request) {
        try {
            if (request.getUserId() == null) {
                return ResponseEntity.badRequest().body("Error: User ID missing!");
            }
            Parcel parcel = parcelService.bookParcel(request);
            return ResponseEntity.ok(parcel);
        } catch (Exception e) {
            e.printStackTrace(); 
            return ResponseEntity.badRequest().body("Booking Failed: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getParcelsByUserId(@PathVariable Long userId) {
        try {
            List<Parcel> userParcels = parcelService.getAllParcels()
                .stream()
                .filter(p -> p.getUser() != null && p.getUser().getId().equals(userId))
                .collect(Collectors.toList());
            return ResponseEntity.ok(userParcels);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching user data: " + e.getMessage());
        }
    }

    
    @GetMapping("/all")
    public ResponseEntity<?> getAllParcels() {
        try {
            return ResponseEntity.ok(parcelService.getAllParcels());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    
    @PutMapping("/update-status/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable long id, @RequestBody Map<String, String> statusUpdate) {
        try {
            String status = statusUpdate.get("status");
            parcelService.updateParcelStatus(id, status);
            return ResponseEntity.ok("Status updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/track/{trackingId}")
    public ResponseEntity<?> getParcelByTrackingId(@PathVariable String trackingId) {
    try {
        Parcel parcel = parcelService.getParcelByTrackingId(trackingId);
        return ResponseEntity.ok(parcel);
    } catch (Exception e) {
        return ResponseEntity.status(404).body(e.getMessage());
    }
}

    
}