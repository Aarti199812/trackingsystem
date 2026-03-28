package com.management.trackingsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.management.trackingsystem.model.Parcel;
import com.management.trackingsystem.service.ParcelService;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/parcels")
@CrossOrigin(origins = "http://localhost:3000") 
public class ParcelController {

    @Autowired
    private ParcelService parcelService;

    // 1. Book parcel
    @PostMapping("/book")
    public ResponseEntity<Parcel> bookParcel(@RequestBody Parcel parcel) {
       
        return ResponseEntity.ok(parcelService.bookParcel(parcel));
    }

   // 2. Tracking parcel by tracking ID
    @GetMapping("/track/{trackingId}")
    public ResponseEntity<Parcel> trackParcel(@PathVariable String trackingId) {
        try {
            Parcel parcel = parcelService.getParcelByTrackingId(trackingId);
            return ResponseEntity.ok(parcel);
        } catch (RuntimeException e) {
            
            return ResponseEntity.notFound().build();
        }
    }

    //3. Get all parcels (Admin dashboard)
    @GetMapping("/all")
    public ResponseEntity<List<Parcel>> getAllParcels(){
        return ResponseEntity.ok(parcelService.getAllParcels());
    }

    //4. Update parcel status
    @PutMapping("/update-status/{trackingId}")
    public ResponseEntity<Parcel> updateParcelStatus(@PathVariable String trackingId, @RequestParam String status){
        try {
            Parcel updateParcel = parcelService.updateParcelStatus(trackingId, status);
            return ResponseEntity.ok(updateParcel);
        }catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }
}