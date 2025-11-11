package com.ecowatch.model;

import jakarta.persistence.*;

@Entity
@Table(name = "sensor_data")
public class SensorData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "energy_usage")
    private int energyUsage;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public int getEnergyUsage() { return energyUsage; }
    public void setEnergyUsage(int energyUsage) { this.energyUsage = energyUsage; }
}
