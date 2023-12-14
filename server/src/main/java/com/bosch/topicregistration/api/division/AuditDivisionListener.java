package com.bosch.topicregistration.api.division;

import com.bosch.topicregistration.api.auditing.ApplicationContextAwareImpl;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.topic.TopicRepository;
import com.bosch.topicregistration.api.topic.TopicStatus;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.PostPersist;

@Slf4j
public class AuditDivisionListener {

    @PostPersist
    private void onAfterCreate(Division division) {
        updateTopicStatus(division);
    }

    @LoggerAround
    private void updateTopicStatus(Division division) {
        division.getTopic().setStatus(TopicStatus.ASSIGNED);
        ApplicationContextAwareImpl.getBean(TopicRepository.class).save(division.getTopic());
    }
}
