package com.bosch.topicregistration.api.division;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/division")
@RequiredArgsConstructor
@Slf4j
public class DivisionController {

    private final DivisionService divisionService;

    @GetMapping
    @LoggerAround
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_LECTTURE')")
    public Response<List<DivisionDTO>> getDivisionByTopicType(@RequestParam("topicType") String topicType) {
//        Validate
        if(StringUtils.isNotBlank(topicType)) throw new BadRequestException("Topic type is not valid");
        log.info("Topic type is not blank");
//        Call service
        return divisionService.getDivisionByTopicType(topicType);
    }

    @PostMapping
    @LoggerAround
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_HEAD')")
    public Response<Void> createDivisionByTopicType(@RequestParam("topicType") String topicType, @RequestBody CreateDivisionRequest request) {
//        Validate topicType
        if(StringUtils.isNotBlank(topicType)) throw new BadRequestException("Topic type is not valid");
        log.info("Topic type is not blank");
//        Validate request body
//        Call service
        return divisionService.createDivisionByTopicType(topicType, request);
    }
}
