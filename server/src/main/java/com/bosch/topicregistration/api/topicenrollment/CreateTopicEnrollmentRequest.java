package com.bosch.topicregistration.api.topicenrollment;

import lombok.*;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateTopicEnrollmentRequest {
    @NotEmpty(message = "Ntid is not valid")
    private String ntid;

    @NotEmpty(message = "Topic id is not valid")
    private String topicId;
}
