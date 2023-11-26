package com.bosch.topicregistration.api.enrollmentperiod;

import org.apache.commons.lang3.StringUtils;

import java.util.function.Function;

public interface TopicRegistrationValidator extends Function<NewTopicRegistration, TopicRegistrationValidatorResult> {
    static TopicRegistrationValidator isTopicCodeValid() {
        return request -> StringUtils.isEmpty(request.getTopicCode())
                ? TopicRegistrationValidatorResult.TOPIC_CODE_INVALID
                : TopicRegistrationValidatorResult.VALID;
    }

    static TopicRegistrationValidator isStudentsValid() {
        return request -> {
            if (request.getStudents().size() == 0)
                return TopicRegistrationValidatorResult.LIST_STUDENTS_INVALID;
            return TopicRegistrationValidatorResult.VALID;
        };
    }

    static TopicRegistrationValidator isStudentCodeValid() {
        return request -> {
            boolean isValid = request.getStudents().stream().anyMatch(item -> item.get("code").isEmpty());
            return isValid ? TopicRegistrationValidatorResult.STUDENT_CODE_INVALID
                    : TopicRegistrationValidatorResult.VALID;
        };
    }

    default TopicRegistrationValidator and(TopicRegistrationValidator other) {
        return topicRegistration -> {
            TopicRegistrationValidatorResult result = this.apply(topicRegistration);
            return result.equals(TopicRegistrationValidatorResult.VALID) ? other.apply(topicRegistration) : result;
        };
    }

    default TopicRegistrationValidator or(TopicRegistrationValidator other) {
        return topicRegistration -> {
            TopicRegistrationValidatorResult result = this.apply(topicRegistration);
            return !result.equals(TopicRegistrationValidatorResult.VALID) ? other.apply(topicRegistration) : result;
        };
    }
}