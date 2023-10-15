package com.bosch.topicregistration.api.user;
import java.util.Date;

import com.bosch.topicregistration.api.major.MajorDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String imageUrl;
    private String fullName;
    private String code;
    private String rolde;
    private MajorDto major;
    private Date school_year;
    private String biography;
}
