package com.ecowatch.controller;

import com.ecowatch.model.User;
import com.ecowatch.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:8081")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    // Get user profile by ID
    @GetMapping("/{userId}")
    public User getProfile(@PathVariable Long userId) {
        return profileService.getProfile(userId);
    }

    // Update user profile
    @PutMapping("/{userId}")
    public User updateProfile(@PathVariable Long userId, @RequestBody User updatedUser) {
        return profileService.updateProfile(userId, updatedUser);
    }
}
