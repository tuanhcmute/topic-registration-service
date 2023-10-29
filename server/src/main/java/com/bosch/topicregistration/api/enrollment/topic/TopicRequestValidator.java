package com.bosch.topicregistration.api.enrollment.topic;

import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.Objects;
import java.util.function.Function;

public interface TopicRequestValidator extends Function<NewTopicRequest, TopicValidatorResult> {

    static TopicRequestValidator isMajorCodeValid() {
        return request ->
                StringUtils.isEmpty(request.getMajorCode()) ? TopicValidatorResult.MAJOR_CODE_INVALID : TopicValidatorResult.VALID;
    }
    static TopicRequestValidator isTypeValid() {
        return request -> {
            boolean isValid = Arrays.stream(TopicType.values()).anyMatch(topicType -> topicType.name().equals(request.getType()));
            return isValid ? TopicValidatorResult.VALID : TopicValidatorResult.TYPE_INVALID;
        };
    }

    static TopicRequestValidator isTopicNameValid() {
        return request ->
                StringUtils.isEmpty(request.getTopicName()) ? TopicValidatorResult.TOPIC_NAME_INVALID : TopicValidatorResult.VALID;
    }

    static TopicRequestValidator isGoalValid() {
        return request ->
                StringUtils.isEmpty(request.getGoal()) ? TopicValidatorResult.GOAL_INVALID : TopicValidatorResult.VALID;
    }

    static TopicRequestValidator isRequirementValid() {
        return request ->
                StringUtils.isEmpty(request.getRequirement()) ? TopicValidatorResult.REQUIREMENT_INVALID : TopicValidatorResult.VALID;
    }

    static TopicRequestValidator isMaxSlotValid() {
        return request ->
                Objects.nonNull(request.getMaxSlot()) ? TopicValidatorResult.VALID : TopicValidatorResult.MAX_SLOT_INVALID;
    }

    static TopicRequestValidator isAvailableSlotValid(Integer maxSlot) {
        return request -> {
            if(Objects.isNull(request.getStudents())) return TopicValidatorResult.LIST_STUDENTS_INVALID;
            if(maxSlot < request.getStudents().size()) {
                return TopicValidatorResult.LIST_STUDENTS_INVALID;
            }
            return TopicValidatorResult.VALID;
        };
    }

    default TopicRequestValidator and (TopicRequestValidator other) {
        return topic -> {
            TopicValidatorResult result = this.apply(topic);
            return result.equals(TopicValidatorResult.VALID) ? other.apply(topic) : result;
        };
    }

    default TopicRequestValidator or (TopicRequestValidator other) {
        return topic -> {
            TopicValidatorResult result = this.apply(topic);
            return !result.equals(TopicValidatorResult.VALID) ? other.apply(topic) : result;
        };
    }
}
