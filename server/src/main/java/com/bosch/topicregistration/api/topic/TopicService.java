package com.bosch.topicregistration.api.topic;

import com.bosch.topicregistration.api.response.PageResponse;
import com.bosch.topicregistration.api.response.Response;

import java.util.List;

public interface TopicService {
    Response<PageResponse<List<TopicDTO>>> getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture(String type, Integer pageNumber, Integer pageSize, String sortBy);

    Response<Void> createNewTopicInLectureEnrollmentPeriod(NewTopicRequest request);

    Response<Void> updateTopicInLectureEnrollmentPeriod(UpdateTopicRequest request);

    Response<Void> approveTopicInLectureEnrollmentPeriod(ApprovalTopicRequest request);

    Response<List<TopicDTO>> getAllTopicsIsNotApprovedDuringTheLectureEnrollmentPeriod(String type, Integer pageNumber, Integer pageSize, String sortBy);

    Response<List<TopicDTO>> getAllTopicsApprovedDuringTheLectureEnrollmentPeriod(String type, Integer pageNumber, Integer pageSize, String sortBy);

    Response<List<TopicDTO>> getAllApprovedTopicsInStudentEnrollmentPeriod(String type, Integer pageNumber, Integer pageSize, String sortBy);

    Response<PageResponse<List<TopicDTO>>> getAllTopics(Integer pageNumber, Integer pageSize, String sortBy);
}
