package com.bosch.topicregistration.api.security;


import lombok.extern.slf4j.Slf4j;
import org.springframework.util.SerializationUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Base64;
import java.util.Objects;
import java.util.Optional;

@Slf4j
public class CookieUtils {

    public static Optional<Cookie> getCookie(HttpServletRequest request, String name) {
        log.info("Get cookie with name: {}", name);
        Cookie[] cookies = request.getCookies();
        if (Objects.isNull(cookies)) return Optional.empty();
        return Arrays.stream(cookies).filter(cookie -> cookie.getName().equals(name)).findFirst();
    }

    public static void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
        log.info("Add cookie (name: {}, value: {})", name, value);
        Cookie cookie = new Cookie(name, value);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
    }

    public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
        log.info("Delete cookies {}", name);
        Cookie[] cookies = request.getCookies();
        if (Objects.nonNull(cookies)) {
            Arrays.stream(cookies).filter(cookie -> cookie.getName().equals(name)).forEach(cookie -> {
                cookie.setValue("");
                cookie.setPath("/");
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            });
        }
    }

    public static String serialize(Object object) {
        return Base64.getUrlEncoder().encodeToString(SerializationUtils.serialize(object));
    }

    public static <T> T deserialize(Cookie cookie, Class<T> cls) {
        return cls.cast(SerializationUtils.deserialize(Base64.getUrlDecoder().decode(cookie.getValue())));
    }

}