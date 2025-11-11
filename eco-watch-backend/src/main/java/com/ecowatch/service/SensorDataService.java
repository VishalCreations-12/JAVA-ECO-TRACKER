package com.ecowatch.service;

import com.ecowatch.model.SensorData;
import com.ecowatch.model.User;
import com.ecowatch.repository.SensorDataRepository;
import com.ecowatch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SensorDataService {

    private final SensorDataRepository sensorDataRepository;
    private final UserRepository userRepository;

    @Autowired
    public SensorDataService(SensorDataRepository sensorDataRepository,
                             UserRepository userRepository) {
        this.sensorDataRepository = sensorDataRepository;
        this.userRepository = userRepository;
    }

    public SensorData save(SensorData sd) {
        return sensorDataRepository.save(sd);
    }

    public List<SensorData> getAll() {
        return sensorDataRepository.findAll();
    }

    public Optional<SensorData> getById(Long id) {
        return sensorDataRepository.findById(id);
    }

    // ✅ Corrected method call
    public List<SensorData> getByUserId(Long userId) {
        return sensorDataRepository.findByUserId(userId);
    }

    // ✅ Corrected here too
    public List<SensorData> getByUserEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        return sensorDataRepository.findByUserId(user.getId());
    }

    public void deleteById(Long id) {
        sensorDataRepository.deleteById(id);
    }
}
