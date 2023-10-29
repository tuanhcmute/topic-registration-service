package com.bosch.topicregistration.api.enrollment;

import com.bosch.topicregistration.api.enrollment.topic.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TopicEnrollmentRepository extends JpaRepository<TopicEnrollment, String> {
    List<TopicEnrollment> findByTopic(Topic topic);
}
