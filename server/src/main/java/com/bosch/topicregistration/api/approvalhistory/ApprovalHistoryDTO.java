package com.bosch.topicregistration.api.approvalhistory;

import com.bosch.topicregistration.api.topic.TopicStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApprovalHistoryDTO {
    private String reason;

    private TopicStatus status;

    private String createdDate;

    private String updatedDate;
}
