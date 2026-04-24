package com.management.trackingsystem.service;

import com.management.trackingsystem.dto.ParcelRequest;
import com.management.trackingsystem.model.Parcel;
import com.management.trackingsystem.model.User;
import com.management.trackingsystem.repository.ParcelRepository;
import com.management.trackingsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ParcelService {
    public List<Parcel> getAllParcels() {
        return parcelRepository.findAll();
    }

        public void updateParcelStatus(long id, String status) {
            Parcel parcel = parcelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parcel not found"));
            parcel.setStatus(status);
            parcelRepository.save(parcel);
        }

    @Autowired
    private ParcelRepository parcelRepository;

    @Autowired
    private UserRepository userRepository;

    public Parcel bookParcel(ParcelRequest request) {

        if (request == null) {
            throw new RuntimeException("Invalid request");
        }

        if (request.getUserId() == null) {
            throw new RuntimeException("UserId is missing");
        }
        if (request.getUserId() == null || request.getUserId() <= 0) {
            throw new RuntimeException("Invalid userId");
        }

        Optional<User> userOptional = userRepository.findById(request.getUserId());

        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOptional.get();

        Parcel parcel = new Parcel();

        parcel.setSenderName(request.getSenderName());
        parcel.setRecipientName(request.getRecipientName());
        parcel.setSenderPhone(request.getSenderPhone());
        parcel.setSourceAddress(request.getSourceAddress());
        parcel.setDestinationAddress(request.getDestinationAddress());
        parcel.setWeight(request.getWeight());
        parcel.setDistanceKm(request.getDistanceKm());

        String vehicleType = request.getVehicleType();
        if (vehicleType != null) {
            vehicleType = vehicleType.toLowerCase().trim();
        } else {
            vehicleType = "";
        }

        parcel.setVehicleType(vehicleType);

        String trackingId = "PRT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        parcel.setTrackingId(trackingId);

        double baseFare = 40.0;
        double perKmRate;

        switch (vehicleType) {
            case "bike" -> perKmRate = 10.0;
            case "tata ace" -> perKmRate = 25.0;
            case "pickup 8ft" -> perKmRate = 45.0;
            default -> perKmRate = 12.0;
        }

        double total = baseFare + (parcel.getDistanceKm() * perKmRate);
        parcel.setTotalPrice(Math.round(total * 100.0) / 100.0);

        parcel.setStatus("SEARCHING_DRIVER");

        parcel.setUser(user);

        return parcelRepository.save(parcel);
    }
    public Parcel getParcelById(long id) {
        return parcelRepository.findById(id)
                .orElse(null);
    }   
    public Parcel saveParcel(Parcel parcel) {
        return parcelRepository.save(parcel);
    }   
    public List<Parcel> getParcelsByUsserId(Long userId){
        return parcelRepository.findByUserId(userId);
    }
}