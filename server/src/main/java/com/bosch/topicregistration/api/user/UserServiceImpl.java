package com.bosch.topicregistration.api.user;

import com.bosch.topicregistration.api.security.jwt.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.AuditorAware;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final AuditorAware<UserPrincipal> auditorAware;

    public UserResponse<UserDTO> getUserProfile() {
        Optional<UserPrincipal> userPrincipalOptional = auditorAware.getCurrentAuditor();
        if (!userPrincipalOptional.isPresent())
            return UserResponse.<UserDTO>builder()
                    .message("Email could not be found")
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .build();

        UserPrincipal userPrincipal = userPrincipalOptional.get();
        String email = userPrincipal.getUsername();
        log.info("Get profile of email: {}", email);
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (!userOptional.isPresent())
            return UserResponse.<UserDTO>builder()
                    .message("User could not be found")
                    .statusCode(HttpStatus.BAD_REQUEST.value())
                    .build();

        User user = userOptional.get();
        log.info("userId: {}", user.getId());
        Map<String, UserDTO> data = new HashMap<>();
        data.put("profile", userMapper.toDTO(user));
        return UserResponse.<UserDTO>builder()
                .message("User's profile has been successfully retrieved")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }
}
