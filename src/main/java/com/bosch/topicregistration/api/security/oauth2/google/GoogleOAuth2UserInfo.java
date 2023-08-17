package com.bosch.topicregistration.api.security.oauth2.google;

import com.bosch.topicregistration.api.security.oauth2.OAuth2UserInfo;

import java.util.Map;

public class GoogleOAuth2UserInfo extends OAuth2UserInfo {
    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get(GoogleOAuth2UserInfoAttribute.sub.toString());
    }

    @Override
    public String getName() {
        return (String) attributes.get(GoogleOAuth2UserInfoAttribute.name.toString());
    }

    @Override
    public String getEmail() {
        return (String) attributes.get(GoogleOAuth2UserInfoAttribute.email.toString());
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get(GoogleOAuth2UserInfoAttribute.picture.toString());
    }
}
