package com.bosch.topicregistration.api.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String imageUrl;
    private String fullName;
    private String ntid;
    private String role;
    private String schoolYear;
    private String biography;
    private String phoneNumber;
    private String email;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private MajorDTO major;
}
