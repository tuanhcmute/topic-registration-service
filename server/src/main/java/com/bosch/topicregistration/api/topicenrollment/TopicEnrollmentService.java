package com.bosch.topicregistration.api.topicenrollment;

import com.bosch.topicregistration.api.response.Response;

import java.util.List;

public interface TopicEnrollmentService {
    Response<Void> deleteTopicEnrollment(String ntid);

    Response<Void> createTopicEnrollment(CreateTopicEnrollmentRequest request);

    Response<List<TopicEnrollmentDTO>> getTopicEnrollmentsByNtid();
}
