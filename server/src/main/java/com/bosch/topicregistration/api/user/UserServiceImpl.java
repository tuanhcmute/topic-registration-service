package com.bosch.topicregistration.api.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.bosch.topicregistration.api.major.MajorMapper;
import com.bosch.topicregistration.api.response.Reponse;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public Reponse getUserProfile(String email) {
        Map<Object, Object> userProfile = new HashMap<>();
        UserDto userDto = new UserDto();
        Reponse reponse = new Reponse();  
        try {
            Optional<User> user = userRepository.findByEmail(email);
            userDto = UserMapper.toUserDto(user.get(), MajorMapper.toMajorDto(user.get().getMajor()));
            userProfile.put("profile", userDto);

            reponse.setMessage("User's profile has been successfully retrieved");
            reponse.setStatus(200);
            reponse.setData(userProfile);
        } catch (Exception e) {
            reponse.setMessage("Major is empty");
            reponse.setStatus(500);
        }
        return reponse;
    }
}
