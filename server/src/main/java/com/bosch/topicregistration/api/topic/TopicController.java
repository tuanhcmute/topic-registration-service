package com.bosch.topicregistration.api.topic;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.PageResponse;
import com.bosch.topicregistration.api.response.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/topic")
@Slf4j
@RequiredArgsConstructor
@Tag(name = "Topic APIs")
public class TopicController {

    private final TopicService topicService;

    //        [GET] /api/v1/topic/lecture
    @GetMapping("/lecture")
    @PreAuthorize("hasAuthority('ROLE_LECTURE')")
    @ResponseStatus(HttpStatus.OK)
    @LoggerAround
    public Response<PageResponse<List<TopicDTO>>> getAllTopicsByLecture(@RequestParam("type") String type,
                                                                        @RequestParam(defaultValue = "0", name = "pageNumber") Integer pageNumber,
                                                                        @RequestParam(defaultValue = "100", name = "pageSize") Integer pageSize,
                                                                        @RequestParam(defaultValue = "createdDate", name = "sortBy") String sortBy) {
//        Validate type
        boolean isMatch = Arrays.stream(TopicType.values()).anyMatch(item -> StringUtils.equals(item.name(), type));
        if (!isMatch) throw new BadRequestException("Topic type is not valid");
//        Call service
        return topicService.getAllTopicsByLecture(type, pageNumber, pageSize, sortBy);
    }

    @GetMapping("/head")
    @PreAuthorize("hasAuthority('ROLE_HEAD')")
    @ResponseStatus(HttpStatus.OK)
    @LoggerAround
    public Response<PageResponse<List<TopicDTO>>> getAllTopicsIsNotApproved(@RequestParam("type") String type,
                                                                            @RequestParam(defaultValue = "0", name = "pageNumber") Integer pageNumber,
                                                                            @RequestParam(defaultValue = "100", name = "pageSize") Integer pageSize,
                                                                            @RequestParam(defaultValue = "createdDate", name = "sortBy") String sortBy) {
//                Validate type
        log.info("Type: {}", type);
        boolean hasType = Arrays.stream(TopicType.values()).anyMatch(item -> StringUtils.equals(item.name(), type));
        if (!hasType) throw new BadRequestException("Topic type is not valid");

        return topicService.getAllTopicsIsNotApproved(type, pageNumber, pageSize, sortBy);
    }

    @GetMapping("/division")
    @PreAuthorize("hasAnyAuthority('ROLE_HEAD', 'ROLE_STUDENT')")
    @ResponseStatus(HttpStatus.OK)
    @LoggerAround
    public Response<PageResponse<List<TopicDTO>>> getAllApprovedTopics(@RequestParam("type") String type,
                                                                       @RequestParam(defaultValue = "0", name = "pageNumber") Integer pageNumber,
                                                                       @RequestParam(defaultValue = "100", name = "pageSize") Integer pageSize,
                                                                       @RequestParam(defaultValue = "createdDate", name = "sortBy") String sortBy) {
//                Validate type
        log.info("Type: {}", type);
        boolean hasType = Arrays.stream(TopicType.values()).anyMatch(item -> StringUtils.equals(item.name(), type));
        if (!hasType) throw new BadRequestException("Topic type is not valid");

        return topicService.getAllApprovedTopics(type, pageNumber, pageSize, sortBy);
    }

    //    [POST] /api/v1/topic
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_LECTURE')")
    @ResponseStatus(HttpStatus.OK)
    @LoggerAround
    public Response<Void> createTopic(@RequestBody @Valid NewTopicRequest request) {
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
        return topicService.createTopic(request);
    }

    //    [PUT] /api/v1/topic/lecture
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_LECTURE')")
    @ResponseStatus(HttpStatus.OK)
    @LoggerAround
    public Response<Void> updateTopic(@PathVariable String id, @RequestBody @Valid UpdateTopicRequest request) {
        TopicValidatorResult result = UpdateTopicRequestValidator.isTopicNameValid()
                .and(UpdateTopicRequestValidator.isGoalValid())
                .and(UpdateTopicRequestValidator.isRequirementValid())
                .and(UpdateTopicRequestValidator.isMaxSlotValid())
                .apply(request);
        if (!result.equals(TopicValidatorResult.VALID)) throw new BadRequestException(result.getMessage());
        return topicService.updateTopic(id, request);
    }

    //    [PUT] /api/v1/topic/approval
    @PutMapping("/approval/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_HEAD')")
    @ResponseStatus(HttpStatus.OK)
    @LoggerAround
    public Response<Void> approveTopic(@PathVariable String id, @RequestBody @Valid ApprovalTopicRequest request) {
        return topicService.approveTopic(id, request);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    @LoggerAround
    public Response<PageResponse<List<TopicDTO>>> getAllTopics(@RequestParam(defaultValue = "0", name = "pageNumber") Integer pageNumber,
                                                               @RequestParam(defaultValue = "100", name = "pageSize") Integer pageSize,
                                                               @RequestParam(defaultValue = "createdDate", name = "sortBy") String sortBy) {
        return topicService.getAllTopics(pageNumber, pageSize, sortBy);
    }
}
