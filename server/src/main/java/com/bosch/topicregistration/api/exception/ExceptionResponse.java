package com.bosch.topicregistration.api.exception;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExceptionResponse {
    private Integer statusCode;
    private String message;
}