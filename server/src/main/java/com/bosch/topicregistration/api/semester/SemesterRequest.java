package com.bosch.topicregistration.api.semester;

import lombok.*;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class SemesterRequest {

    @NotEmpty(message = "Type is not empty")
    private String type;

    @NotEmpty(message = "Name is not empty")
    private String name;

    @NotEmpty(message = "Start date is not empty")
    private String startDate;

    @NotEmpty(message = "Start date is not empty")
    private String endDate;
}