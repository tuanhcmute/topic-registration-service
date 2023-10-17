package com.bosch.topicregistration.api.user;

import com.bosch.topicregistration.api.major.MajorDto;

public class UserMapper {
    public static UserDto toUserDto(User user, MajorDto majorDto) {
        UserDto userDto = new UserDto();
        userDto.setImageUrl(user.getImageUrl());
        userDto.setFullName(user.getName());
        userDto.setRole(user.getRole());
        userDto.setNtid(user.getNtid());
        userDto.setMajor(majorDto);

        userDto.setSchool_year(user.getSchoolYear());
        userDto.setBiography(user.getBiography());
        return userDto;
    }
}
