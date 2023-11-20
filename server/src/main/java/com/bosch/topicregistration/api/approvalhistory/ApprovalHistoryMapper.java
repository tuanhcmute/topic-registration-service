package com.bosch.topicregistration.api.approvalhistory;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ApprovalHistoryMapper {
    @Mappings({
            @Mapping(target = "createdDate", source = "approvalHistory.createdDate", dateFormat = "dd-MM-yyyy HH:mm:ss"),
            @Mapping(target = "updatedDate", source = "approvalHistory.updatedDate", dateFormat = "dd-MM-yyyy HH:mm:ss")
    })
    ApprovalHistoryDTO toDTO(ApprovalHistory approvalHistory);

    List<ApprovalHistoryDTO> toListDTO(List<ApprovalHistory> approvalHistories);
}
