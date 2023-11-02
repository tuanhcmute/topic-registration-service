package com.bosch.topicregistration.api.topic;

import com.bosch.topicregistration.api.semester.Semester;
import com.bosch.topicregistration.api.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic, String> {
    Page<Topic> findBySemesterAndTypeAndLecture(Semester semester, TopicType type, User lecture, Pageable pageable);
}