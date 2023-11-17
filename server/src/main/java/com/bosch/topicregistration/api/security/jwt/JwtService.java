package com.bosch.topicregistration.api.security.jwt;

import org.springframework.security.core.Authentication;

public interface JwtService {
    String createToken(String subject);
    String createRefreshToken(String subject);

    String getUsernameFromToken(String token);

    boolean validateToken(String token);
}
