package com.management.trackingsystem.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.management.trackingsystem.model.Parcel;

@Repository
public interface ParcelRepository extends JpaRepository<Parcel, Long> {
    Optional<Parcel> findByTrackingId(String trackingId);
    List<Parcel> findByUserId(Long userId);
 
}