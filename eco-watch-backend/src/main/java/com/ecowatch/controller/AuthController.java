package com.ecowatch.controller;

import com.ecowatch.model.User;
import com.ecowatch.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    // =======================
    // ✅ REGISTER
    // =======================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            // Encode password before saving
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = authService.register(user);

            // Prepare response
            Map<String, Object> response = new HashMap<>();
            response.put("id", savedUser.getId());
            response.put("name", savedUser.getName());
            response.put("email", savedUser.getEmail());

            return ResponseEntity.ok(response);

        } catch (DataIntegrityViolationException e) {
            // Handle duplicate email (unique constraint)
            return ResponseEntity.status(400)
                    .body("Signup failed: Email already exists.");
        } catch (Exception e) {
            // Other unexpected errors
            return ResponseEntity.status(500)
                    .body("Signup failed: " + e.getMessage());
        }
    }

    // =======================
    // ✅ LOGIN
    // =======================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            // Authenticate user
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );

            // Fetch user details
            User foundUser = authService.getUserByEmail(user.getEmail());

            // Prepare response
            Map<String, Object> response = new HashMap<>();
            response.put("id", foundUser.getId());
            response.put("name", foundUser.getName());
            response.put("email", foundUser.getEmail());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401)
                    .body("Login failed: Invalid credentials");
        }
    }
}
