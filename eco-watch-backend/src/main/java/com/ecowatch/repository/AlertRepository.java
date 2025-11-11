package com.ecowatch.repository;

import com.ecowatch.model.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {

    // Fetch all alerts for a user in descending order
    List<Alert> findByUserIdOrderByIdDesc(Long userId);

    // Fetch latest 5 alerts for a user in descending order
    List<Alert> findTop5ByUserIdOrderByIdDesc(Long userId);
}
