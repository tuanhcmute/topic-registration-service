package com.bosch.topicregistration.api.topic;

import com.bosch.topicregistration.api.response.PageResponse;
import com.bosch.topicregistration.api.response.Response;

import java.util.List;

public interface TopicService {
    Response<PageResponse<List<TopicDTO>>> getAllTopicsByLecture(String type, Integer pageNumber, Integer pageSize, String sortBy);

    Response<Void> createTopic(NewTopicRequest request);

    Response<Void> updateTopic(String id, UpdateTopicRequest request);

    Response<Void> approveTopic(String id, ApprovalTopicRequest request);

    Response<List<TopicDTO>> getAllTopicsIsNotApproved(String type, Integer pageNumber, Integer pageSize, String sortBy);

    Response<List<TopicDTO>> getAllApprovedTopics(String type, Integer pageNumber, Integer pageSize, String sortBy);

    Response<PageResponse<List<TopicDTO>>> getAllTopics(Integer pageNumber, Integer pageSize, String sortBy);
}
