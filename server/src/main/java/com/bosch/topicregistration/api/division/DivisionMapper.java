package com.bosch.topicregistration.api.division;

import com.bosch.topicregistration.api.topic.Topic;
import com.bosch.topicregistration.api.topic.TopicDTO;
import com.bosch.topicregistration.api.topic.TopicMapper;
import com.bosch.topicregistration.api.user.LectureDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DivisionMapper {
    @Mappings({
            @Mapping(target = "startDate", source = "division.startDate", dateFormat = "dd-MM-yyyy"),
    })
    DivisionDTO toDTO(Division division);

    List<DivisionDTO> toListDTO(List<Division> divisions);

    default TopicDTO mapTopicDTO(Topic topic) {
        return Mappers.getMapper(TopicMapper.class).toDTO(topic);
    }
}
