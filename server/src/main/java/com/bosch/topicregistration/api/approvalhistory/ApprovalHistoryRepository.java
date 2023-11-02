package com.bosch.topicregistration.api.approvalhistory;

import com.bosch.topicregistration.api.response.Response;
import com.bosch.topicregistration.api.topic.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApprovalHistoryRepository extends JpaRepository<ApprovalHistory, String> {
    List<ApprovalHistory> findByTopic(Topic topic);
}
