package com.bosch.topicregistration.api.enrollment.topic;

import lombok.*;

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

}
