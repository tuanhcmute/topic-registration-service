package com.bosch.topicregistration.api.enrollment.topic;

import com.bosch.topicregistration.api.response.Response;

import java.util.List;

public interface TopicService {
    Response<List<TopicDTO>> getAllTopicsInLectureEnrollmentPeriod(String type);
}
