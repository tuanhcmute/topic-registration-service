package com.bosch.topicregistration.api.enrollment;

import com.bosch.topicregistration.api.enrollment.topic.Topic;
import com.bosch.topicregistration.api.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TopicEnrollmentRepository extends JpaRepository<TopicEnrollment, String> {
    List<TopicEnrollment> findByTopic(Topic topic);

    boolean existsByStudent(User student);

}
