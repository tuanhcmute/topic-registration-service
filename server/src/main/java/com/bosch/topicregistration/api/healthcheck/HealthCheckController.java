package com.bosch.topicregistration.api.healthcheck;

import com.bosch.topicregistration.api.response.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Health Check Status API")
public class HealthCheckController {

    @Value("${server.port}")
    private String port;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Operation(hidden = true)
    public Response<Void> getHealthCheckStatus() {
        Response<Void> response = Response.<Void>builder()
                .message("Application is running on port " + port)
                .statusCode(HttpStatus.OK.value())
                .build();
        log.info(response.getMessage());
        return response;
    }
}
