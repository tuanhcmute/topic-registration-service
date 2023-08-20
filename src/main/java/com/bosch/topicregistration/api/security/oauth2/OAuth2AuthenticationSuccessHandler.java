package com.bosch.topicregistration.api.security.oauth2;

import com.bosch.topicregistration.api.security.CookieUtils;
import com.bosch.topicregistration.api.security.HttpCookieOAuth2AuthorizationRequestRepositoryImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;


@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final HttpCookieOAuth2AuthorizationRequestRepositoryImpl httpCookieOAuth2AuthorizationRequestRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        log.info("On authentication success");
        String targetUrl = determineTargetUrl(request, response, authentication);
        log.info("Target url: {}", targetUrl);
        if (response.isCommitted()) {
            log.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }
        clearAuthenticationAttributes(request, response);
        response.sendRedirect(targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        log.info("Determine target url");
        String targetUrl = CookieUtils.getCookie(request, HttpCookieOAuth2AuthorizationRequestRepositoryImpl.REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue).orElse(getDefaultTargetUrl());
        log.info("Target url: {}", targetUrl);
        String accessToken = UUID.randomUUID().toString();
        log.info("Access token: {}", accessToken);
        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("access_token", accessToken)
                .build().toUriString();
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        log.info("Clear authentication attributes");
        super.clearAuthenticationAttributes(request);
        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }
}
