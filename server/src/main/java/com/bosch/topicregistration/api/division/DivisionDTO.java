package com.bosch.topicregistration.api.division;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DivisionDTO {
    private String id;

    private String createdBy;

    private LocalDateTime startDate;

    private String specifiedTime;

    private String place;
}
