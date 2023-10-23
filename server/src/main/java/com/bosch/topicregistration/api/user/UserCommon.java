package com.bosch.topicregistration.api.user;

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

    public Optional<User> getCurrentUserByCurrentAuditor() {
        Optional<UserPrincipal> userPrincipalOptional = auditorAware.getCurrentAuditor();
        if (!userPrincipalOptional.isPresent())
            return Optional.empty();

        UserPrincipal userPrincipal = userPrincipalOptional.get();
        String email = userPrincipal.getUsername();
        log.info("User email: {}", email);
        return userRepository.findByEmail(email);
    }

}
