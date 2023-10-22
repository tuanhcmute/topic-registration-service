package com.bosch.topicregistration.api.user;

import com.bosch.topicregistration.api.response.Response;

public interface UserService {
    Response<UserDTO> getUserProfile();
}
