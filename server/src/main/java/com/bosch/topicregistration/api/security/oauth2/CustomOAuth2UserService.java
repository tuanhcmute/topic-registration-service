package com.bosch.topicregistration.api.security.oauth2;

import com.bosch.topicregistration.api.exception.OAuth2AuthenticationProcessingException;
import com.bosch.topicregistration.api.security.jwt.UserPrincipal;
import com.bosch.topicregistration.api.user.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private static final String POSTFIX_STUDENT_EMAIL = "@student.hcmute.edu.vn";
    private static final String POSTFIX_LECTURE_EMAIL = "@hcmute.edu.vn";
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        try {
            return processOAuth2User(userRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(userRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if (StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }
        String email = oAuth2UserInfo.getEmail();
        log.info("Process OAuth2 User: {}", email);
        Optional<User> userOptional = userRepository.findByEmail(email);
        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
            if (!user.getProvider().equals(OAuth2Provider.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase()))) {
                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
            log.info("User {} exist", user.getEmail());
            if (StringUtils.isEmpty(user.getImageUrl())) {
                updateUserInfo(oAuth2UserInfo, user);
            }
        } else {
            user = registerNewUser(userRequest, oAuth2UserInfo);
        }
        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest userRequest, OAuth2UserInfo oAuth2UserInfo) {
        Boolean emailVerified = (Boolean) oAuth2UserInfo.getAttributes().get("email_verified");

        User user = User.builder()
                .name(oAuth2UserInfo.getName())
                .email(oAuth2UserInfo.getEmail())
                .imageUrl(oAuth2UserInfo.getImageUrl())
                .provider(OAuth2Provider.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase()))
                .providerId(oAuth2UserInfo.getId())
                .createdBy(UUID.randomUUID().toString())
                .emailVerified(emailVerified)
                .build();
//        Set user role
        UserRole userRole = UserRole.builder().user(user).build();
        Optional<Role> roleOptional;
        String ntid = oAuth2UserInfo.getId();
        if (oAuth2UserInfo.getEmail().contains(POSTFIX_STUDENT_EMAIL)) {
            roleOptional = roleRepository.findByCode(RoleCode.ROLE_STUDENT);
            // ntid: 20110345
            ntid = oAuth2UserInfo.getEmail().substring(0, 9);
        } else if (oAuth2UserInfo.getEmail().contains(POSTFIX_LECTURE_EMAIL)) {
            roleOptional = roleRepository.findByCode(RoleCode.ROLE_LECTURE);
            ntid = oAuth2UserInfo.getId().substring(0, 4);
        } else {
            roleOptional = roleRepository.findByCode(RoleCode.ROLE_ANONYMOUS);
        }
        roleOptional.ifPresent(userRole::setRole);
        user.setNtid(ntid);
        user.setPassword(user.getNtid());
        user.getUserRoles().add(userRole);
        userRoleRepository.save(userRole);
        log.info("User role saved: {}", userRole.getId());
        log.info("Register new user: {}", user.getEmail());
        return user;
    }

    private void updateUserInfo(OAuth2UserInfo oAuth2UserInfo, User userInDB) {
        userInDB.setImageUrl(oAuth2UserInfo.getImageUrl());
        userInDB.setProviderId(oAuth2UserInfo.getId());
        userRepository.save(userInDB);
    }
}
