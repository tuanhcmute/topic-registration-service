package com.bosch.topicregistration.api.division;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateDivisionRequest {
    private String topicId;
    private String lectureCode;
    private String specifiedTime;
    private String startDate;
    private String place;
}
