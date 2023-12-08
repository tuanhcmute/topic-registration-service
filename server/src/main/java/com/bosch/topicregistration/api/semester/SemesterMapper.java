package com.bosch.topicregistration.api.semester;

import org.mapstruct.Mapper;
import java.util.List;

@Mapper(componentModel = "spring")
public interface SemesterMapper {
    List<SemesterDetailDTO> toListSemesterDetailDTO(List<Semester> semesters);
}
