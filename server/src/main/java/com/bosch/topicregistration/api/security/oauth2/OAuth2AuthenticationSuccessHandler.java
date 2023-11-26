package com.bosch.topicregistration.api.security.oauth2;

import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.security.CookieUtils;
import com.bosch.topicregistration.api.security.HttpCookieOAuth2AuthorizationRequestRepositoryImpl;
import com.bosch.topicregistration.api.security.jwt.JwtService;
import com.bosch.topicregistration.api.security.jwt.UserPrincipal;
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


@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final HttpCookieOAuth2AuthorizationRequestRepositoryImpl httpCookieOAuth2AuthorizationRequestRepository;
    private final JwtService jwtService;

    @Override
    @LoggerAround
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        String targetUrl = determineTargetUrl(request, response, authentication);
        log.info("Target url: {}", targetUrl);
        if (response.isCommitted()) {
            log.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }
        clearAuthenticationAttributes(request, response);
        response.sendRedirect(targetUrl);
    }

    @LoggerAround
    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String targetUrl = CookieUtils.getCookie(request, HttpCookieOAuth2AuthorizationRequestRepositoryImpl.REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue).orElse(getDefaultTargetUrl());
        log.info("Target url: {}", targetUrl);
        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();
        final String token = jwtService.createToken(user.getUsername());
        final String refreshToken = jwtService.createRefreshToken(user.getId());
        log.info("Token: {}", token);
        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam(TokenType.ACCESS_TOKEN.getValue(), token)
                .queryParam(TokenType.REFRESH_TOKEN.getValue(), refreshToken)
                .build().toUriString();
    }

    @LoggerAround
    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }
}
