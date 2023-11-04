package com.bosch.topicregistration.api.topic;

import com.bosch.topicregistration.api.approvalhistory.ApprovalHistory;
import com.bosch.topicregistration.api.approvalhistory.ApprovalHistoryRepository;
import com.bosch.topicregistration.api.semester.SemesterService;
import com.bosch.topicregistration.api.topicenrollment.TopicEnrollment;
import com.bosch.topicregistration.api.topicenrollment.TopicEnrollmentRepository;
import com.bosch.topicregistration.api.semester.Semester;
import com.bosch.topicregistration.api.semester.SemesterRepository;
import com.bosch.topicregistration.api.semester.SemesterStatus;
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

@Service
@RequiredArgsConstructor
@Slf4j
public class TopicServiceImpl implements TopicService {

    private final SemesterService semesterService;

    private final TopicRepository topicRepository;
    private final SemesterRepository semesterRepository;
    private final UserCommon userCommon;
    private final TopicMapper topicMapper;
    private final MajorRepository majorRepository;
    private final UserRepository userRepository;
    private final TopicEnrollmentRepository topicEnrollmentRepository;
    private final ApprovalHistoryRepository approvalHistoryRepository;

    @LoggerAround
    @Override
    public Response<List<TopicDTO>> getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture(String type, Integer pageNumber, Integer pageSize, String sortBy) {
//         Validate type
        boolean isMatch = Arrays.stream(TopicType.values()).anyMatch(item -> StringUtils.equals(item.name(), type));
        if (!isMatch) throw new BadRequestException("Topic type is not valid");
        TopicType topicType = TopicType.valueOf(type);

//        Get current semester
        Semester currentSemester = semesterService.getActivatedSemester();

//        Get current user
        User lecture = userCommon.getCurrentUserByCurrentAuditor();

//        Define paging
        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());

//         Get topics
        Page<Topic> topicPage = topicRepository.findBySemesterAndTypeAndLecture(currentSemester, topicType, lecture, paging);
        return buildResponse(topicPage);
    }

    @Override
    public Response<Void> createNewTopicInLectureEnrollmentPeriod(NewTopicRequest request) {
//        Validate request
        TopicValidatorResult result = TopicRequestValidator.isMajorCodeValid()
                .and(TopicRequestValidator.isGoalValid())
                .and(TopicRequestValidator.isTopicNameValid())
                .and(TopicRequestValidator.isRequirementValid())
                .and(TopicRequestValidator.isTypeValid())
                .and(TopicRequestValidator.isMaxSlotValid())
                .and(TopicRequestValidator.isAvailableSlotValid(request.getMaxSlot()))
                .apply(request);
        if (!result.equals(TopicValidatorResult.VALID)) throw new BadRequestException(result.getMessage());

//        Get lecture
        User lecture = userCommon.getCurrentUserByCurrentAuditor();
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

//         Get students enroll topic
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
        Topic topic = Topic.builder()
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
        TopicValidatorResult result = UpdateTopicRequestValidator.isTopicNameValid()
                .and(UpdateTopicRequestValidator.isGoalValid())
                .and(UpdateTopicRequestValidator.isRequirementValid())
                .and(UpdateTopicRequestValidator.isMaxSlotValid())
                .apply(request);
        if(!result.equals(TopicValidatorResult.VALID)) throw new BadRequestException(result.getMessage());

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
        topic.setStatus(TopicStatus.UPDATED);
        topicRepository.save(topic);

//        Return data
        return Response.<Void>builder()
                .statusCode(HttpStatus.OK.value())
                .message("Topic has been updated successfully").build();
    }

    @Override
    public Response<Void> approveTopicInLectureEnrollmentPeriod(ApprovalTopicRequest request) {
//        TODO: Validate request
//        Get topic status
        boolean isMatch = Arrays.stream(TopicStatus.values()).anyMatch(topicStatus -> topicStatus.name().equals(request.getStatus()));
        if(!isMatch) throw new BadRequestException("Topic status could not be found");
        TopicStatus status = TopicStatus.valueOf(request.getStatus());

//        Get topic
        Optional<Topic> topicOptional = topicRepository.findById(request.getId());
        if(!topicOptional.isPresent()) throw new BadRequestException("Topic could not be found");
        Topic topic = topicOptional.get();

//        Update topic when topic status doest not equal APPROVED
        if(!topic.getStatus().equals(TopicStatus.APPROVED))  {
//            Update topic status
            topic.setStatus(status);
            topicRepository.save(topic);
            log.info("Topic status: {}", topic.getStatus().name());

//        Store approval history
            ApprovalHistory approvalHistory = ApprovalHistory.builder()
                    .status(status)
                    .reason(request.getReason())
                    .topic(topic)
                    .build();
            approvalHistoryRepository.save(approvalHistory);
            log.info("Approval history: {}", approvalHistory.getId());
        }
        return Response.<Void>builder()
                .statusCode(HttpStatus.OK.value())
                .message("Topic has been updated successfully")
                .build();
    }

    @Override
    @LoggerAround
    public Response<List<TopicDTO>> getAllTopicsInLectureEnrollmentPeriodByTypeAndTopicStatusAndMajor(String type, String status, Integer pageNumber, Integer pageSize, String sortBy) {
//                Validate type
        boolean hasType = Arrays.stream(TopicType.values()).anyMatch(item -> StringUtils.equals(item.name(), type));
        if (!hasType) throw new BadRequestException("Topic type is not valid");
        TopicType topicType = TopicType.valueOf(type);

//        Validate status
        boolean hasStatus = Arrays.stream(TopicStatus.values()).anyMatch(item -> item.name().equals(status));
        if (!hasStatus) throw new BadRequestException("Topic status is not valid");
        TopicStatus currentStatus = TopicStatus.valueOf(status);

        //        Get current semester
        Semester currentSemester = semesterService.getActivatedSemester();

//        Get current user
        User currentHead = userCommon.getCurrentUserByCurrentAuditor();

//        Define paging
        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());

        Page<Topic> topicPage = topicRepository.findBySemesterAndTypeAndStatusAndMajor(currentSemester, topicType, currentStatus, currentHead.getMajor(), paging);
        return buildResponse(topicPage);
    }

    private Response<List<TopicDTO>> buildResponse(Page<Topic> topicPage) {
        List<TopicDTO> listTopicDTO = topicMapper.toListDTO(topicPage.getContent());
        Map<String, List<TopicDTO>> data = new HashMap<>();
        data.put("topics", listTopicDTO);
        return Response.<List<TopicDTO>>builder()
                .message("Topics have been successfully retrieved")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }
}
