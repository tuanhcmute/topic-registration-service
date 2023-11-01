package com.bosch.topicregistration.api.topic;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public enum TopicValidatorResult {
    MAJOR_CODE_INVALID("Major code is not valid"),
    TYPE_INVALID("Topic type is not valid"),
    TOPIC_NAME_INVALID("Topic name is not valid"),
    GOAL_INVALID("Goal is not valid"),
    REQUIREMENT_INVALID("Requirement is not valid"),
    MAX_SLOT_INVALID("Max slot is not valid"),
    LIST_STUDENTS_INVALID("Size of the students is not valid"),
    LECTURE_CODE_INVALID("Lecture code is not valid"),
    VALID("");
    private String message;
}