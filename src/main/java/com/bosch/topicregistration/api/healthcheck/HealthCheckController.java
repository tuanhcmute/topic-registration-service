package com.bosch.topicregistration.api.healthcheck;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/healthcheck/status")
@Slf4j
public class HealthCheckController {

    @Value("${server.port}")
    private String port;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public HealthCheckResponse getHealthCheckStatus() {
        HealthCheckResponse response = HealthCheckResponse.builder()
                .message("Application is running on port " + port)
                .statusCode(HttpStatus.OK.value())
                .build();
        log.info(response.getMessage());
        return response;
    }
}
