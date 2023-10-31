package com.bosch.topicregistration.api.enrollment.enrollmentperiod;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.bosch.topicregistration.api.enrollment.semester.SemesterStatus;
import com.bosch.topicregistration.api.enrollment.topic.TopicType;
import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.Response;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class EnrollmentPeriodImpl implements EnrollmentPeriodService {
    private final EnrollmentPeriodRepository enrollmentPeriodRepository;
    private final EnrollmentPeriodMapper enrollmentPeriodMapper;

    @Override
    @LoggerAround
    public Response<EnrollmentPeriodDTO> getEnrollmentPeriod(String type, String period) {
        String topicTypeItem = type.toUpperCase();
        String enrollmentPeriodCodeItem = period.toUpperCase().concat("_ENROLLMENT_PERIOD");

        log.info(enrollmentPeriodCodeItem);

        boolean isMatchTopicType = Arrays.stream(TopicType.values()).anyMatch(item -> StringUtils.equals(item.name(), topicTypeItem));
        if (!isMatchTopicType) throw new BadRequestException("Topic type is not valid");

        boolean isMatchEnrollmentPeriodCode = Arrays.stream(EnrollmentPeriodCode.values()).anyMatch(item -> StringUtils.equals(item.name(), enrollmentPeriodCodeItem));
        if (!isMatchEnrollmentPeriodCode) throw new BadRequestException("Enrollment Period is not valid");


        TopicType topicType = TopicType.valueOf(topicTypeItem);
        EnrollmentPeriodCode enrollmentPeriodCode = EnrollmentPeriodCode.valueOf(enrollmentPeriodCodeItem);
        SemesterStatus semesterStatus = SemesterStatus.valueOf("ACTIVATED");

        Optional<EnrollmentPeriod> enrollmentPeriodOptinal = enrollmentPeriodRepository.findByTypeAndCodeAndStatus(topicType, enrollmentPeriodCode, semesterStatus);
        if(!enrollmentPeriodOptinal.isPresent()) throw new BadRequestException("Enrollment Period could not be found");

        EnrollmentPeriod enrollmentPeriod = enrollmentPeriodOptinal.get();

        Map<String, EnrollmentPeriodDTO> data = new HashMap<>();
        data.put("enrollmentPeriod", enrollmentPeriodMapper.toDTO(enrollmentPeriod));
        return Response.<EnrollmentPeriodDTO>builder()
                .message("Enrollment period has been successfully retrieved")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }
}
