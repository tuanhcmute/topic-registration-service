package com.bosch.topicregistration.api.user;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.Response;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserMapper userMapper;
    private final UserCommon userCommon;
    private final UserRepository userRepository;

    @Override
    @LoggerAround
    public Response<UserDTO> getUserProfile() {
        Optional<User> userOptional = userCommon.getCurrentUserByCurrentAuditor();
        if (!userOptional.isPresent())
            return Response.<UserDTO>builder()
                    .message("User could not be found")
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .build();

        User user = userOptional.get();
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
    public Response<UserDTO> updateBiographyInUserProfile(String biography) {
        if(biography.isEmpty()) {
             return Response.<UserDTO>builder()
                .message("User's biography has been updated unsuccessfully - Value is empty")
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .build();
        } 
       
        Optional<User> userOptional = userCommon.getCurrentUserByCurrentAuditor();
        if(!userOptional.isPresent()) 
            throw new BadRequestException("User not found");
            
        userOptional.get().setBiography(biography);
        userRepository.save(userOptional.get());
        return Response.<UserDTO>builder()
                .message("User's biography has been updated successfully")
                .statusCode(HttpStatus.OK.value())
                .build();
    }
}
