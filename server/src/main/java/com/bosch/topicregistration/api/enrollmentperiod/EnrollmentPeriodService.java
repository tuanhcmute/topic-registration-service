package com.bosch.topicregistration.api.enrollmentperiod;

import com.bosch.topicregistration.api.response.Response;

public interface EnrollmentPeriodService {
    Response<EnrollmentPeriodDTO> getEnrollmentPeriod(String type, String period);
    Response<EnrollmentPeriodDTO> registrationTopic(NewTopicRegistration newTopicRegistration);
}
