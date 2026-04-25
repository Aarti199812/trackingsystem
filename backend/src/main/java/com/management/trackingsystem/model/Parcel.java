package com.management.trackingsystem.model;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "parcels")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Parcel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @Column(name = "tracking_id", unique = true, nullable = false)
    private String trackingId;

    @Column(nullable = false)
    private String senderName;

    @Column(nullable = false)
    private String recipientName;

    @Column(nullable = false)
    private String sourceAddress;

    @Column(nullable = false)
    private String destinationAddress;

    @Column(nullable = false)
    private double weight; // In KG

    @Column(nullable = false)
    private String status; // Pending, In-Transit, etc.

    @Column(nullable = false)
    private String vehicleType; // 3 Wheeler, Tata Ace, etc.

    @Column(nullable = false)
    private double totalPrice;

    @Column(nullable = false)
    private double distanceKm;

    @Column(nullable = false)
    private String senderPhone;

    @Column(nullable = false)
    private String recipientPhone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = "Pending";
        }
    }
}