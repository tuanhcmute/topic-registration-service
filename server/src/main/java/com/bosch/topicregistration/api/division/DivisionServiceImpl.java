package com.bosch.topicregistration.api.division;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.Response;
import com.bosch.topicregistration.api.semester.Semester;
import com.bosch.topicregistration.api.semester.SemesterRepository;
import com.bosch.topicregistration.api.semester.SemesterStatus;
import com.bosch.topicregistration.api.topic.Topic;
import com.bosch.topicregistration.api.topic.TopicRepository;
import com.bosch.topicregistration.api.topic.TopicType;
import com.bosch.topicregistration.api.user.RoleCode;
import com.bosch.topicregistration.api.user.User;
import com.bosch.topicregistration.api.user.UserCommon;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class DivisionServiceImpl implements DivisionService {

    private final DivisionRepository divisionRepository;
    private final UserCommon userCommon;
    private final SemesterRepository semesterRepository;
    private final DivisionMapper divisionMapper;
    private final TopicRepository topicRepository;

    @Override
    @LoggerAround
    public Response<List<DivisionDTO>> getDivisionByTopicType(String topicType) {
//        Validate request
        if(StringUtils.isBlank(topicType)) throw new BadRequestException("Topic type is not valid");
        log.info("Topic type is not blank");

//        Validate value of request
        boolean isValid = Arrays.stream(TopicType.values()).anyMatch(item -> item.name().equals(topicType));
        if(!isValid) throw new BadRequestException("Topic type could not be found");
        TopicType currentType = TopicType.valueOf(topicType);
        log.info("Topic type: {}", currentType.name());

//        Get current user
        User currentUser = userCommon.getCurrentUserByCurrentAuditor();

//        Validate role
        boolean hasLectureRole = currentUser.getUserRoles().stream().anyMatch(userRole -> userRole.getRole().getCode().equals(RoleCode.ROLE_LECTURE));
        if(!hasLectureRole) throw new AccessDeniedException("User could not permission to access this resource. Access is denied");

//        Get activated semester
        List<Semester> semesters = semesterRepository.findByStatus(SemesterStatus.ACTIVATED);
        if(semesters.isEmpty()) throw new BadRequestException("Current semester could not be found");
        Semester currentSemester = semesters.get(0);

        List<Division> divisions = divisionRepository.findByLecture(currentUser);
        List<Division> currentDivisions = divisions.stream()
                .filter(division -> division.getTopic().getSemester().equals(currentSemester))
                .collect(Collectors.toList());
        List<DivisionDTO> divisionDTOList = divisionMapper.toListDTO(currentDivisions);

//        Build response
        Map<String, List<DivisionDTO>> data = new HashMap<>();
        data.put("divisions", divisionDTOList);

        return Response.<List<DivisionDTO>>builder()
                .message("Divisions have been retrieved successfully")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }

    @Override
    public Response<Void> createDivisionByTopicType(String topicType, CreateDivisionRequest request) {
        //        Validate request
        if(StringUtils.isBlank(topicType)) throw new BadRequestException("Topic type is not valid");
        log.info("Topic type is not blank");

//        Validate request body
        boolean isValid = Arrays.stream(TopicType.values()).anyMatch(item -> item.name().equals(topicType));
        if(!isValid) throw new BadRequestException("Topic type could not be found");
        TopicType currentType = TopicType.valueOf(topicType);
        log.info("Topic type: {}", currentType.name());

        //        Validate user
        User currentUser = userCommon.getCurrentUserByCurrentAuditor();
        boolean hasHeadRole = currentUser.getUserRoles().stream().anyMatch(userRole -> userRole.getRole().getCode().equals(RoleCode.ROLE_HEAD));
        if(!hasHeadRole) throw new AccessDeniedException("User could not permission to access this resource. Access is denied");

        Optional<Topic> topicOptional = topicRepository.findById(request.getTopicId());
        if(!topicOptional.isPresent()) throw new BadRequestException("Topic could not be found");
        Topic currentTopic = topicOptional.get();

//        Build Division
        Division division = Division.builder()
                .lecture(currentUser)
                .topic(currentTopic)
                .place(request.getPlace())
                .specifiedTime(request.getSpecifiedTime())
//                hard code start date
                .startDate(LocalDateTime.now())
                .build();
        divisionRepository.save(division);
        log.info("Division: {}", division.getId());

        return Response.<Void>builder()
                .statusCode(HttpStatus.CREATED.value())
                .message("Division has been created successfully")
                .build();
    }

}
