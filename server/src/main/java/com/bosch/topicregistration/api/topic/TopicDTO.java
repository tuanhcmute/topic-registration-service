package com.bosch.topicregistration.api.topic;

import com.bosch.topicregistration.api.user.LectureDTO;
import com.bosch.topicregistration.api.user.StudentDTO;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TopicDTO {
    private String id;

    private String name;

    private TopicType type;

    private String goal;

    private String requirement;

    private TopicStatus status;

    private Integer maxSlot;

    private Integer availableSlot;

    private Set<StudentDTO> students;

    private LectureDTO lecture;

}
