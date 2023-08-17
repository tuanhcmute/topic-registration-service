package com.bosch.topicregistration.api.security;

import com.bosch.topicregistration.api.security.oauth2.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;

    @Bean
    public CustomAuthenticationEntryPoint customAuthenticationEntryPoint() {
        return new CustomAuthenticationEntryPoint();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.formLogin().and().httpBasic().disable();
        http.authorizeRequests().antMatchers("/v3/api-docs/**", "/swagger-ui/**", "/healthcheck/status", "/oauth2/**").permitAll();
        http.authorizeRequests().anyRequest().authenticated();
        http.oauth2Login().authorizationEndpoint().baseUri("/oauth2/authorize")
                .and().redirectionEndpoint().baseUri("/oauth2/callback/*")
                .and().userInfoEndpoint().userService(customOAuth2UserService);
        http.exceptionHandling().authenticationEntryPoint(customAuthenticationEntryPoint());
        return http.build();
    }

    @Bean
    public DefaultOAuth2UserService  defaultOAuth2UserService() {
        return new DefaultOAuth2UserService();
    }
}
