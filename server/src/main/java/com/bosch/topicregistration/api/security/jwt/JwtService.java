package com.bosch.topicregistration.api.security.jwt;

public interface JwtService {
    String createToken(String subject);

    String createRefreshToken(String subject);

    String getUsernameFromToken(String token);

    boolean validateToken(String token);
}
