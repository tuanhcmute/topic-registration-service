package com.bosch.topicregistration.api.auth;

import lombok.*;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RefreshTokenRequest {
    @NotEmpty(message = "Refresh token is not valid")
    private String refreshToken;

    @NotEmpty(message = "Access token is not valid")
    private String accessToken;
}
