package com.bosch.topicregistration.api.enrollment.topic;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class UpdateTopicRequest {
    private String id;
    private String topicName;
    private String goal;
    private String requirement;
    private Integer maxSlot;
    @Builder.Default
    private Set<String> students = new HashSet<>();
}
