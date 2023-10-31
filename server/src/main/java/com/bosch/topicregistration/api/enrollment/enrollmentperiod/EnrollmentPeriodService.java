package com.bosch.topicregistration.api.enrollment.enrollmentperiod;

import com.bosch.topicregistration.api.response.Response;

public interface EnrollmentPeriodService {
    Response<EnrollmentPeriodDTO> getEnrollmentPeriod (String type, String period);
}
