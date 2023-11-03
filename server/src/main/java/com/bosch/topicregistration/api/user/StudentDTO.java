package com.bosch.topicregistration.api.user;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentDTO {
    private String ntid;
    private String name;
}
