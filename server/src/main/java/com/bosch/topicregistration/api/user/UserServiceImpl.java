package com.bosch.topicregistration.api.user;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.firebase.FirebaseService;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.PageResponse;
import com.bosch.topicregistration.api.response.Response;
import com.bosch.topicregistration.api.topicenrollment.TopicEnrollmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserMapper userMapper;
    private final UserCommon userCommon;
    private final UserRepository userRepository;
    private final TopicEnrollmentRepository topicEnrollmentRepository;
    private final MajorRepository majorRepository;
    private final FirebaseService firebaseService;

    @Override
    @LoggerAround
    public Response<UserDTO> getUserProfile() {
        User user = userCommon.getCurrentUserByCurrentAuditor();
        log.info("userId: {}", user.getId());
        Map<String, UserDTO> data = new HashMap<>();
        data.put("profile", userMapper.toDTO(user));
        return Response.<UserDTO>builder()
                .message("User's profile has been successfully retrieved")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }

    @Override
    @LoggerAround
    public Response<Void> updateBiographyInUserProfile(String biography) {
        if (biography.isEmpty()) throw new BadRequestException("Biography is not valid");
        User user = userCommon.getCurrentUserByCurrentAuditor();
        user.setBiography(biography);
        userRepository.save(user);
        return Response.<Void>builder()
                .message("User's biography has been updated successfully")
                .statusCode(HttpStatus.OK.value())
                .build();
    }

    @Override
    public Response<List<StudentDTO>> getStudentsNotEnrolledInTopic() {
//        Get students from list of users
        List<User> users = userRepository.findAll();
        log.info("Size of users: {}", users.size());
        List<User> students = users.stream().filter(
                        user -> user.getUserRoles().stream().anyMatch(
                                userRole -> userRole.getRole().getCode().equals(RoleCode.ROLE_STUDENT)))
                .collect(Collectors.toList());
        log.info("Size of students: {}", students.size());

//        Filter students are not enrolled (NOT performance)
        List<User> filterStudents = students.stream()
                .filter(student -> !topicEnrollmentRepository.existsByStudent(student))
                .collect(Collectors.toList());
        log.info("Size of filter students: {}", filterStudents.size());

        List<StudentDTO> userDTOList = userMapper.toListStudentDTO(filterStudents);
        Map<String, List<StudentDTO>> data = new HashMap<>();
        data.put("students", userDTOList);
        return Response.<List<StudentDTO>>builder()
                .message("The list of students has been successfully retrieved")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }

    @Override
    @LoggerAround
    public Response<List<LectureDTO>> getLecturesByMajor(String majorCode) {
//        Validate major code
        if (StringUtils.isBlank(majorCode)) throw new BadRequestException("Major code is not valid");
        Optional<Major> majorOptional = majorRepository.findByCode(majorCode);
        if (!majorOptional.isPresent()) throw new BadRequestException("Major could not be found");
        Major major = majorOptional.get();
//        Get lectures
        List<User> users = userRepository.findByMajor(major);
//        Filter lectures
        List<User> filterLectures = new ArrayList<>();
        for(User user : users) {
            boolean isLecture = false;
            for(UserRole userRole : user.getUserRoles()) {
                if(userRole.getRole().getCode().equals(RoleCode.ROLE_LECTURE)) {
                    isLecture = true;
                    break;
                }
            }
            if(isLecture) filterLectures.add(user);
        }
//        Mapper to DTO
        List<LectureDTO> lectures = userMapper.toListLectureDTO(filterLectures);
//        Build data
        Map<String, List<LectureDTO>> data = new HashMap<>();
        data.put("lectures", lectures);
//        Build response
        return Response.<List<LectureDTO>>builder()
                .message("The list of lectures has been successfully retrieved")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }

    @Override
    @LoggerAround
    public Response<Void> updateAvatarInUserProfile(MultipartFile imageFile) {
        try {
//            Validate image file
            if(Objects.isNull(imageFile.getContentType()) || !imageFile.getContentType().startsWith("image/"))
                throw new BadRequestException("File is not valid");

//            get user
            User user = userCommon.getCurrentUserByCurrentAuditor();

            // Get filename from image url
            String filename = "";
            String pattern = "/([^/]+)\\?alt=media$";
            Pattern regex = Pattern.compile(pattern);
            Matcher matcher = regex.matcher(user.getImageUrl());
            if (matcher.find()) {
                filename = matcher.group(1);
                // Delete old image if exist
                if(firebaseService.isFileExist(filename)) {
                    firebaseService.delete(filename);
                }
            }

            // Save new image
            String imageUrl = firebaseService.save(imageFile);
            log.info("Image url: {}", imageUrl);
            user.setImageUrl(imageUrl);
            userRepository.save(user);

            return Response.<Void>builder()
                    .statusCode(HttpStatus.OK.value())
                    .message("User's avatar has been updated successfully")
                    .build();

        } catch (IOException e) {
            log.error(e.getMessage());
            throw new BadRequestException(e.getMessage());
        }
    }

    @Override
    public Response<PageResponse<List<UserDTO>>> getAllUsers(Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
        Page<User> userPage = userRepository.findAll(paging);
        List<UserDTO> listUserDTO = userMapper.toListDTO(userPage.getContent());
        PageResponse<List<UserDTO>> pageData = PageResponse.<List<UserDTO>>builder()
                .totalPages(userPage.getTotalPages())
                .totalElements(userPage.getTotalElements())
                .content(listUserDTO)
                .build();
        Map<String, PageResponse<List<UserDTO>>> data = new HashMap<>();
        data.put("pageData", pageData);
        return Response.<PageResponse<List<UserDTO>>>builder()
                .message("Users have been successfully retrieved")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }
}
