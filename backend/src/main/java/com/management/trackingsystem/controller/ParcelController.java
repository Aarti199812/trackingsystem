package com.management.trackingsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.management.trackingsystem.model.Parcel;
import com.management.trackingsystem.service.ParcelService;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/parcels")
@CrossOrigin(origins = "http://localhost:3000") 
public class ParcelController {

    @Autowired
    private ParcelService parcelService;


    @PostMapping("/book")
    public ResponseEntity<Parcel> bookParcel(@RequestBody Parcel parcel) {
       
        return ResponseEntity.ok(parcelService.bookParcel(parcel));
    }

   
    @GetMapping("/track/{trackingId}")
    public ResponseEntity<Parcel> trackParcel(@PathVariable String trackingId) {
        try {
            Parcel parcel = parcelService.getParcelByTrackingId(trackingId);
            return ResponseEntity.ok(parcel);
        } catch (RuntimeException e) {
            
            return ResponseEntity.notFound().build();
        }
    }

    // 3. Admin View: Saare bookings ki list dekhne ke liye (Optional but useful)
    // Iske liye Service mein 'getAllParcels' method hona chahiye
    /*
    @GetMapping("/all")
    public ResponseEntity<List<Parcel>> getAllParcels() {
        return ResponseEntity.ok(parcelService.getAllParcels());
    }
    */
}