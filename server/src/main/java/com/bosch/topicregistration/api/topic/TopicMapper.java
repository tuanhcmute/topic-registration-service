package com.bosch.topicregistration.api.topic;

import com.bosch.topicregistration.api.topicenrollment.TopicEnrollment;
import com.bosch.topicregistration.api.user.LectureDTO;
import com.bosch.topicregistration.api.user.StudentDTO;
import com.bosch.topicregistration.api.user.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface TopicMapper {
    @Mappings(@Mapping(source = "topicEnrollments", target = "students"))
    TopicDTO toDTO(Topic topic);

    List<TopicDTO> toListDTO(List<Topic> topics);

    Set<StudentDTO> map(Set<TopicEnrollment> topicEnrollments);

    default StudentDTO map(TopicEnrollment topicEnrollment) {
        return StudentDTO.builder()
                .ntid(topicEnrollment.getStudent().getNtid())
                .name(topicEnrollment.getStudent().getName())
                .build();
    }

    default LectureDTO mapLectureDTO(User lecture) {
        return LectureDTO.builder()
                .ntid(lecture.getNtid())
                .name(lecture.getName())
                .build();
    }
}
