package com.bosch.topicregistration.api.enrollment.topic;


import lombok.*;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class NewTopicRequest {
    private String type;
    private String majorCode;
    private String ntid;
    private Integer maxSlot;
    private String topicName;
    private String goal;
    private String requirement;
    @Builder.Default
    private Set<String> students = new HashSet<>();
}
