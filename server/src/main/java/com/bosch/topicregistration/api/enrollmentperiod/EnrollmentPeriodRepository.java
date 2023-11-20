package com.bosch.topicregistration.api.enrollmentperiod;

import com.bosch.topicregistration.api.semester.Semester;
import com.bosch.topicregistration.api.semester.SemesterStatus;
import com.bosch.topicregistration.api.topic.TopicType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollmentPeriodRepository extends JpaRepository<EnrollmentPeriod, String> {
    List<EnrollmentPeriod> findBySemester(Semester semester);

    Optional<EnrollmentPeriod> findByTypeAndCodeAndStatus(TopicType type, EnrollmentPeriodCode code, SemesterStatus status);
}
