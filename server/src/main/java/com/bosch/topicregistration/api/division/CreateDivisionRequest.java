package com.bosch.topicregistration.api.division;

import lombok.*;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateDivisionRequest {
    @NotEmpty(message = "Topic id is not valid")
    private String topicId;

    @NotEmpty(message = "Lecture code is not valid")
    private String lectureCode;

    @NotEmpty(message = "Specified time is not valid")
    private String specifiedTime;

    @NotEmpty(message = "Start date is not valid")
    private String startDate;

    @NotEmpty(message = "Place is not valid")
    private String place;
}
