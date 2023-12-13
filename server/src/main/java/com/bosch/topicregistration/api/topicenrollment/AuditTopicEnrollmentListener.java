package com.bosch.topicregistration.api.topicenrollment;

import com.bosch.topicregistration.api.auditing.ApplicationContextAwareImpl;
import com.bosch.topicregistration.api.topic.TopicRepository;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.PostPersist;
import javax.persistence.PreRemove;

@Slf4j
public class AuditTopicEnrollmentListener {

//    @PrePersist
//    private void

    @PostPersist
    private void updateTopicAfterCreateTopicEnrollment(TopicEnrollment topicEnrollment) {
//        Update field
        int currentAvailable = topicEnrollment.getTopic().getAvailableSlot() - 1;
        topicEnrollment.getTopic().setAvailableSlot(currentAvailable);

//        Get bean and update topic
        TopicRepository topicRepository = ApplicationContextAwareImpl.getBean(TopicRepository.class);
        topicRepository.save(topicEnrollment.getTopic());
    }

    @PreRemove
    private void updateTopicAfterRemoveTopicEnrollment(TopicEnrollment topicEnrollment) {
//        Update field
        int currentAvailable = topicEnrollment.getTopic().getAvailableSlot() + 1;
        topicEnrollment.getTopic().setAvailableSlot(currentAvailable);

        //        Get bean and update topic
        TopicRepository topicRepository = ApplicationContextAwareImpl.getBean(TopicRepository.class);
        topicRepository.save(topicEnrollment.getTopic());
    }
}
