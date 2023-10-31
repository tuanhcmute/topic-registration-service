package com.bosch.topicregistration.api.enrollment.enrollmentperiod;

import java.time.LocalDate;

import com.bosch.topicregistration.api.enrollment.topic.TopicType;

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
public class EnrollmentPeriodDTO {
    private EnrollmentPeriodCode code;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private TopicType type;
    private SemesterDTO semester;
}
