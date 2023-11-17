package com.bosch.topicregistration.api.security.jwt;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class JwtServiceImpl implements JwtService {

    @Value("${app.jwt.secretKey}")
    private String secretKey;

    @Override
    public String createToken(String subject) {
        // Calculate the expiration time in milliseconds for 5 minutes
        long expirationTimeMillis = System.currentTimeMillis() + (5 * 60 * 1000); // 5 minutes in milliseconds
        // Create a Date object representing the calculated expiration time
        Date expiryDate = new Date(expirationTimeMillis);
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    @Override
    public String createRefreshToken(String subject) {
        // Calculate the expiration time in milliseconds for 5 minutes
        long expirationTimeMillis = System.currentTimeMillis() + (60 * 60 * 1000); // 5 minutes in milliseconds
        // Create a Date object representing the calculated expiration time
        Date expiryDate = new Date(expirationTimeMillis);
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    @Override
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    @Override
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            log.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
        }
        return false;
    }
}
