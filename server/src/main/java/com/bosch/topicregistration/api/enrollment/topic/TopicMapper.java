package com.bosch.topicregistration.api.enrollment.topic;

import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TopicMapper {
    TopicDTO toDTO(Topic topic);

    List<TopicDTO> toListDTO(List<Topic> topics);
}
