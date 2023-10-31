package com.bosch.topicregistration.api.user;

import com.bosch.topicregistration.api.response.Response;

import java.util.List;

public interface UserService {
    Response<UserDTO> getUserProfile();

    Response<UserDTO> updateBiographyInUserProfile(String biography);

    Response<List<UserDTO>> getStudentsNotEnrolledInTopic();
}
