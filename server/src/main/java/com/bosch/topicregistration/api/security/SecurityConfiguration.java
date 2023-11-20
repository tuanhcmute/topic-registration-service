package com.bosch.topicregistration.api.security;

import com.bosch.topicregistration.api.security.jwt.TokenAuthenticationFilter;
import com.bosch.topicregistration.api.security.oauth2.CustomOAuth2UserService;
import com.bosch.topicregistration.api.security.oauth2.OAuth2AuthenticationFailureHandler;
import com.bosch.topicregistration.api.security.oauth2.OAuth2AuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class SecurityConfiguration {
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
    private final AuthorizationRequestRepository<OAuth2AuthorizationRequest> authorizationRequestRepository;
    private final TokenAuthenticationFilter tokenAuthenticationFilter;

    @Value("${app.security.permitAll.antPattern}")
    private String[] antPatterns;

    @Bean
    public CustomAccessDeniedHandler customAccessDeniedHandler() {
        return new CustomAccessDeniedHandler();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.formLogin().and().httpBasic().disable();
        http.authorizeRequests().antMatchers(antPatterns).permitAll();
        http.authorizeRequests().anyRequest().authenticated();
        http.oauth2Login().authorizationEndpoint().baseUri("/oauth2/authorization").authorizationRequestRepository(authorizationRequestRepository);
        http.oauth2Login().userInfoEndpoint().userService(customOAuth2UserService);
        http.oauth2Login().successHandler(oAuth2AuthenticationSuccessHandler);
        http.oauth2Login().failureHandler(oAuth2AuthenticationFailureHandler);
        http.exceptionHandling().authenticationEntryPoint(customAuthenticationEntryPoint);
        http.exceptionHandling().accessDeniedHandler(customAccessDeniedHandler());
        http.addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
