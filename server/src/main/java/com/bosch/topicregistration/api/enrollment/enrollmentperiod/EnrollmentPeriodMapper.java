package com.bosch.topicregistration.api.enrollment.enrollmentperiod;

import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface EnrollmentPeriodMapper {
    EnrollmentPeriodDTO toDTO(EnrollmentPeriod enrollmentPeriod);
}
