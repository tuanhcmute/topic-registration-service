package com.bosch.topicregistration.api.enrollmentperiod;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Set;


@Slf4j
@RestController
@Tag(name = "Enrollment period APIs")
@RequiredArgsConstructor
@RequestMapping("/enrollment-period")
public class EnrollmentPeriodController {
    private final EnrollmentPeriodService enrollmentPeriodService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('ROLE_STUDENT', 'ROLE_LECTURE')")
    @LoggerAround
    public Response<EnrollmentPeriodDTO> getActivatedEnrollmentPeriod(@RequestParam("type") String type) {
        if (type.isEmpty())
            throw new BadRequestException("Type parameter is empty");
        return enrollmentPeriodService.getActivatedEnrollmentPeriod(type);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @LoggerAround
    public Response<Set<EnrollmentPeriodDTO>> getListEnrollmentPeriodBySemester(@RequestParam("semesterId") String semesterId) {
        if(semesterId.isEmpty())
            throw new BadRequestException("Semester id is empty");

        return enrollmentPeriodService.getListEnrollmentPeriodBySemester(semesterId);
    }
}