package com.bosch.topicregistration.api.major;

public class MajorMapper {
    public static MajorDto toMajorDto (Major major) {
        MajorDto majorDto = new MajorDto();
        majorDto.setCode(major.getCode());
        majorDto.setName(major.getName());
        return majorDto;
    }
}
