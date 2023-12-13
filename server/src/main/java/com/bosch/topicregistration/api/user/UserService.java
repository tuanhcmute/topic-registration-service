package com.bosch.topicregistration.api.user;

import com.bosch.topicregistration.api.response.PageResponse;
import com.bosch.topicregistration.api.response.Response;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    Response<UserDTO> getUserProfile();

    Response<Void> updateBiographyInUserProfile(String biography);

    Response<List<StudentDTO>> getStudentsNotEnrolledInTopic();

    Response<List<LectureDTO>> getAllLectures();

    Response<Void> updateAvatarInUserProfile(MultipartFile imageFile);

    Response<PageResponse<List<UserDTO>>> getAllUsers(Integer pageNumber, Integer pageSize, String sortBy);
}
