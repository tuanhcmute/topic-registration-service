package com.bosch.topicregistration.api.division;

import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DivisionMapper {
    DivisionDTO toDTO(Division division);
    List<DivisionDTO> toListDTO(List<Division> divisions);
}
