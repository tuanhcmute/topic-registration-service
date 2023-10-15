package com.bosch.topicregistration.api.user;

import com.bosch.topicregistration.api.response.Reponse;

public interface UserService {
    public Reponse getUserProfile(String email);
}
