package com.ecowatch.service;

import com.ecowatch.model.Alert;
import com.ecowatch.model.Target;
import com.ecowatch.model.UsageLog;
import com.ecowatch.repository.AlertRepository;
import com.ecowatch.repository.TargetRepository;
import com.ecowatch.repository.UsageLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final TargetRepository targetRepository;
    private final UsageLogRepository usageLogRepository;
    private final AlertRepository alertRepository;

    public Map<String, Object> getDashboard(Long userId) {
        Map<String, Object> response = new HashMap<>();

        // ✅ fetch logs sorted by logDate
        List<UsageLog> logs = usageLogRepository.findByUser_IdOrderByLogDateDesc(userId);

        // ✅ fetch active target
        Optional<Target> activeTarget = targetRepository.findByUserIdAndStatus(userId, "active");

        // ✅ calculate usage (now works with double)
        double totalUsage = logs.stream()
                .mapToDouble(UsageLog::getDailyUsage)
                .sum();

        double avgUsage = logs.isEmpty() ? 0 : totalUsage / logs.size();


        List<Alert> alerts = alertRepository.findTop5ByUserIdOrderByIdDesc(userId);


        response.put("totalUsage", totalUsage);
        response.put("averageUsage", avgUsage);
        response.put("latestUsage", logs.isEmpty() ? null : logs.get(0));
        response.put("activeTarget", activeTarget.orElse(null));
        response.put("usageLogs", logs);
        response.put("alerts", alerts);

        return response;
    }
}
