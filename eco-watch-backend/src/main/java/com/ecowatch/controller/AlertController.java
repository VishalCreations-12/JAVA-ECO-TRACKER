package com.ecowatch.controller;

import com.ecowatch.model.Alert;
import com.ecowatch.service.AlertService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8081")
public class AlertController {

    private final AlertService alertService;

    @PostMapping("/{userId}")
    public ResponseEntity<Alert> createAlert(@PathVariable Long userId, @RequestBody CreateAlertRequest request) {
        return ResponseEntity.ok(alertService.createAlert(userId, request.getMessage()));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Alert>> getUserAlerts(@PathVariable Long userId) {
        return ResponseEntity.ok(alertService.getUserAlerts(userId));
    }

    @PutMapping("/{alertId}/read")
    public ResponseEntity<Alert> markAsRead(@PathVariable Long alertId) {
        return ResponseEntity.ok(alertService.markAsRead(alertId));
    }

    @Data
    public static class CreateAlertRequest {
        private String message;
    }
}
