package com.management.trackingsystem.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.management.trackingsystem.model.User;
import com.management.trackingsystem.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        try {
            java.util.List<User> users = userRepository.findAll();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching users: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginData) {

        if (loginData.getEmail() == null || loginData.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email and password required");
        }

        Optional<User> userOptional = userRepository.findByEmail(loginData.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getPassword() != null &&
                user.getPassword().equals(loginData.getPassword())) {

                // ✅ SAFE RESPONSE (NO PASSWORD)
                return ResponseEntity.ok(Map.of(
                        "id", user.getId(),
                        "email", user.getEmail(),
                        "role", user.getRole()
                ));

            } else {
                return ResponseEntity.status(401).body("Invalid password");
            }
        }

        return ResponseEntity.status(404).body("User not found");
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){

        if(user.getName()==null || user.getEmail()== null || user.getPassword() == null){
            return ResponseEntity.badRequest().body("Name, Email and Password are required");
        }

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if(existingUser.isPresent()){
            return ResponseEntity.status(409).body("user alread exists with this email.");
        }
        user.setRole("USER");
        User savedUser = userRepository.save(user);

        return ResponseEntity.ok(Map.of(
                "message","user registered successfully",
                "id", savedUser.getId(),
                "name", savedUser.getName(),
                "email", savedUser.getEmail(),
                "role", savedUser.getRole()
        ));
    }

}