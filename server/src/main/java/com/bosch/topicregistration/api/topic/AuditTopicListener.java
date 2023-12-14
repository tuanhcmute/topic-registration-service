package com.bosch.topicregistration.api.topic;

import com.bosch.topicregistration.api.approvalhistory.ApprovalHistory;
import com.bosch.topicregistration.api.approvalhistory.ApprovalHistoryRepository;
import com.bosch.topicregistration.api.auditing.ApplicationContextAwareImpl;
import com.bosch.topicregistration.api.logging.LoggerAround;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.PostPersist;
import javax.persistence.PostUpdate;

@Slf4j
public class AuditTopicListener {

    @PostPersist
    @LoggerAround
    private void onAfterCreate(Topic topic) {
//        createApprovalHistory(topic);
    }

    @PostUpdate
    @LoggerAround
    private void onAfterUpdate(Topic topic) {
        createApprovalHistory(topic);
    }

    @LoggerAround
    private void createApprovalHistory(Topic topic) {
        String reason = "";
        switch (topic.getStatus()) {
            case PENDING:
                reason = "Đang chờ duyệt";
                break;
            case UPDATED:
                reason = "Đã cập nhật";
                break;
            case APPROVED:
                reason = "Đã được duyệt";
                break;
            case REJECTED:
                reason = "Chưa được duyệt";
                break;
            case ASSIGNED:
                reason = "Đã được phân công";
                break;
        }
        //        Store approval history
        ApprovalHistory approvalHistory = ApprovalHistory.builder()
                .status(topic.getStatus())
                .reason(reason)
                .topic(topic)
                .build();
        ApplicationContextAwareImpl.getBean(ApprovalHistoryRepository.class).save(approvalHistory);

    }
}
