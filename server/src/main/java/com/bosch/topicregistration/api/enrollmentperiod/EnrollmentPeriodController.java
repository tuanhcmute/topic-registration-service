package com.bosch.topicregistration.api.enrollmentperiod;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.Response;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@Tag(name = "EnrollmentPeriod APIs")
@RequiredArgsConstructor
public class EnrollmentPeriodController {
    private final EnrollmentPeriodService enrollmentPeriodService;

    @GetMapping("/enrollment-period")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_STUDENT') or hasAuthority('ROLE_ADMIN')")
    @LoggerAround
    public Response<EnrollmentPeriodDTO> getEnrollmentPeriod(@RequestParam("type") String type,
            @RequestParam("period") String period) {
        if (type.isEmpty())
            throw new BadRequestException("Type parameter is empty");
        if (period.isEmpty())
            throw new BadRequestException("Period parameter is empty");
        return enrollmentPeriodService.getEnrollmentPeriod(type, period);
    }
}