package com.bosch.topicregistration.api.user;

public interface UserService {
    UserResponse<UserDTO> getUserProfile();
    UserResponse<UserDTO> updateBiographyInUserProfile(String biography);
}
