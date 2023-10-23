package com.bosch.topicregistration.api.enrollment.topic;

import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/topic")
@Slf4j
@RequiredArgsConstructor
public class TopicController {

    private final TopicService topicService;

    @GetMapping("/lecture")
    @PreAuthorize("hasAuthority('ROLE_LECTURE')")
    @ResponseStatus(HttpStatus.OK)
    @LoggerAround
    public Response<List<TopicDTO>> getAllTopicsInLectureEnrollmentPeriod(@RequestParam("type") String type) {
        return topicService.getAllTopicsInLectureEnrollmentPeriod(type);
    }
}
