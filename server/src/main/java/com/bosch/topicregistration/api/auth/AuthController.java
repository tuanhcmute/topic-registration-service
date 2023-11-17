package com.bosch.topicregistration.api.auth;

import com.bosch.topicregistration.api.response.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth/refresh-token")
@Slf4j
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Response<RefreshTokenDTO> refreshToken(@RequestBody @Valid RefreshTokenRequest request) {
        return authService.refreshToken(request);
    }
}
