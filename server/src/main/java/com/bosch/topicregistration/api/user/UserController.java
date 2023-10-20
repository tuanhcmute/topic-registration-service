package com.bosch.topicregistration.api.user;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.bosch.topicregistration.api.exception.BadRequestException;

@Slf4j
@RestController
@RequestMapping("/user")
@Tag(name = "User APIs")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_STUDENT') or hasAuthority('ROLE_LECTURE') or hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_HEAD')")
    public UserResponse<UserDTO> getUserProfile() {
        return userService.getUserProfile();
    }

    @PutMapping(path = "/profile", consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    @ResponseStatus(HttpStatus.OK)
    // @PreAuthorize("hasAuthority('ROLE_STUDENT') or hasAuthority('ROLE_LECTURE') or hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_HEAD')")
    public UserResponse<UserDTO> updateBiographyInUserProfile( @RequestParam MultiValueMap<String,String> paramMap) {
        try {
            String biography = paramMap.get("biography").get(0);
            return userService.updateBiographyInUserProfile(biography);
        } catch (Exception e) {
            log.info("Update biography exception: {}", e.getMessage());
            throw new BadRequestException("User's biography has been updated failed");
        }
    }
}