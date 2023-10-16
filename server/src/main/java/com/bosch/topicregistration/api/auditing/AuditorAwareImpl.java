package com.bosch.topicregistration.api.auditing;

import com.bosch.topicregistration.api.security.jwt.UserPrincipal;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Objects;
import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<UserPrincipal> {
    @Override
    public Optional<UserPrincipal> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (Objects.isNull(authentication) || !authentication.isAuthenticated()) {
            return Optional.empty();
        }

        return Optional.of((UserPrincipal) authentication.getPrincipal());
    }
}
