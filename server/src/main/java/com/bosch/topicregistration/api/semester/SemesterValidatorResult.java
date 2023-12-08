package com.bosch.topicregistration.api.semester;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public enum SemesterValidatorResult {
    ID_INVALID("Major code is not valid"),
    TYPE_INVALID("Topic type is not valid"),
    STATUS_INVALID("Status name is not valid"),
    NAME_INVALID("Name is not valid"),
    START_DATE_INVALID("Start date is not valid"),
    END_DATE_INVALID("End date is not valid"),
    VALID("");
    private String message;
}
