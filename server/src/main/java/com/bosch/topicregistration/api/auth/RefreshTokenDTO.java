package com.bosch.topicregistration.api.auth;


import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RefreshTokenDTO {
    private String refreshToken;
    private String accessToken;
}
