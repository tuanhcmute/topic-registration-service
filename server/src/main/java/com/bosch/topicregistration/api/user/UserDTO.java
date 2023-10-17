package com.bosch.topicregistration.api.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private String ntid;
    private String email;
    private String imageUrl;
    private String name;
    private String phoneNumber;
    private String biography;
    private String schoolYear;
    private MajorDTO major;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private ClazzDTO clazz;
    private Set<String> userRoles;
    private String createdDate;
    private String updatedDate;
}
