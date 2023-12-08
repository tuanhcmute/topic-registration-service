package com.bosch.topicregistration.api.semester;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.bosch.topicregistration.api.response.Response;
import org.springframework.security.access.prepost.PreAuthorize;
import com.bosch.topicregistration.api.logging.LoggerAround;

@Slf4j
@RestController
@RequestMapping("/admin")
@Tag(name = "Admin APIs")
@RequiredArgsConstructor
public class SemesterController {
    private final SemesterService semesterService;

    //    [GET] /api/v1/admin/semesters
    @GetMapping("/semesters")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @LoggerAround
    public Response<List<SemesterDetailDTO>> getListSemester() {
        return semesterService.getListSemester();
    }

    @PostMapping("/semesters")
    @ResponseStatus(HttpStatus.OK)
    // @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @LoggerAround
    public Response<String> createNewSemester(@RequestBody SemesterRequest semesterRequest) {
        System.out.println(semesterRequest.getName());
        return semesterService.createNewSemester(semesterRequest);
    }
}
