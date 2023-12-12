package com.bosch.topicregistration.api.enrollmentperiod;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.Response;
import com.bosch.topicregistration.api.semester.Semester;
import com.bosch.topicregistration.api.semester.SemesterRepository;
import com.bosch.topicregistration.api.semester.SemesterStatus;
import com.bosch.topicregistration.api.topic.TopicType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class EnrollmentPeriodImpl implements EnrollmentPeriodService {
    private final EnrollmentPeriodRepository enrollmentPeriodRepository;
    private final EnrollmentPeriodMapper enrollmentPeriodMapper;
    private final SemesterRepository semesterRepository;

    @Override
    @LoggerAround
    public Response<EnrollmentPeriodDTO> getActivatedEnrollmentPeriod(String type) {
        // validate Topic type and Period not null
        if (type.isEmpty())
            throw new BadRequestException("Type parameter is empty");

        // validate Topic type
        boolean isMatchTopicType = Arrays.stream(TopicType.values())
                .anyMatch(item -> StringUtils.equals(item.name(), type));
        if (!isMatchTopicType)
            throw new BadRequestException("Topic type is not valid");

        // Get parameters from ENUM
        TopicType topicType = TopicType.valueOf(type);
        SemesterStatus semesterStatus = SemesterStatus.ACTIVATED;

        // Get Enrollment Period based on Topic type, Enrollment Period with Activated
        // status
        Optional<EnrollmentPeriod> enrollmentPeriodOptional = enrollmentPeriodRepository
                .findByTypeAndStatus(topicType, semesterStatus);

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

    @Override
    public Response<Set<EnrollmentPeriodDTO>> getListEnrollmentPeriodBySemester(String semesterId) {
        Optional<Semester> semesterOptional = semesterRepository.findById(semesterId);
        if (!semesterOptional.isPresent())
            throw new BadRequestException("Semester could not be found");

        Semester semester = semesterOptional.get();
        Set<EnrollmentPeriod> enrollmentPeriods = semester.getEnrollmentPeriods();

        Set<EnrollmentPeriodDTO> enrollmentPeriodDTOs = enrollmentPeriodMapper.toSetDTO(enrollmentPeriods);
        Map<String, Set<EnrollmentPeriodDTO>> data = new HashMap<>();
        data.put("enrollmentPeriods", enrollmentPeriodDTOs);

        return Response.<Set<EnrollmentPeriodDTO>>builder()
                .message("Enrollment periods have been successfully retrieved")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }
}
