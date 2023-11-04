package com.bosch.topicregistration.api.topic;

import com.bosch.topicregistration.api.response.Response;

import java.util.List;

public interface TopicService {
    Response<List<TopicDTO>> getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture(String type, Integer pageNumber, Integer pageSize, String sortBy);

    Response<Void> createNewTopicInLectureEnrollmentPeriod(NewTopicRequest request);

    Response<Void> updateTopicInLectureEnrollmentPeriod(UpdateTopicRequest request);

    Response<Void> approveTopicInLectureEnrollmentPeriod(ApprovalTopicRequest request);

    Response<List<TopicDTO>> getAllTopicsInLectureEnrollmentPeriodByTypeAndTopicStatusAndMajor(String type, String status, Integer pageNumber, Integer pageSize, String sortBy);
}
