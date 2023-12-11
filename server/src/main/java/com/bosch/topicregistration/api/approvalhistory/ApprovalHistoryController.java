package com.bosch.topicregistration.api.approvalhistory;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/approval-history")
@Slf4j
@RequiredArgsConstructor
@Tag(name = "Approval history APIs")
public class ApprovalHistoryController {

    private final ApprovalHistoryService approvalHistoryService;

    @GetMapping
    @LoggerAround
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('ROLE_LECTURE')")
    public Response<List<ApprovalHistoryDTO>> getApprovalHistoryByTopicId(@RequestParam("topicId") String topicId,
                                                                          @RequestParam(defaultValue = "0", name = "pageNumber") Integer pageNumber,
                                                                          @RequestParam(defaultValue = "100", name = "pageSize") Integer pageSize,
                                                                          @RequestParam(defaultValue = "createdDate", name = "sortBy") String sortBy) {
        if (StringUtils.isEmpty(topicId)) throw new BadRequestException("Topic id is not valid");
        return approvalHistoryService.getApprovalHistoryByTopicId(topicId, pageNumber, pageSize, sortBy);
    }
}
