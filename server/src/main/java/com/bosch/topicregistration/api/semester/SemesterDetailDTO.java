package com.bosch.topicregistration.api.semester;

import java.time.LocalDate;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SemesterDetailDTO {
    private String id;
    private String name;
    private SemesterStatus status;
    private LocalDate startDate;
    private LocalDate endDate;
    private SemesterType type;
}
