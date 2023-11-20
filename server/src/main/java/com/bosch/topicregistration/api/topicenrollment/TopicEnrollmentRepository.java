package com.bosch.topicregistration.api.topicenrollment;

import com.bosch.topicregistration.api.topic.Topic;
import com.bosch.topicregistration.api.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TopicEnrollmentRepository extends JpaRepository<TopicEnrollment, String> {
    List<TopicEnrollment> findByTopic(Topic topic);

    boolean existsByStudent(User student);

    Optional<TopicEnrollment> findByStudent(User student);

}
