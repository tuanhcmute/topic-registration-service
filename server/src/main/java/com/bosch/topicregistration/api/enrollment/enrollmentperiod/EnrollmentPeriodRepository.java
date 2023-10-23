package com.bosch.topicregistration.api.enrollment.enrollmentperiod;

import com.bosch.topicregistration.api.enrollment.semester.Semester;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentPeriodRepository extends JpaRepository<EnrollmentPeriod, String> {
    List<EnrollmentPeriod> findBySemester(Semester semester);
}
