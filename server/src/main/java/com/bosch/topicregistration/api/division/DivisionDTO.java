package com.bosch.topicregistration.api.division;

import com.bosch.topicregistration.api.topic.TopicDTO;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DivisionDTO {
    private String id;

    private String createdBy;

    private String startDate;

    private String specifiedTime;

    private String place;

    private TopicDTO topic;
}
