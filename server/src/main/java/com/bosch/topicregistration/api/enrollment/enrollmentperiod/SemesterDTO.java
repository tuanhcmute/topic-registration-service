package com.bosch.topicregistration.api.enrollment.enrollmentperiod;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SemesterDTO {
    private String id;
    private String name;
}
