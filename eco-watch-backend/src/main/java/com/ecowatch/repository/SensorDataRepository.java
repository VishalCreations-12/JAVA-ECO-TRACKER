package com.ecowatch.repository;

import com.ecowatch.model.SensorData;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface SensorDataRepository extends JpaRepository<SensorData, Long> {

    // ✅ Find all sensor data for a given user id
    List<SensorData> findByUserId(Long userId);

    @Query("SELECT SUM(s.energyUsage) FROM SensorData s WHERE s.userId = :userId")
    Integer getTotalEnergyByUser(@Param("userId") Long userId);


    // Leaderboard: returns userId and total energy usage, ordered ascending (least usage is rank 1)
    @Query("SELECT s.userId, SUM(s.energyUsage) as totalUsage FROM SensorData s GROUP BY s.userId ORDER BY totalUsage ASC")
    List<Object[]> getLeaderboard();

}

