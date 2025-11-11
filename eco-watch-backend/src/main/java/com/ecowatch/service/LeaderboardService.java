package com.ecowatch.service;

import com.ecowatch.repository.SensorDataRepository;
import com.ecowatch.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class LeaderboardService {

    private final SensorDataRepository sensorDataRepository;
    private final UserRepository userRepository; // ✅ Added

    public int getUserRank(Long userId) {
        List<Object[]> leaderboard = sensorDataRepository.getLeaderboard();
        int rank = 1;

        for (Object[] row : leaderboard) {
            Long currentUserId = (Long) row[0];
            if (currentUserId.equals(userId)) {
                return rank;
            }
            rank++;
        }
        return -1; // user not found
    }

    // ✅ Modified to include userName
    public List<Map<String, Object>> getLeaderboardWithNames() {
        List<Object[]> leaderboard = sensorDataRepository.getLeaderboard();
        List<Map<String, Object>> response = new ArrayList<>();
        int rank = 1;

        for (Object[] row : leaderboard) {
            Long userId = (Long) row[0];
            Double totalEnergy = ((Number) row[1]).doubleValue();

            String userName = userRepository.findById(userId)
                    .map(user -> user.getName())
                    .orElse("Unknown User");

            Map<String, Object> entry = new HashMap<>();
            entry.put("rank", rank++);
            entry.put("userId", userId);
            entry.put("userName", userName);
            entry.put("totalEnergy", totalEnergy);

            response.add(entry);
        }
        return response;
    }
}
