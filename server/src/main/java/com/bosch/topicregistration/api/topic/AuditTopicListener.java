package com.bosch.topicregistration.api.topic;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.persistence.PostPersist;

@Slf4j
@Component
@AllArgsConstructor
@NoArgsConstructor
public class AuditTopicListener {

    private TopicRepository topicRepository;

    @PostPersist
    private void afterCreateTopic(Topic topic) {
        log.info("Topic name: {}", topic.getName());
    }
}
