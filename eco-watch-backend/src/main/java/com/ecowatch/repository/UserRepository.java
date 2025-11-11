package com.ecowatch.repository;

import com.ecowatch.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Existing method — keep it
    Optional<User> findByEmail(String email);

    // ✅ New method — optional convenience for leaderboard lookup
    Optional<User> findById(Long id);
}
