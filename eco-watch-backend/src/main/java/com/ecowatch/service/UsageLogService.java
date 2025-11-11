package com.ecowatch.service;

import com.ecowatch.model.UsageLog;
import com.ecowatch.repository.UsageLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsageLogService {

    private final UsageLogRepository usageLogRepository;

    public UsageLogService(UsageLogRepository usageLogRepository) {
        this.usageLogRepository = usageLogRepository;
    }

    public List<UsageLog> getUsageLogsByUserId(Long userId) {
        return usageLogRepository.findByUserId(userId);
    }

    public UsageLog addUsageLog(UsageLog usageLog) {
        return usageLogRepository.save(usageLog);
    }
}
