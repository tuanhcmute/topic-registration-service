package com.bosch.topicregistration.api.user;

import com.bosch.topicregistration.api.response.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@Tag(name = "User APIs")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('ROLE_ANONYMOUS') or hasAuthority('ROLE_STUDENT') or hasAuthority('ROLE_LECTURE') or hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_HEAD')")
    public Response<UserDTO> getUserProfile() {
        return userService.getUserProfile();
    }
}
