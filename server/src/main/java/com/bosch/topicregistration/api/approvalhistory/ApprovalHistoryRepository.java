package com.bosch.topicregistration.api.approvalhistory;

import com.bosch.topicregistration.api.topic.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApprovalHistoryRepository extends JpaRepository<ApprovalHistory, String> {
    Page<ApprovalHistory> findByTopic(Topic topic, Pageable pageable);
}
