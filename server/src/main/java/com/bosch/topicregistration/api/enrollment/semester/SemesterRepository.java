package com.bosch.topicregistration.api.enrollment.semester;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SemesterRepository extends JpaRepository<Semester, String> {
    List<Semester> findByStatus(SemesterStatus status);
}
