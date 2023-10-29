package com.bosch.topicregistration.api.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MajorRepository extends JpaRepository<Major, String> {
    Optional<Major> findByCode(String code);
}
