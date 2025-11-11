package com.ecowatch.repository;

import com.ecowatch.model.Target;  // import your Target entity
import java.util.List;              // import List

import java.util.Optional;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface TargetRepository extends JpaRepository<Target, Long> {
    List<Target> findByUserId(Long userId);
    Optional<Target> findByUserIdAndStatus(Long userId, String status);
}
