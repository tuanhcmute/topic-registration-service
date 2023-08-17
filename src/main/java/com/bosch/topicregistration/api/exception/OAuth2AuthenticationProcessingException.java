package com.bosch.topicregistration.api.exception;

import org.springframework.security.core.AuthenticationException;

public class OAuth2AuthenticationProcessingException extends AuthenticationException {
    public OAuth2AuthenticationProcessingException(String message) {
        super(message);
    }
    public OAuth2AuthenticationProcessingException(String msg, Throwable t) {
        super(msg, t);
    }
}
