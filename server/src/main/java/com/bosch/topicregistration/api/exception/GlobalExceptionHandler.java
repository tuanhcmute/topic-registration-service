package com.bosch.topicregistration.api.exception;

import com.bosch.topicregistration.api.response.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler({AuthenticationException.class})
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Response<Void> handleAuthenticationException(Exception ex) {
        log.info(ex.getMessage());
        return Response.<Void>builder()
                .statusCode(HttpStatus.UNAUTHORIZED.value())
                .message(ex.getMessage())
                .build();
    }

    @ExceptionHandler({BadRequestException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<Void> handleBadRequestException(Exception ex) {
        log.info(ex.getMessage());
        return Response.<Void>builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message(ex.getMessage())
                .build();
    }

    @ExceptionHandler({AccessDeniedException.class})
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Response<Void> handleAccessDeniedException(Exception ex) {
        log.info(ex.getMessage());
        return Response.<Void>builder()
                .statusCode(HttpStatus.FORBIDDEN.value())
                .message(ex.getMessage())
                .build();
    }
}
