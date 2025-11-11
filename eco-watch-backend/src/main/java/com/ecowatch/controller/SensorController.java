package com.ecowatch.controller;

import com.ecowatch.model.SensorData;
import com.ecowatch.service.AuthService;
import com.ecowatch.service.SensorDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000") // Adjust to your frontend port
@RestController
@RequestMapping("/api/sensors")
public class SensorController {

    private final SensorDataService sensorDataService;
    private final AuthService authService;

    @Autowired
    public SensorController(SensorDataService sensorDataService, AuthService authService) {
        this.sensorDataService = sensorDataService;
        this.authService = authService;
    }

    // ✅ Get all sensor readings
    @GetMapping
    public List<SensorData> getAll() {
        return sensorDataService.getAll();
    }

    // ✅ Get reading by ID
    @GetMapping("/{id}")
    public ResponseEntity<SensorData> getById(@PathVariable Long id) {
        return sensorDataService.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Get sensor readings for a specific user by ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SensorData>> getByUserId(@PathVariable Long userId) {
        List<SensorData> readings = sensorDataService.getByUserId(userId);
        if (readings.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(readings);
    }

    // ✅ Get total energy usage for a user
    @GetMapping("/user/{userId}/total")
    public ResponseEntity<Map<String, Object>> getTotalEnergy(@PathVariable Long userId) {
        Integer total = sensorDataService.getByUserId(userId)
                .stream()
                .mapToInt(SensorData::getEnergyUsage)
                .sum();

        Map<String, Object> response = new HashMap<>();
        response.put("userId", userId);
        response.put("totalEnergyUsage", total);

        return ResponseEntity.ok(response);
    }

    // Delete a reading
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        sensorDataService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
