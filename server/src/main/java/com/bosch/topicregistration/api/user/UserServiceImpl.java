package com.bosch.topicregistration.api.user;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.Response;
import com.bosch.topicregistration.api.topicenrollment.TopicEnrollmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;
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
}
