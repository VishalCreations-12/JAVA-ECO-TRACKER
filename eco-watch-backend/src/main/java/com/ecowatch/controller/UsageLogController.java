package com.ecowatch.controller;

import com.ecowatch.model.UsageLog;
import com.ecowatch.service.UsageLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usage")
@CrossOrigin(origins = "http://localhost:8081") // adjust for React
public class UsageLogController {

    private final UsageLogService usageLogService;

    public UsageLogController(UsageLogService usageLogService) {
        this.usageLogService = usageLogService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<UsageLog>> getUsageLogs(@PathVariable Long userId) {
        return ResponseEntity.ok(usageLogService.getUsageLogsByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<UsageLog> addUsageLog(@RequestBody UsageLog usageLog) {
        return ResponseEntity.ok(usageLogService.addUsageLog(usageLog));
    }
}
