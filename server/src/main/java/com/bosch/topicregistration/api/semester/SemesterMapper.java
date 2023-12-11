package com.bosch.topicregistration.api.semester;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SemesterMapper {

    List<SemesterDTO> toListSemesterDTO(List<Semester> semesters);

    @Mappings({
            @Mapping(target = "startDate", source = "semester.startDate", dateFormat = "dd-MM-yyyy"),
            @Mapping(target = "endDate", source = "semester.endDate", dateFormat = "dd-MM-yyyy"),
    })
    SemesterDTO toSemesterDTO(Semester semester);
}
