package com.management.trackingsystem.controller;

import com.management.trackingsystem.dto.ParcelRequest;
import com.management.trackingsystem.model.Parcel;
import com.management.trackingsystem.repository.ParcelRepository;
import com.management.trackingsystem.model.User;
import com.management.trackingsystem.repository.UserRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.management.trackingsystem.service.RouteService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/tracking")
public class TrackingController {

    private final ParcelRepository parcelRepository;
    @Autowired
    private RouteService routeService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/confirm")
    public ResponseEntity<?> confirmParcel(@RequestBody ParcelRequest request) {
        try {

            // 🔥 CHECK userId
            if (request.getUserId() == null) {
                return ResponseEntity.badRequest().body("UserId is missing!");
            }

            // 🔹 Fetch user from DB
            User user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // 🔹 Create Parcel entity
            Parcel parcel = new Parcel();

            parcel.setTrackingId(request.getTrackingId());
            parcel.setSenderName(request.getSenderName());
            parcel.setRecipientName(request.getRecipientName());
            parcel.setSenderPhone(request.getSenderPhone());
            parcel.setRecipientPhone(request.getRecipientPhone());
            parcel.setSourceAddress(request.getSourceAddress());
            parcel.setDestinationAddress(request.getDestinationAddress());
            parcel.setWeight(request.getWeight());
            parcel.setDistanceKm(request.getDistanceKm());
            parcel.setTotalPrice(request.getTotalPrice());
            parcel.setVehicleType(request.getVehicleType());

            // 🔥 IMPORTANT
            parcel.setStatus("Pending");
            parcel.setUser(user);

            // 🔹 Save
            Parcel savedParcel = parcelRepository.save(parcel);

            return ResponseEntity.ok(savedParcel);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    TrackingController(ParcelRepository parcelRepository) {
        this.parcelRepository = parcelRepository;
    }

    @GetMapping("/get-distance")
    public ResponseEntity<String> getDistance(
            @RequestParam double sLat, @RequestParam double sLng, 
            @RequestParam double dLat, @RequestParam double dLng) {
        
        return ResponseEntity.ok(routeService.getRouteDetails(sLat, sLng, dLat, dLng));
    }
    
    
    @GetMapping("/get-fare")
    public ResponseEntity<Map<String, Object>> getFare(
            @RequestParam String from, 
            @RequestParam String to,
            @RequestParam(defaultValue = "truck") String vehicleType) { // vehicleType add kiya gaya hai
        
        try {
            // Sahi API Key aur URL construction
            String apiKey = "cwxcHxXicaBBKaSkoxVde0GZ3CQC52FPnL3N06ftYUNhHNzqVuLth3rAc2DZ2rLX";
            
            // Cleaned up the URL to use dynamic 'from' and 'to'
            String url = "https://api.distancematrix.ai/maps/api/distancematrix/json?origins=" 
                         + from.replace(" ", "+") 
                         + "&destinations=" + to.replace(" ", "+") 
                         + "&key=" + apiKey;

            RestTemplate restTemplate = new RestTemplate();
            
            @SuppressWarnings("unchecked")
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);

            // API Response Validation
            if (response == null || !"OK".equals(response.get("status"))) {
                System.out.println("API Error Response: " + response);
                return ResponseEntity.status(400).body(null);
            }

            // Parsing the distance data
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> rows = (List<Map<String, Object>>) response.get("rows");
            
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> elementsList = (List<Map<String, Object>>) rows.get(0).get("elements");
            Map<String, Object> element = elementsList.get(0);

            // Check if distance exists for the route
            if (!"OK".equals(element.get("status"))) {
                return ResponseEntity.status(400).body(null);
            }

            @SuppressWarnings("unchecked")
            Map<String, Object> distanceObj = (Map<String, Object>) element.get("distance");
            
            String distanceText = (String) distanceObj.get("text");
            // Distance string se number extract kar rahe hain (e.g. "200 km" -> 200.0)
            double distanceValue = Double.parseDouble(distanceText.replaceAll("[^0-9.]", ""));

            // --- Calculation Logic Based on Vehicle Type ---
            double ratePerKm;
            double baseFare;

            if ("bike".equalsIgnoreCase(vehicleType)) {
                ratePerKm = 20.0;  // Bike rate as requested
                baseFare = 40.0;   // Minimum bike fare
            } else {
                ratePerKm = 55.0;  // Truck rate (existing logic)
                baseFare = 500.0;  // Minimum truck fare
            }

            double totalFare = baseFare + (distanceValue * ratePerKm);

            // Final Response taiyaar kar rahe hain
            Map<String, Object> result = new HashMap<>();
            result.put("distance", distanceText);
            result.put("fare", Math.round(totalFare)); // Numeric value bhej rahe hain (Frontend pe ₹ khud laga hua hai)
            result.put("vehicleType", vehicleType);

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            System.err.println("Exception in getFare: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}