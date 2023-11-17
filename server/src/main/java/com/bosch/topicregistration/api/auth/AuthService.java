package com.bosch.topicregistration.api.auth;

import com.bosch.topicregistration.api.response.Response;

public interface AuthService {
    Response<RefreshTokenDTO> refreshToken(RefreshTokenRequest request);
}
