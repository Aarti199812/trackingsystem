package com.management.trackingsystem.service;

import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.management.trackingsystem.model.Parcel;
import com.management.trackingsystem.repository.ParcelRepository;

@Service
public class ParcelService {

    @Autowired
    private ParcelRepository parcelRepository;

    public Parcel bookParcel(Parcel parcel) {
        // 1. Porter-style Tracking ID (Same as your logic, just making it look official)
        String trackingId = "PRT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        parcel.setTrackingId(trackingId);

        // 2. PRICING LOGIC (Asli Porter Touch)
        double baseFare = 40.0; // Minimum charges
        double perKmRate = 0.0;

        // Check null to avoid errors
        String vehicle = (parcel.getVehicleType() != null) ? parcel.getVehicleType().toLowerCase() : "bike";

        // Rates define karein
        switch (vehicle) {
            case "bike":
                perKmRate = 10.0;
                break;
            case "tata ace":
                perKmRate = 25.0;
                break;
            case "pickup 8ft":
                perKmRate = 45.0;
                break;
            default:
                perKmRate = 12.0; // Default bike/scooter rate
        }

        // Formula: Base Fare + (Distance * Rate)
        double total = baseFare + (parcel.getDistanceKm() * perKmRate);
        
        // Final Price set karein (2 decimal points tak round karke)
        parcel.setTotalPrice(Math.round(total * 100.0) / 100.0);

        // 3. Initial Status
        parcel.setStatus("SEARCHING_DRIVER");

        return parcelRepository.save(parcel);
    }

    public Parcel getParcelByTrackingId(String trackingId) {
        return parcelRepository.findByTrackingId(trackingId)
                .orElseThrow(() -> new RuntimeException("Parcel not found with tracking ID: " + trackingId));
    }

    public List<Parcel> getAllParcels(){
        return parcelRepository.findAll();
    }

    public Parcel updateParcelStatus(String trackingId, String newStatus){
        Parcel parcel = parcelRepository.findByTrackingId(trackingId).orElseThrow(
                ()-> new RuntimeException("Parcel not found")
        );
        parcel.setStatus(newStatus);

        return parcelRepository.save(parcel);
    }
}