package com.bosch.topicregistration.api.topicenrollment;

import com.bosch.topicregistration.api.topic.Topic;
import com.bosch.topicregistration.api.topic.TopicDTO;
import com.bosch.topicregistration.api.topic.TopicMapper;
import com.bosch.topicregistration.api.user.StudentDTO;
import com.bosch.topicregistration.api.user.User;
import com.bosch.topicregistration.api.user.UserMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TopicEnrollmentMapper {
    TopicEnrollmentDTO toDTO(TopicEnrollment topicEnrollment);

    List<TopicEnrollmentDTO> toListDTO(List<TopicEnrollment> topicEnrollments);

    default StudentDTO mapStudentDTO(User student) {
        return Mappers.getMapper(UserMapper.class).toStudentDTO(student);
    }

    default TopicDTO mapTopicDTO(Topic topic) {
        return Mappers.getMapper(TopicMapper.class).toDTO(topic);
    }
}
