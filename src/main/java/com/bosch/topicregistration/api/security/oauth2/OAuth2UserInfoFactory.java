package com.bosch.topicregistration.api.security.oauth2;

import com.bosch.topicregistration.api.exception.OAuth2AuthenticationProcessingException;
import com.bosch.topicregistration.api.security.AuthProvider;
import com.bosch.topicregistration.api.security.oauth2.google.GoogleOAuth2UserInfo;

import java.util.Map;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if(registrationId.equalsIgnoreCase(AuthProvider.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}
