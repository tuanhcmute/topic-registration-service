package com.bosch.topicregistration.api.enrollment.enrollmentperiod;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public enum TopicRegistrationValidatorResult {
    TOPIC_CODE_INVALID("Topic code is not valid"),
    LIST_STUDENTS_INVALID("Size of the students is not valid"),
    STUDENT_CODE_INVALID("Student code is not valid"),
    VALID("");
    private String message;
}
