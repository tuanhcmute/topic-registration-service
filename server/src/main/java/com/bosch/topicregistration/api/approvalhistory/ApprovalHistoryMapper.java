package com.bosch.topicregistration.api.approvalhistory;

import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ApprovalHistoryMapper {
    ApprovalHistoryDTO toDTO(ApprovalHistory approvalHistory);
    List<ApprovalHistoryDTO> toListDTO(List<ApprovalHistory> approvalHistories);
}
