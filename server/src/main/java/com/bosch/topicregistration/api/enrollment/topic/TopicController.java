package com.bosch.topicregistration.api.enrollment.topic;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.bosch.topicregistration.api.enrollment.topic.TopicRequestValidator.*;

@RestController
@RequestMapping("/topic")
@Slf4j
@RequiredArgsConstructor
public class TopicController {

    private final TopicService topicService;

    // [GET] /api/v1/topic/lecture
    @GetMapping("/lecture")
    @PreAuthorize("hasAuthority('ROLE_LECTURE')")
    @ResponseStatus(HttpStatus.OK)
    @LoggerAround
    public Response<List<TopicDTO>> getAllTopicsInLectureEnrollmentPeriod(@RequestParam("type") String type,
            @RequestParam(defaultValue = "0", name = "pageNumber") Integer pageNumber,
            @RequestParam(defaultValue = "10", name = "pageSize") Integer pageSize,
            @RequestParam(defaultValue = "id", name = "sortBy") String sortBy) {
        return topicService.getAllTopicsInLectureEnrollmentPeriod(type, pageNumber, pageSize, sortBy);
    }

    // [POST] /api/v1/topic/lecture
    @PostMapping("/lecture")
    @PreAuthorize("hasAuthority('ROLE_LECTURE')")
    @ResponseStatus(HttpStatus.OK)
    @LoggerAround
    public Response<Void> createNewTopicInLectureEnrollmentPeriod(@RequestBody NewTopicRequest request) {
        // Validate request
        TopicValidatorResult result = isMajorCodeValid()
                .and(isGoalValid())
                .and(isTopicNameValid())
                .and(isRequirementValid())
                .and(isTypeValid())
                .and(isMaxSlotValid())
                .and(isAvailableSlotValid(request.getMaxSlot()))
                .apply(request);
        if (!result.equals(TopicValidatorResult.VALID))
            throw new BadRequestException(result.getMessage());
        // Call service
        return topicService.createNewTopicInLectureEnrollmentPeriod(request);
    }

    // [PUT] /api/v1/topic/lecture
    @PutMapping("/lecture")
    @LoggerAround
    public Response<Void> updateTopicInLectureEnrollmentPeriod(@RequestBody UpdateTopicRequest request) {
        // TODO: Validate
        // TODO: Handling
        return topicService.updateTopicInLectureEnrollmentPeriod(request);
    }
}
