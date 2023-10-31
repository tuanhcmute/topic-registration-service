package com.bosch.topicregistration.api.enrollment.topic;

import com.bosch.topicregistration.api.enrollment.TopicEnrollment;
import com.bosch.topicregistration.api.enrollment.TopicEnrollmentRepository;
import com.bosch.topicregistration.api.enrollment.semester.Semester;
import com.bosch.topicregistration.api.enrollment.semester.SemesterRepository;
import com.bosch.topicregistration.api.enrollment.semester.SemesterStatus;
import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.Response;
import com.bosch.topicregistration.api.user.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static com.bosch.topicregistration.api.enrollment.topic.TopicRequestValidator.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class TopicServiceImpl implements TopicService {

    private final TopicRepository topicRepository;
    private final SemesterRepository semesterRepository;
    private final UserCommon userCommon;
    private final TopicMapper topicMapper;
    private final MajorRepository majorRepository;
    private final UserRepository userRepository;
    private final TopicEnrollmentRepository topicEnrollmentRepository;

    @LoggerAround
    @Override
    public Response<List<TopicDTO>> getAllTopicsInLectureEnrollmentPeriod(String type, Integer pageNumber, Integer pageSize, String sortBy) {
//        Get topic type by type from client
//         Validate type
        boolean isMatch = Arrays.stream(TopicType.values()).anyMatch(item -> StringUtils.equals(item.name(), type));
        if (!isMatch) throw new BadRequestException("Topic type is not valid");
        TopicType topicType = TopicType.valueOf(type);

//        Get current semester
        List<Semester> semesters = semesterRepository.findByStatus(SemesterStatus.ACTIVATED);
        if (semesters.size() == 0) throw new BadRequestException("Current semester is not activated");
        Semester currentSemester = semesters.get(0);

//        Get current user
        Optional<User> userOptional = userCommon.getCurrentUserByCurrentAuditor();
        if (!userOptional.isPresent()) throw new BadRequestException("Lecture could not be found");
        User lecture = userOptional.get();

//        Define paging
        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());

//         Get topics
        Page<Topic> topicPage = topicRepository.findBySemesterAndTypeAndLecture(currentSemester, topicType, lecture, paging);
        List<TopicDTO> listTopicDTO = topicMapper.toListDTO(topicPage.getContent());
        Map<String, List<TopicDTO>> data = new HashMap<>();
        data.put("topics", listTopicDTO);
        return Response.<List<TopicDTO>>builder()
                .message("Topics have been successfully retrieved")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }

    @Override
    public Response<Void> createNewTopicInLectureEnrollmentPeriod(NewTopicRequest request) {
//        Validate request
        TopicValidatorResult result = isMajorCodeValid()
                .and(isGoalValid())
                .and(isTopicNameValid())
                .and(isRequirementValid())
                .and(isTypeValid())
                .and(isMaxSlotValid())
                .and(isAvailableSlotValid(request.getMaxSlot()))
                .apply(request);
        if (!result.equals(TopicValidatorResult.VALID)) throw new BadRequestException(result.getMessage());

//        Get lecture
        Optional<User> userOptional = userCommon.getCurrentUserByCurrentAuditor();
        if (!userOptional.isPresent()) throw new BadRequestException("Lecture could not be found");
        User lecture = userOptional.get();
        if (!StringUtils.equals(lecture.getNtid(), request.getNtid()))
            throw new BadRequestException("Lecture code is not valid");
        log.info("Lecture: {}", lecture.getId());

//        Get major
        Optional<Major> majorOptional = majorRepository.findByCode(request.getMajorCode());
        if (!majorOptional.isPresent()) throw new BadRequestException("Major could not be found");
        Major major = majorOptional.get();
        log.info("Major: {}", major.getId());

//        Get available slot
        if (request.getMaxSlot() < request.getStudents().size())
            throw new BadRequestException("Max slot could not be less than size of student");
        Integer availableSlot = request.getMaxSlot() - request.getStudents().size();
        log.info("Available slot: {}", availableSlot);

//         Get students
        List<User> students = userRepository.findAllByNtids(request.getStudents());
        log.info("Size of students: {}", students.size());

//        Get topicType
        TopicType topicType = TopicType.valueOf(request.getType());
        log.info("Topic type: {}", topicType.name());

//        Get semester
        List<Semester> semesters = semesterRepository.findByStatus(SemesterStatus.ACTIVATED);
        if (semesters.isEmpty()) throw new BadRequestException("Current semester could not be found");
        Semester currentSemester = semesters.get(0);

        // Topic instance
        Topic topic = com.bosch.topicregistration.api.enrollment.topic.Topic.builder()
                .name(request.getTopicName())
                .goal(request.getGoal())
                .requirement(request.getRequirement())
                .maxSlot(request.getMaxSlot())
                .major(major)
                .type(topicType)
                .lecture(lecture)
                .status(TopicStatus.PENDING)
                .semester(currentSemester)
                .availableSlot(availableSlot)
                .build();
        topicRepository.save(topic);
        log.info("Topic: {}", topic.getId());

//        Store student enroll topic
        if (!students.isEmpty()) {
            List<TopicEnrollment> topicEnrollments = students.stream().map(student -> TopicEnrollment.builder()
                    .student(student)
                    .topic(topic)
                    .build()).collect(Collectors.toList());
            topicEnrollmentRepository.saveAll(topicEnrollments);
            topicEnrollments.forEach(topicEnrollment -> log.info("Topic enrollment: {}", topicEnrollment.getId()));
        }

        return Response.<Void>builder()
                .statusCode(HttpStatus.CREATED.value())
                .message("Topic has been created successfully")
                .build();
    }

    @Override
    public Response<Void> updateTopicInLectureEnrollmentPeriod(UpdateTopicRequest request) {
//        TODO: Validate
//        TODO: Handling
//        Find topic by id
        Optional<Topic> topicOptional = topicRepository.findById(request.getId());
        if (!topicOptional.isPresent()) throw new BadRequestException("Topic could not be found");
        Topic topic = topicOptional.get();

//        Find list students enroll topic
        List<TopicEnrollment> topicEnrollments = topicEnrollmentRepository.findByTopic(topic);

        // Update value
        topic.setName(request.getTopicName());
        topic.setGoal(request.getGoal());
        topic.setRequirement(request.getRequirement());
        topic.setMaxSlot(request.getMaxSlot());
        topicRepository.save(topic);


//        Return data
        return Response.<Void>builder()
                .statusCode(HttpStatus.OK.value())
                .message("Topic has been updated successfully").build();
    }
}
