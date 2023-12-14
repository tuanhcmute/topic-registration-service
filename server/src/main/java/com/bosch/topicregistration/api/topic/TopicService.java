package com.bosch.topicregistration.api.topic;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.response.PageResponse;
import com.bosch.topicregistration.api.response.Response;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface TopicService {
    Response<PageResponse<List<TopicDTO>>> getAllTopicsByLecture(String type, Integer pageNumber, Integer pageSize, String sortBy);

    Response<Void> createTopic(NewTopicRequest request);

    Response<Void> updateTopic(String id, UpdateTopicRequest request);

    Response<Void> approveTopic(String id, ApprovalTopicRequest request);

    Response<PageResponse<List<TopicDTO>>> getAllTopicsIsNotApproved(String type, Integer pageNumber, Integer pageSize, String sortBy);

    Response<PageResponse<List<TopicDTO>>> getAllApprovedTopics(String type, Integer pageNumber, Integer pageSize, String sortBy);

    Response<PageResponse<List<TopicDTO>>> getAllTopics(Integer pageNumber, Integer pageSize, String sortBy);

    default void validateTopicType(String type) {
        boolean hasType = Arrays.stream(TopicType.values()).anyMatch(item -> StringUtils.equals(item.name(), type));
        if (!hasType) throw new BadRequestException("Topic type is not valid");
    }
}
