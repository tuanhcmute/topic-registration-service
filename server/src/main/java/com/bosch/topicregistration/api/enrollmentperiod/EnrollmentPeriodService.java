package com.bosch.topicregistration.api.enrollmentperiod;

import com.bosch.topicregistration.api.response.Response;

import java.util.Set;

public interface EnrollmentPeriodService {
    Response<EnrollmentPeriodDTO> getActivatedEnrollmentPeriod(String type);

    Response<Set<EnrollmentPeriodDTO>> getListEnrollmentPeriodBySemester(String semesterId);
}
