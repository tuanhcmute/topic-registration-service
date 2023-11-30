package com.bosch.topicregistration.api.user;

import com.bosch.topicregistration.api.response.Response;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    Response<UserDTO> getUserProfile();

    Response<Void> updateBiographyInUserProfile(String biography);

    Response<List<StudentDTO>> getStudentsNotEnrolledInTopic();

    Response<List<LectureDTO>> getLecturesByMajor(String majorCode);

    Response<Void> updateAvatarInUserProfile(MultipartFile imageFile);
}
