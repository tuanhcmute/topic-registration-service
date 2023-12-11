package com.bosch.topicregistration.api.semester;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/semester")
@Tag(name = "Semester APIs")
@RequiredArgsConstructor
public class SemesterController {

    private final SemesterService semesterService;

    //    [GET] /api/v1/semester
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @LoggerAround
    public Response<List<SemesterDTO>> getListSemester() {
        return semesterService.getListSemester();
    }

    //    [POST] /api/v1/semester
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @LoggerAround
    public Response<Void> createSemester(@RequestBody SemesterRequest semesterRequest) {
        return semesterService.createSemester(semesterRequest);
    }

    //    [PUT] /api/v1/semester
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @LoggerAround
    public Response<Void> modifySemester(@PathVariable("id") String id, @RequestBody SemesterRequest semesterRequest) {
        if(id.isEmpty()) 
            throw new BadRequestException("Semester id is empty");
        return semesterService.modifySemester(id, semesterRequest);
    }
}
