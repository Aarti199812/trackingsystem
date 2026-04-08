package com.management.trackingsystem.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "parcels")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Parcel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tracking_id", unique = true, nullable = false)
    private String trackingId;

    private String senderName;
    private String recipientName;
    private String sourceAddress;
    private String destinationAddress;
    private double weight;
    private String status;
    private String vehicleType;
    private double totalPrice;

    private double distanceKm;

    private String senderPhone;
    private String recipientPhone;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}