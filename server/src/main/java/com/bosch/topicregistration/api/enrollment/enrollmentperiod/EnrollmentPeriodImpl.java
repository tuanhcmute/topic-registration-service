package com.bosch.topicregistration.api.enrollment.enrollmentperiod;

import java.util.HashMap;
import java.util.Optional;

import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.bosch.topicregistration.api.enrollment.semester.SemesterStatus;
import com.bosch.topicregistration.api.enrollment.topic.TopicType;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.Response;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class EnrollmentPeriodImpl implements EnrollmentPeriodService {
    private final EnrollmentPeriodRepository enrollmentPeriodRepository;
    private final EnrollmentPeriodMapper enrollmentPeriodMapper;

    @Override
    @LoggerAround
    public Response<EnrollmentPeriodDTO> getEnrollmentPeriod(String type, String period) {
        try {
            TopicType topicType = TopicType.valueOf(type.toUpperCase());
            EnrollmentPeriodCode enrollmentPeriodCode = EnrollmentPeriodCode.valueOf(period.toUpperCase().concat("_ENROLLMENT_PERIOD"));
            SemesterStatus semesterStatus = SemesterStatus.valueOf("ACTIVATED");

            Optional<EnrollmentPeriod> enrollmentPeriodOptinal = enrollmentPeriodRepository.findByTypeAndCodeAndStatus(topicType, enrollmentPeriodCode, semesterStatus);

            EnrollmentPeriod enrollmentPeriod = enrollmentPeriodOptinal.get();
            Map<String, EnrollmentPeriodDTO> data = new HashMap<>();
            data.put("enrollmentPeriod", enrollmentPeriodMapper.toDTO(enrollmentPeriod));
            return Response.<EnrollmentPeriodDTO>builder()
                    .message("Enrollment period has been successfully retrieved")
                    .statusCode(HttpStatus.OK.value())
                    .data(data)
                    .build();
        } catch (IllegalArgumentException e) {
            return Response.<EnrollmentPeriodDTO>builder()
                .message("Invalid parameter!")
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .build();
        } catch (NoSuchElementException e) {
            return Response.<EnrollmentPeriodDTO>builder()
                .message("Data not found")
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .build();
        }
    }
}
