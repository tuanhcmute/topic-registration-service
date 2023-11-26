package com.bosch.topicregistration.api.user;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.security.jwt.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class UserCommon {

    private final AuditorAware<UserPrincipal> auditorAware;
    private final UserRepository userRepository;

    public User getCurrentUserByCurrentAuditor() {
        Optional<UserPrincipal> userPrincipalOptional = auditorAware.getCurrentAuditor();
        if (!userPrincipalOptional.isPresent()) throw new BadRequestException("User principal could not be found");

        UserPrincipal userPrincipal = userPrincipalOptional.get();
        String email = userPrincipal.getUsername();
        log.info("User email: {}", email);
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (!userOptional.isPresent()) throw new BadRequestException("User could not be found");
        return userOptional.get();
    }

}
