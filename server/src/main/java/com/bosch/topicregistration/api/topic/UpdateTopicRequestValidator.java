package com.bosch.topicregistration.api.topic;

import org.apache.commons.lang3.StringUtils;

import java.util.Objects;
import java.util.function.Function;

public interface UpdateTopicRequestValidator extends Function<UpdateTopicRequest, TopicValidatorResult> {

    static UpdateTopicRequestValidator isTopicNameValid() {
        return request ->
                StringUtils.isEmpty(request.getTopicName()) ? TopicValidatorResult.TOPIC_NAME_INVALID : TopicValidatorResult.VALID;
    }

    static UpdateTopicRequestValidator isGoalValid() {
        return request ->
                StringUtils.isEmpty(request.getGoal()) ? TopicValidatorResult.GOAL_INVALID : TopicValidatorResult.VALID;
    }

    static UpdateTopicRequestValidator isRequirementValid() {
        return request ->
                StringUtils.isEmpty(request.getRequirement()) ? TopicValidatorResult.REQUIREMENT_INVALID : TopicValidatorResult.VALID;
    }

    static UpdateTopicRequestValidator isMaxSlotValid() {
        final int minSlot = 1;
        final int maxSlot = 2;
        return request -> {
            if (Objects.nonNull(request.getMaxSlot()) && request.getMaxSlot() >= minSlot && request.getMaxSlot() <= maxSlot) {
                return TopicValidatorResult.VALID;
            }
            return TopicValidatorResult.MAX_SLOT_INVALID;
        };
    }

    static UpdateTopicRequestValidator isAvailableSlotValid(Integer maxSlot) {
        return request -> {
            if (Objects.isNull(request.getStudents())) return TopicValidatorResult.LIST_STUDENTS_INVALID;
            if (maxSlot < request.getStudents().size()) {
                return TopicValidatorResult.LIST_STUDENTS_INVALID;
            }
            return TopicValidatorResult.VALID;
        };
    }

    default UpdateTopicRequestValidator and(UpdateTopicRequestValidator other) {
        return topic -> {
            TopicValidatorResult result = this.apply(topic);
            return result.equals(TopicValidatorResult.VALID) ? other.apply(topic) : result;
        };
    }
}
