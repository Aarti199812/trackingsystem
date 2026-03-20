package com.management.trackingsystem.service;

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

        String trackingId = "TRK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        parcel.setTrackingId(trackingId);
        parcel.setStatus("Booked");

        return parcelRepository.save(parcel);
    }

    public Parcel getParcelByTrackingId(String trackingId) {

        return parcelRepository.findByTrackingId(trackingId)
                .orElseThrow(() -> new RuntimeException("Parcel not found with tracking ID: " + trackingId));
    }
}