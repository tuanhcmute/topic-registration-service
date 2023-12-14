package com.bosch.topicregistration.api.topic;

import com.bosch.topicregistration.api.approvalhistory.ApprovalHistoryRepository;
import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.PageResponse;
import com.bosch.topicregistration.api.response.Response;
import com.bosch.topicregistration.api.semester.Semester;
import com.bosch.topicregistration.api.semester.SemesterRepository;
import com.bosch.topicregistration.api.semester.SemesterService;
import com.bosch.topicregistration.api.semester.SemesterStatus;
import com.bosch.topicregistration.api.topicenrollment.CreateTopicEnrollmentRequest;
import com.bosch.topicregistration.api.topicenrollment.TopicEnrollment;
import com.bosch.topicregistration.api.topicenrollment.TopicEnrollmentRepository;
import com.bosch.topicregistration.api.topicenrollment.TopicEnrollmentService;
import com.bosch.topicregistration.api.user.Major;
import com.bosch.topicregistration.api.user.MajorRepository;
import com.bosch.topicregistration.api.user.User;
import com.bosch.topicregistration.api.user.UserCommon;
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
    private final TopicEnrollmentRepository topicEnrollmentRepository;
    private final ApprovalHistoryRepository approvalHistoryRepository;
    private final TopicEnrollmentService topicEnrollmentService;

    @LoggerAround
    @Override
    public Response<PageResponse<List<TopicDTO>>> getAllTopicsByLecture(String type, Integer pageNumber, Integer pageSize, String sortBy) {
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
        Page<Topic> page = topicRepository.findBySemesterAndTypeAndLecture(currentSemester, topicType, lecture, paging);
        PageResponse<List<TopicDTO>> pageResponse = PageResponse.<List<TopicDTO>>builder()
                .totalPages(page.getTotalPages())
                .totalElements(page.getTotalElements())
                .content(topicMapper.toListDTO(page.getContent()))
                .build();

//        Build data
        Map<String, PageResponse<List<TopicDTO>>> data = new HashMap<>();
        data.put("page", pageResponse);
        return Response.<PageResponse<List<TopicDTO>>>builder()
                .message("Topics have been successfully retrieved")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }

    @Override
    public Response<Void> createTopic(NewTopicRequest request) {
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
                .availableSlot(request.getMaxSlot())
                .build();
        topicRepository.save(topic);
        log.info("Topic: {}", topic.getId());

//        Store student enroll topic
        if (!request.getStudents().isEmpty()) {
            request.getStudents().forEach(ntid -> {
                CreateTopicEnrollmentRequest req = CreateTopicEnrollmentRequest.builder()
                        .topicId(topic.getId())
                        .ntid(ntid)
                        .build();
            topicEnrollmentService.createTopicEnrollment(req);
            });
        }

        return Response.<Void>builder()
                .statusCode(HttpStatus.CREATED.value())
                .message("Topic has been created successfully")
                .build();
    }

    @Override
    public Response<Void> updateTopic(String id, UpdateTopicRequest request) {
        TopicValidatorResult result = UpdateTopicRequestValidator.isTopicNameValid()
                .and(UpdateTopicRequestValidator.isGoalValid())
                .and(UpdateTopicRequestValidator.isRequirementValid())
                .and(UpdateTopicRequestValidator.isMaxSlotValid())
                .apply(request);
        if (!result.equals(TopicValidatorResult.VALID)) throw new BadRequestException(result.getMessage());

//        Find topic by id
        Optional<Topic> topicOptional = topicRepository.findById(id);
        if (!topicOptional.isPresent()) throw new BadRequestException("Topic could not be found");
        Topic topic = topicOptional.get();

//        Get current topic enrollment to compare with student request
        boolean isAllMatch = false;
        List<TopicEnrollment> currentTopicEnrollments = topicEnrollmentRepository.findByTopicOrderByIsLeaderDesc(topic);
        if (!currentTopicEnrollments.isEmpty()) {
            currentTopicEnrollments.forEach(topicEnrollment -> request.getStudents().forEach(item -> {
                if(topicEnrollment.getStudent().getNtid().equals(item)) request.getStudents().remove(item);
            }));
            if(request.getStudents().isEmpty()) isAllMatch = true;
            log.info(request.getStudents().toString());
        }
        log.info("Is all match: {}", isAllMatch);

        if (!isAllMatch) {
//        Validate available slot
            if (topic.getAvailableSlot() < request.getStudents().size())
                throw new BadRequestException("Available slot could not be less than size of student");

            request.getStudents().forEach(ntid -> {
                CreateTopicEnrollmentRequest req = CreateTopicEnrollmentRequest.builder()
                        .topicId(topic.getId())
                        .ntid(ntid)
                        .build();
                topicEnrollmentService.createTopicEnrollment(req);
            });
        }

        // Update value
        topic.setName(request.getTopicName());
        topic.setGoal(request.getGoal());
        topic.setRequirement(request.getRequirement());
        topic.setMaxSlot(request.getMaxSlot());
        topic.setStatus(TopicStatus.UPDATED);
        topicRepository.save(topic);

////        Store approval history
//        ApprovalHistory approvalHistory = ApprovalHistory.builder()
//                .status(TopicStatus.UPDATED)
//                .reason("Đã được cập nhật")
//                .topic(topic)
//                .build();
//        approvalHistoryRepository.save(approvalHistory);

//        Return data
        return Response.<Void>builder()
                .statusCode(HttpStatus.OK.value())
                .message("Topic has been updated successfully").build();
    }

    @Override
    public Response<Void> approveTopic(String id, ApprovalTopicRequest request) {
//        TODO: Validate request
//        Get topic status
        boolean isMatch = Arrays.stream(TopicStatus.values()).anyMatch(topicStatus -> topicStatus.name().equals(request.getStatus()));
        if (!isMatch) throw new BadRequestException("Topic status could not be found");
        TopicStatus status = TopicStatus.valueOf(request.getStatus());

//        Get topic
        Optional<Topic> topicOptional = topicRepository.findById(id);
        if (!topicOptional.isPresent()) throw new BadRequestException("Topic could not be found");
        Topic topic = topicOptional.get();

//        Update topic when topic status doest not equal APPROVED
        if (!topic.getStatus().equals(TopicStatus.APPROVED)) {
//            Update topic status
            topic.setStatus(status);
            topicRepository.save(topic);
            log.info("Topic status: {}", topic.getStatus().name());

////        Store approval history
//            ApprovalHistory approvalHistory = ApprovalHistory.builder()
//                    .status(status)
//                    .reason(request.getReason())
//                    .topic(topic)
//                    .build();
//            approvalHistoryRepository.save(approvalHistory);
//            log.info("Approval history: {}", approvalHistory.getId());
        }
        return Response.<Void>builder()
                .statusCode(HttpStatus.OK.value())
                .message("Topic has been updated successfully")
                .build();
    }

    @Override
    @LoggerAround
    public Response<List<TopicDTO>> getAllTopicsIsNotApproved(String type, Integer pageNumber, Integer pageSize, String sortBy) {
//                Validate type
        boolean hasType = Arrays.stream(TopicType.values()).anyMatch(item -> StringUtils.equals(item.name(), type));
        if (!hasType) throw new BadRequestException("Topic type is not valid");
        TopicType topicType = TopicType.valueOf(type);

//        Exclude status
        List<TopicStatus> statuses = Arrays.asList(TopicStatus.APPROVED, TopicStatus.ASSIGNED);
//        Get current semester
        Semester currentSemester = semesterService.getActivatedSemester();

//        Get current user
        User currentHead = userCommon.getCurrentUserByCurrentAuditor();

//        Define paging
        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());

        Page<Topic> topicPage = topicRepository.findBySemesterAndTypeAndMajorAndStatusNotIn(currentSemester, topicType, currentHead.getMajor(), statuses, paging);
        return buildResponse(topicPage);
    }

    @Override
    public Response<List<TopicDTO>> getAllApprovedTopics(String type, Integer pageNumber, Integer pageSize, String sortBy) {
//      Validate type
        boolean hasType = Arrays.stream(TopicType.values()).anyMatch(item -> StringUtils.equals(item.name(), type));
        if (!hasType) throw new BadRequestException("Topic type is not valid");
        TopicType topicType = TopicType.valueOf(type);

//        Get current semester
        Semester currentSemester = semesterService.getActivatedSemester();

//        Get current user
        User currentUser = userCommon.getCurrentUserByCurrentAuditor();

//        Define paging
        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());

        Page<Topic> topicPage = topicRepository.findBySemesterAndTypeAndMajorAndStatusIn(currentSemester, topicType,
                currentUser.getMajor(), Collections.singletonList(TopicStatus.APPROVED), paging);
        log.info("Size page: {}", topicPage.getContent().size());
        return buildResponse(topicPage);
    }

    @Override
    public Response<PageResponse<List<TopicDTO>>> getAllTopics(Integer pageNumber, Integer pageSize, String sortBy) {
//        Define paging
        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());

        Page<Topic> page = topicRepository.findAll(paging);
        PageResponse<List<TopicDTO>> pageResponse = PageResponse.<List<TopicDTO>>builder()
                .totalPages(page.getTotalPages())
                .totalElements(page.getTotalElements())
                .content(topicMapper.toListDTO(page.getContent()))
                .build();

//        Build data
        Map<String, PageResponse<List<TopicDTO>>> data = new HashMap<>();
        data.put("page", pageResponse);

        return Response.<PageResponse<List<TopicDTO>>>builder()
                .message("Topics have been successfully retrieved")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
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
