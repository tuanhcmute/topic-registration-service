package com.bosch.topicregistration.api.semester;

import org.apache.commons.lang3.StringUtils;
import java.util.function.Function;
public interface SemesterValidator extends Function<SemesterRequest, SemesterValidatorResult>{
    static SemesterValidator isNameValid() {
        return request -> StringUtils.isEmpty(request.getName()) ? SemesterValidatorResult.NAME_INVALID : SemesterValidatorResult.VALID;
    }

    static SemesterValidator isTypeValid() {
        return request -> StringUtils.isEmpty(request.getType().toString()) ? SemesterValidatorResult.TYPE_INVALID : SemesterValidatorResult.VALID;
    }

    static SemesterValidator isStatusValid() {
        return request -> StringUtils.isEmpty(request.getStatus().toString()) ? SemesterValidatorResult.STATUS_INVALID : SemesterValidatorResult.VALID;
    }

    static SemesterValidator isStartDateValid() {
        return request -> StringUtils.isEmpty(request.getStartDate().toString()) ? SemesterValidatorResult.START_DATE_INVALID : SemesterValidatorResult.VALID;
    }

    static SemesterValidator isEndDateValid() {
        return request -> StringUtils.isEmpty(request.getEndDate().toString()) ? SemesterValidatorResult.END_DATE_INVALID : SemesterValidatorResult.VALID;
    }

    default SemesterValidator and(SemesterValidator other) {
        return semester -> {
            SemesterValidatorResult result = this.apply(semester);
            return result.equals(SemesterValidatorResult.VALID) ? other.apply(semester) : result;
        };
    }
}
