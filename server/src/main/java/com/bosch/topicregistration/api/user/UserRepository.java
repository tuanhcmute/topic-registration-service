package com.bosch.topicregistration.api.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.ntid IN ?1")
    List<User> findAllByNtids(Iterable<String> ntids);

    List<User> findByMajor(Major major);
}
