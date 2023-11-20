package com.bosch.topicregistration.api.topic;

import lombok.*;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApprovalTopicRequest {
    @NotEmpty(message = "Topic id is not valid")
    private String id;

    @NotEmpty(message = "Status is not valid")
    private String status;

    @NotEmpty(message = "Reason is not valid")
    private String reason;
}
