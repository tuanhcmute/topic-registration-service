package com.bosch.topicregistration.api.enrollmentperiod;

import org.mapstruct.Mapper;

import java.util.Set;


@Mapper(componentModel = "spring")
public interface EnrollmentPeriodMapper {
    EnrollmentPeriodDTO toDTO(EnrollmentPeriod enrollmentPeriod);

    Set<EnrollmentPeriodDTO> toSetDTO(Set<EnrollmentPeriod> enrollmentPeriods);
}
