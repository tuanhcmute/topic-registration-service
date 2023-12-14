package com.bosch.topicregistration.api.topic;

import lombok.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class UpdateTopicRequest {
    @NotEmpty(message = "Topic name is not valid")
    private String topicName;

    @NotEmpty(message = "Goal is not valid")
    private String goal;

    @NotEmpty(message = "Requirement is not valid")
    private String requirement;

    @NotNull(message = "The max slot is not valid")
    @Min(value = 1, message = "The max slot must be greater than or equal 1")
    @Max(value = 2, message = "The max slot must be less than or equal 2")
    private Integer maxSlot;

    @Builder.Default
    private Set<String> students = new HashSet<>();
}
