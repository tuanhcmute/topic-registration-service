package com.bosch.topicregistration.api.user;

import com.fasterxml.jackson.annotation.JsonInclude;
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
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Map<String, T> data;
}
