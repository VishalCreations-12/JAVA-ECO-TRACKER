package com.ecowatch.repository;

import com.ecowatch.model.UsageLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsageLogRepository extends JpaRepository<UsageLog, Long> {
    List<UsageLog> findByUserId(Long userId);
    List<UsageLog> findByUser_IdOrderByLogDateDesc(Long userId);

}
