package com.bosch.topicregistration.api.enrollment.topic;

import com.bosch.topicregistration.api.enrollment.semester.Semester;
import com.bosch.topicregistration.api.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TopicRepository extends JpaRepository<Topic, String> {
    List<Topic> findBySemesterAndTypeAndLecture(Semester semester, TopicType type, User lecture);
}
