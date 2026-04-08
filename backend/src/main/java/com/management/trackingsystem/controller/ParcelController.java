package com.management.trackingsystem.controller;

import com.management.trackingsystem.dto.ParcelRequest;
import com.management.trackingsystem.model.Parcel;
import com.management.trackingsystem.service.ParcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}