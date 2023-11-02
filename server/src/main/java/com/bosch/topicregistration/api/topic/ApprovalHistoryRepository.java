package com.bosch.topicregistration.api.topic;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ApprovalHistoryRepository extends JpaRepository<ApprovalHistory, String> {
}
