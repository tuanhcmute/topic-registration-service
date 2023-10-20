package com.bosch.topicregistration.api.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mappings({
            @Mapping(target = "createdDate", source = "user.createdDate", dateFormat = "dd-MM-yyyy HH:mm:ss"),
            @Mapping(target = "updatedDate", source = "user.updatedDate", dateFormat = "dd-MM-yyyy HH:mm:ss")
    })
    UserDTO toDTO(User user);

    Set<String> map(Set<UserRole> userRoles);

    default String map(UserRole userRole) {
        return userRole.getRole().getCode().toString();
    }
}