package com.management.trackingsystem.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "parcels")
@Data
public class Parcel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name ="tracking_id", unique = true, nullable = false)
    private String trackingId;

    private String senderName;
    private String recipientName;
    private String sourceAddress;  
    private String destinationAddress;
    private double weight;
    private String status;
    
    @Column(name= "created_at", updatable = false)
    private LocalDateTime createdAt= LocalDateTime.now();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

