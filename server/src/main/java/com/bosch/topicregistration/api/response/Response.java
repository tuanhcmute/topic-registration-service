package com.bosch.topicregistration.api.response;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Response<T> {
    private String message;
    private Integer statusCode;
    private Map<String, T> data;
}

