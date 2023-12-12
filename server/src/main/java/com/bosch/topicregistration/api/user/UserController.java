package com.bosch.topicregistration.api.user;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.PageResponse;
import com.bosch.topicregistration.api.response.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/user")
@Tag(name = "User APIs")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    //    [GET] /api/v1/user/profile
    @GetMapping("/profile")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('ROLE_STUDENT', 'ROLE_LECTURE', 'ROLE_ADMIN', 'ROLE_HEAD', 'ROLE_ANONYMOUS')")
    @LoggerAround
    public Response<UserDTO> getUserProfile() {
        return userService.getUserProfile();
    }

    //    [PUT] /api/v1/user/profile
    @PutMapping(path = "/profile", consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('ROLE_STUDENT', 'ROLE_LECTURE', 'ROLE_ADMIN', 'ROLE_HEAD', 'ROLE_ANONYMOUS')")
    @LoggerAround
    public Response<Void> updateBiographyInUserProfile(@RequestParam MultiValueMap<String, String> paramMap) {
        try {
            String biography = paramMap.get("biography").get(0);
            log.info("biography: {}", biography);
            return userService.updateBiographyInUserProfile(biography);
        } catch (Exception e) {
            log.info("Update biography exception: {}", e.getMessage());
            throw new BadRequestException("User's biography has been updated failed");
        }
    }

    //    [GET] api/v1/user/student
    @GetMapping("/student")
    @LoggerAround
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('ROLE_STUDENT', 'ROLE_LECTURE', 'ROLE_ADMIN', 'ROLE_HEAD')")
    public Response<List<StudentDTO>> getStudentsNotEnrolledInTopic() {
        return userService.getStudentsNotEnrolledInTopic();
    }

    //    [GET] /api/v1/user/lecture
    @GetMapping("/lecture")
    @LoggerAround
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_LECTURE')")
    public Response<List<LectureDTO>> getLecturesByMajor(@RequestParam("majorCode") String majorCode) {
        if (StringUtils.isBlank(majorCode)) throw new BadRequestException("Major code is not valid");
        return userService.getLecturesByMajor(majorCode);
    }

    @PutMapping(path = "/profile/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @LoggerAround
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('ROLE_STUDENT', 'ROLE_LECTURE', 'ROLE_ADMIN', 'ROLE_HEAD', 'ROLE_ANONYMOUS')")
    public  Response<Void> updateAvatarInUserProfile(@RequestParam("image") MultipartFile imageFile) {

        return userService.updateAvatarInUserProfile(imageFile);
    }

    @GetMapping
    @LoggerAround
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public  Response<PageResponse<List<UserDTO>>> getAllUsers(@RequestParam(defaultValue = "0", name = "pageNumber") Integer pageNumber,
                                               @RequestParam(defaultValue = "100", name = "pageSize") Integer pageSize,
                                               @RequestParam(defaultValue = "createdDate", name = "sortBy") String sortBy) {
        return userService.getAllUsers(pageNumber, pageSize, sortBy);
    }
}