package com.bosch.topicregistration.api.division;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.PageResponse;
import com.bosch.topicregistration.api.response.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/division")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Division APIs")
public class DivisionController {

    private final DivisionService divisionService;

    @GetMapping
    @LoggerAround
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_LECTURE')")
    public Response<PageResponse<List<DivisionDTO>>> getDivisionByTopicType(@RequestParam("topicType") String topicType,
                                                                            @RequestParam(defaultValue = "0", name = "pageNumber") Integer pageNumber,
                                                                            @RequestParam(defaultValue = "100", name = "pageSize") Integer pageSize,
                                                                            @RequestParam(defaultValue = "createdDate", name = "sortBy") String sortBy
                                                                            ) {
//        Validate
        if (StringUtils.isBlank(topicType)) throw new BadRequestException("Topic type is not valid");
        log.info("Topic type is not blank");
//        Call service
        return divisionService.getDivisionByTopicType(topicType, pageNumber, pageSize, sortBy);
    }

    @PostMapping
    @LoggerAround
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_HEAD')")
    public Response<Void> createDivisionByTopicType(@RequestParam("topicType") String topicType, @RequestBody @Valid CreateDivisionRequest request) {
//        Validate topicType
        if (StringUtils.isBlank(topicType)) throw new BadRequestException("Topic type is not valid");
        log.info("Topic type is not blank");
//        Call service
        return divisionService.createDivisionByTopicType(topicType, request);
    }
}
