package com.bosch.topicregistration.api.topicenrollment;

import com.bosch.topicregistration.api.topic.TopicDTO;
import com.bosch.topicregistration.api.user.StudentDTO;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TopicEnrollmentDTO {
    private String id;
    private StudentDTO student;
    private TopicDTO topic;
    boolean isLeader;
}
