package com.bosch.topicregistration.api.topic;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApprovalTopicRequest {
    private String id;
    private String status;
    private String reason;
}
