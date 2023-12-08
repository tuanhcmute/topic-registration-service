package com.bosch.topicregistration.api.enrollmentperiod;

import java.util.Set;

import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface EnrollmentPeriodMapper {
    EnrollmentPeriodDTO toDTO(EnrollmentPeriod enrollmentPeriod);

    Set<EnrollmentPeriodDTO> toSetDTO(Set<EnrollmentPeriod> enrollmentPeriods);
}
