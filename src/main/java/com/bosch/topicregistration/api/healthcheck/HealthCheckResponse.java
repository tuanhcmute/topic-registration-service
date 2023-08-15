package com.bosch.topicregistration.api.healthcheck;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HealthCheckResponse {
    private String message;
    private Integer statusCode;
}
