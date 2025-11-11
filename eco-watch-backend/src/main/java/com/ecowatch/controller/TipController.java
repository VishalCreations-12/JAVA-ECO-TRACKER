package com.ecowatch.controller;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081") // Allow Vite frontend
@RestController
@RequestMapping("/api/tips")
public class TipController {

    @GetMapping
    public List<String> getTips() {
        // Sample energy-saving tips
        return List.of(
                "Turn off lights when not in use",
                "Unplug chargers to save standby power",
                "Use energy-efficient appliances",
                "Switch to LED bulbs"
        );
    }
}
