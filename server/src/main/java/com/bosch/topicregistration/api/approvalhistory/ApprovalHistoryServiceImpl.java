package com.bosch.topicregistration.api.approvalhistory;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.logging.LoggerAround;
import com.bosch.topicregistration.api.response.Response;
import com.bosch.topicregistration.api.topic.Topic;
import com.bosch.topicregistration.api.topic.TopicRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ApprovalHistoryServiceImpl implements ApprovalHistoryService {

    private final ApprovalHistoryRepository approvalHistoryRepository;
    private final TopicRepository topicRepository;
    private final ApprovalHistoryMapper approvalHistoryMapper;

    @Override
    @LoggerAround
    public Response<List<ApprovalHistoryDTO>> getApprovalHistoryByTopicId(String topicId) {
//        Validate
        if(StringUtils.isEmpty(topicId)) throw new BadRequestException("Topic id is not valid");
//        Get topic
        Optional<Topic> topicOptional = topicRepository.findById(topicId);
        if(!topicOptional.isPresent()) throw new BadRequestException("Topic could not be found");
        Topic topic = topicOptional.get();

//        Get list of approval history
        List<ApprovalHistory> approvalHistories = approvalHistoryRepository.findByTopic(topic);
        log.info("Size of approval histories: {}", approvalHistories.size());
        List<ApprovalHistoryDTO> approvalHistoryDTOList = approvalHistoryMapper.toListDTO(approvalHistories);
        log.info("Size of approval histories DTO: {}", approvalHistoryDTOList.size());

//        Build response
        Map<String, List<ApprovalHistoryDTO>> data = new HashMap<>();
        data.put("approvalHistories", approvalHistoryDTOList);

//        Return response
        return  Response.<List<ApprovalHistoryDTO>>builder()
                .message("Approval histories have been successfully retrieved")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }
}
