package com.bosch.topicregistration.api.enrollmentperiod;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.Response;
import com.bosch.topicregistration.api.semester.SemesterStatus;
import com.bosch.topicregistration.api.topic.TopicType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class EnrollmentPeriodImpl implements EnrollmentPeriodService {
    private final EnrollmentPeriodRepository enrollmentPeriodRepository;
    private final EnrollmentPeriodMapper enrollmentPeriodMapper;

    @Override
    @LoggerAround
    public Response<EnrollmentPeriodDTO> getEnrollmentPeriod(String type, String period) {
        // validate Topic type and Period not null
        if (type.isEmpty())
            throw new BadRequestException("Type parameter is empty");
        if (period.isEmpty())
            throw new BadRequestException("Period parameter is empty");

        // validate Topic type
        boolean isMatchTopicType = Arrays.stream(TopicType.values())
                .anyMatch(item -> StringUtils.equals(item.name(), type));
        if (!isMatchTopicType)
            throw new BadRequestException("Topic type is not valid");

        // Validate Enrollment Period Code
        boolean isMatchEnrollmentPeriodCode = Arrays.stream(EnrollmentPeriodCode.values())
                .anyMatch(item -> StringUtils.equals(item.name(), period));
        if (!isMatchEnrollmentPeriodCode)
            throw new BadRequestException("Enrollment Period is not valid");

        // Get parameters from ENUM
        TopicType topicType = TopicType.valueOf(type);
        EnrollmentPeriodCode enrollmentPeriodCode = EnrollmentPeriodCode.valueOf(period);
        SemesterStatus semesterStatus = SemesterStatus.ACTIVATED;

        // Get Enrollment Period based on Topic type, Enrollment Period with Activated
        // status
        Optional<EnrollmentPeriod> enrollmentPeriodOptional = enrollmentPeriodRepository
                .findByTypeAndCodeAndStatus(topicType, enrollmentPeriodCode, semesterStatus);

        // Check null Item Optional before get value
        if (!enrollmentPeriodOptional.isPresent())
            throw new BadRequestException("Enrollment Period could not be found");
        EnrollmentPeriod enrollmentPeriod = enrollmentPeriodOptional.get();

        // Mapping data with structure
        Map<String, EnrollmentPeriodDTO> data = new HashMap<>();
        data.put("enrollmentPeriod", enrollmentPeriodMapper.toDTO(enrollmentPeriod));
        return Response.<EnrollmentPeriodDTO>builder()
                .message("Enrollment period has been successfully retrieved")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }
}