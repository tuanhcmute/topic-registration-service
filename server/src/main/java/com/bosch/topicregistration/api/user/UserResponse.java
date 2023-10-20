package com.bosch.topicregistration.api.user;

import lombok.*;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse<T> {
    private String message;
    private Integer statusCode;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Map<String, T> data;
}
