package com.bosch.topicregistration.api.topic;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/topic")
@Slf4j
@RequiredArgsConstructor
public class TopicController {

    private final TopicService topicService;

    //        [GET] /api/v1/topic/lecture
    @GetMapping("/lecture")
    @PreAuthorize("hasAuthority('ROLE_LECTURE')")
    @ResponseStatus(HttpStatus.OK)
    @LoggerAround
    public Response<List<TopicDTO>> getAllTopicsInLectureEnrollmentPeriod(@RequestParam("type") String type,
                                                                          @RequestParam(defaultValue = "0", name = "pageNumber") Integer pageNumber,
                                                                          @RequestParam(defaultValue = "100", name = "pageSize") Integer pageSize,
                                                                          @RequestParam(defaultValue = "createdDate", name = "sortBy") String sortBy) {
//        Validate type
        boolean isMatch = Arrays.stream(TopicType.values()).anyMatch(item -> StringUtils.equals(item.name(), type));
        if (!isMatch) throw new BadRequestException("Topic type is not valid");
//        Call service
        return topicService.getAllTopicsInLectureEnrollmentPeriod(type, pageNumber, pageSize, sortBy);
    }

    //    [POST] /api/v1/topic/lecture
    @PostMapping("/lecture")
    @PreAuthorize("hasAuthority('ROLE_LECTURE')")
    @ResponseStatus(HttpStatus.OK)
    @LoggerAround
    public Response<Void> createNewTopicInLectureEnrollmentPeriod(@RequestBody NewTopicRequest request) {
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
//        Call service
        return topicService.createNewTopicInLectureEnrollmentPeriod(request);
    }

    //    [PUT] /api/v1/topic/lecture
    @PutMapping("/lecture")
    @PreAuthorize("hasAnyAuthority('ROLE_LECTURE')")
    @ResponseStatus(HttpStatus.OK)
    @LoggerAround
    public Response<Void> updateTopicInLectureEnrollmentPeriod(@RequestBody UpdateTopicRequest request) {
        TopicValidatorResult result = UpdateTopicRequestValidator.isTopicNameValid()
                .and(UpdateTopicRequestValidator.isGoalValid())
                .and(UpdateTopicRequestValidator.isRequirementValid())
                .and(UpdateTopicRequestValidator.isMaxSlotValid())
                .apply(request);
        if(!result.equals(TopicValidatorResult.VALID)) throw new BadRequestException(result.getMessage());
        return topicService.updateTopicInLectureEnrollmentPeriod(request);
    }

    //    [PUT] /api/v1/topic/lecture/approval
    @PutMapping("/lecture/approval")
    @PreAuthorize("hasAnyAuthority('ROLE_HEAD')")
    @ResponseStatus(HttpStatus.OK)
    @LoggerAround
    public Response<Void> approveTopicInLectureEnrollmentPeriod(@RequestBody ApprovalTopicRequest request) {
//        TODO: Validate
//        TODO: Handling
        return topicService.approveTopicInLectureEnrollmentPeriod(request);
    }
}
