package com.bosch.topicregistration.api.topicenrollment;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/topic-enrollment")
@Slf4j
@RequiredArgsConstructor
@Tag(name = "Topic enrollment APIs")
public class TopicEnrollmentController {

    private final TopicEnrollmentService topicEnrollmentService;

    //    [DELETE] /api/v1/topic-enrollment
    @DeleteMapping
    @LoggerAround
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_STUDENT') or hasAuthority('ROLE_LECTURE')")
    public Response<Void> deleteTopicEnrollment(@RequestParam("ntid") String ntid) {
        if (StringUtils.isEmpty(ntid)) throw new BadRequestException("Ntid is not valid");
        return topicEnrollmentService.deleteTopicEnrollment(ntid);
    }

    //    [POST] /api/v1/topic-enrollment
    @PostMapping
    @LoggerAround
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_STUDENT') or hasAuthority('ROLE_LECTURE')")
    public Response<Void> createTopicEnrollment(@RequestBody @Valid CreateTopicEnrollmentRequest request) {
        return topicEnrollmentService.createTopicEnrollment(request);
    }

//    [GET] /api/v1/topic-enrollment
    @GetMapping
    @LoggerAround
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_STUDENT')")
    public Response<List<TopicEnrollmentDTO>> getTopicEnrollmentsByNtid() {
        return topicEnrollmentService.getTopicEnrollmentsByNtid();
    }
}
