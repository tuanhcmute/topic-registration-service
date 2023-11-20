package com.bosch.topicregistration.api.security.oauth2;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum TokenType {
    ACCESS_TOKEN("accessToken"),
    REFRESH_TOKEN("refreshToken");
    private String value;
}
