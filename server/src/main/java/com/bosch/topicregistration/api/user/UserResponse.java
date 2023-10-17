package com.bosch.topicregistration.api.user;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse<T> {
    private String message;
    private Integer statusCode;
    private Map<String, T> data;
}
