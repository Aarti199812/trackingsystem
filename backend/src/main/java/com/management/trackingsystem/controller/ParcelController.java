package com.management.trackingsystem.controller;

import com.management.trackingsystem.dto.ParcelRequest;
import com.management.trackingsystem.model.Parcel;
import com.management.trackingsystem.service.ParcelService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/parcels")
@CrossOrigin(origins = "http://localhost:3000")
public class ParcelController {

    @Autowired
    private ParcelService parcelService;

    @PostMapping("/book")
    public ResponseEntity<?> bookParcel(@RequestBody ParcelRequest request) {
        try {
            Parcel parcel = parcelService.bookParcel(request);
            return ResponseEntity.ok(parcel);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<Parcel>> getAllParcels() {
        List<Parcel> parcels = parcelService.getAllParcels();
        return ResponseEntity.ok(parcels);
    }

    @PutMapping("/update-status/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable long id, @RequestBody Map<String,String> payload) {
            String status = payload.get("status");
            parcelService.updateParcelStatus(id, status);
            return ResponseEntity.ok("Status updated successfully");
    }
    
}