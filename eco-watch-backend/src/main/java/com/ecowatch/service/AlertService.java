package com.ecowatch.service;

import com.ecowatch.model.Alert;
import com.ecowatch.model.User;
import com.ecowatch.repository.AlertRepository;
import com.ecowatch.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlertService {
    private final AlertRepository alertRepository;
    private final UserRepository userRepository;

    public Alert createAlert(Long userId, String message) {
        User user = userRepository.findById(userId).orElseThrow();
        Alert alert = Alert.builder()
                .user(user)
                .message(message)
                .read(false)
                .build();
        return alertRepository.save(alert);
    }

    public List<Alert> getUserAlerts(Long userId) {
        return alertRepository.findByUserIdOrderByIdDesc(userId);
    }

    public Alert markAsRead(Long alertId) {
        Alert alert = alertRepository.findById(alertId).orElseThrow();
        alert.setRead(true);
        return alertRepository.save(alert);
    }
}
