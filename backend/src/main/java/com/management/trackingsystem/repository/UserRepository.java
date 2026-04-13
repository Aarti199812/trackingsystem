package com.management.trackingsystem.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.management.trackingsystem.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}