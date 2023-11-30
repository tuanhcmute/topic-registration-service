package com.bosch.topicregistration.api.approvalhistory;

import com.bosch.topicregistration.api.response.Response;

import java.util.List;

public interface ApprovalHistoryService {
    Response<List<ApprovalHistoryDTO>> getApprovalHistoryByTopicId(String topicId, Integer pageNumber, Integer pageSize, String sortBy);
}
