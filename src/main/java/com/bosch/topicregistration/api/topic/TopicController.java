package com.bosch.topicregistration.api.topic;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/topics")
@Tag(name = "Topics API")
public class TopicController {

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<String> getAllTopics() {
        List<String> topics = new ArrayList<>();
        topics.add("Topic Registration");
        return topics;
    }
}
