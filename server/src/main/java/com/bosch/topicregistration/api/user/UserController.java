package com.bosch.topicregistration.api.user;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bosch.topicregistration.api.response.Reponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user/profile")
@Tag(name = "User API")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public Reponse getUserProfile(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        Reponse reponse = new Reponse();
        reponse = userService.getUserProfile(principal.getName());
        return reponse;
    }
}
