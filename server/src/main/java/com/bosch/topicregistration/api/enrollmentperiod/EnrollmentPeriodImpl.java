package com.bosch.topicregistration.api.enrollmentperiod;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.Response;
import com.bosch.topicregistration.api.semester.Semester;
import com.bosch.topicregistration.api.semester.SemesterRepository;
import com.bosch.topicregistration.api.semester.SemesterStatus;
import com.bosch.topicregistration.api.topic.Topic;
import com.bosch.topicregistration.api.topic.TopicRepository;
import com.bosch.topicregistration.api.topic.TopicStatus;
import com.bosch.topicregistration.api.topic.TopicType;
import com.bosch.topicregistration.api.topicenrollment.TopicEnrollment;
import com.bosch.topicregistration.api.topicenrollment.TopicEnrollmentRepository;
import com.bosch.topicregistration.api.user.User;
import com.bosch.topicregistration.api.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

import static com.bosch.topicregistration.api.enrollmentperiod.TopicRegistrationValidator.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class EnrollmentPeriodImpl implements EnrollmentPeriodService {
    private final EnrollmentPeriodRepository enrollmentPeriodRepository;
    private final EnrollmentPeriodMapper enrollmentPeriodMapper;
    private final TopicRepository topicRepository;
    private final UserRepository userRepository;
    private final TopicEnrollmentRepository topicEnrollmentRepository;
    private final SemesterRepository semesterRepository;

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

    @Override
    public Response<EnrollmentPeriodDTO> registrationTopic(NewTopicRegistration newTopicRegistration) {
        // Check null
        if (Objects.isNull(newTopicRegistration))
            throw new BadRequestException("Request is empty");

        // Check detail attribute
        TopicRegistrationValidatorResult result = isTopicCodeValid()
                .and(isStudentsValid())
                .and(isStudentCodeValid())
                .apply(newTopicRegistration);
        if (!result.equals(TopicRegistrationValidatorResult.VALID))
            throw new BadRequestException(result.getMessage());

        TopicEnrollment topicEnrollment = new TopicEnrollment();
        String topicId = newTopicRegistration.getTopicCode();
        Optional<Topic> topicOptional = topicRepository.findById(topicId);
        // Check null Topic
        if (!topicOptional.isPresent())
            throw new BadRequestException("Topic could not be found");
        Topic topic = topicOptional.get();

        List<Map<String, String>> stduentIDs = newTopicRegistration.getStudents();
        // Check list request with max slot in topic
        if (stduentIDs.size() > topic.getMaxSlot())
            throw new BadRequestException("The request exceeds the maximum number of topics");

        stduentIDs.stream().map(item -> item.get("code"))
                .forEach(item -> {
                    // Check user
                    Optional<User> userOptional = userRepository.findByEmail(item.concat("@student.hcmute.edu.vn"));
                    if (!userOptional.isPresent())
                        throw new BadRequestException("Student could not be found");
                    User user = userOptional.get();
                    topicEnrollment.setId(UUID.randomUUID().toString());
                    topicEnrollment.setTopic(topic);
                    topicEnrollment.setStudent(user);
                    topicEnrollment.setCreatedBy(null);
                    topicEnrollment.setCreatedDate(LocalDateTime.now());
                    topicEnrollment.setUpdatedDate(LocalDateTime.now());

                    // Student registration new topic
                    topicEnrollmentRepository.save(topicEnrollment);
                });
        // Update topic status
        topic.setStatus(TopicStatus.UPDATED);
        topicRepository.save(topic);
        return Response.<EnrollmentPeriodDTO>builder()
                .message("The student has successfully enrolled")
                .statusCode(HttpStatus.OK.value())
                .build();
    }

    @Override
    public Response<Set<EnrollmentPeriodDTO>> getListEnrollmentPeriodBySemester(String semesterId) {
        Optional<Semester> semesterOptional = semesterRepository.findById(semesterId);
        if (!semesterOptional.isPresent())
            throw new BadRequestException("Semester could not be found");

        Semester semester = semesterOptional.get();
        Set<EnrollmentPeriod> enrollmentPeriods = semester.getEnrollmentPeriods();

        if (enrollmentPeriods.size() == 0)
            throw new BadRequestException("Enrollment period could not be found");

        Set<EnrollmentPeriodDTO> enrollmentPeriodDTOs = enrollmentPeriodMapper.toSetDTO(enrollmentPeriods);
        Map<String, Set<EnrollmentPeriodDTO>> data = new HashMap<>();
        data.put("enrollmentPeriods", enrollmentPeriodDTOs);

        return Response.<Set<EnrollmentPeriodDTO>>builder()
                .message("Get enrollment periods successfull")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }
}
