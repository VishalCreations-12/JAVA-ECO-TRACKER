package com.ecowatch.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.ecowatch.repository.TargetRepository;
import com.ecowatch.repository.UserRepository;
import com.ecowatch.model.Target;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TargetService {

    private final TargetRepository targetRepository;
    private final UserRepository userRepository;

    public List<Target> getTargetsByUserId(Long userId) {
        return targetRepository.findByUserId(userId);
    }

    public Optional<Target> getActiveTarget(Long userId) {
        return targetRepository.findByUserIdAndStatus(userId, "active");
    }
}


