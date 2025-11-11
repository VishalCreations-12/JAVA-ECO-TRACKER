package com.ecowatch.controller;

import com.ecowatch.service.LeaderboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/leaderboard")
@RequiredArgsConstructor
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    // ✅ Get full leaderboard (with user names)
    @GetMapping
    public List<Map<String, Object>> getLeaderboard() {
        // Now calls the service method that includes user names
        return leaderboardService.getLeaderboardWithNames();
    }

    // Get specific user's rank (unchanged)
    @GetMapping("/{userId}")
    public Map<String, Object> getUserRank(@PathVariable Long userId) {
        int rank = leaderboardService.getUserRank(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("userId", userId);
        response.put("rank", rank);
        return response;
    }
}
