package com.bosch.topicregistration.api.enrollmentperiod;

import com.bosch.topicregistration.api.semester.SemesterDTO;
import com.bosch.topicregistration.api.topic.TopicType;
import lombok.*;

import java.time.LocalDate;

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
