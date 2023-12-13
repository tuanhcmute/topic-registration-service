package com.bosch.topicregistration.api.topicenrollment;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.response.Response;
import com.bosch.topicregistration.api.topic.Topic;
import com.bosch.topicregistration.api.topic.TopicRepository;
import com.bosch.topicregistration.api.user.User;
import com.bosch.topicregistration.api.user.UserCommon;
import com.bosch.topicregistration.api.user.UserRepository;
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
public class TopicEnrollmentServiceImpl implements TopicEnrollmentService {
    private final UserRepository userRepository;
    private final TopicEnrollmentRepository topicEnrollmentRepository;
    private final TopicRepository topicRepository;
    private final UserCommon userCommon;
    private final TopicEnrollmentMapper topicEnrollmentMapper;

    @Override
    public Response<Void> deleteTopicEnrollment(String ntid) {
        if (StringUtils.isEmpty(ntid)) throw new BadRequestException("Ntid is not valid");

//        Get user
        Optional<User> userOptional = userRepository.findByNtid(ntid);
        if (!userOptional.isPresent()) throw new BadRequestException("Student could not be found");
        User user = userOptional.get();

//        Get topic enrollment
        Optional<TopicEnrollment> topicEnrollmentOptional = topicEnrollmentRepository.findByStudent(user);
        if (!topicEnrollmentOptional.isPresent()) throw new BadRequestException("Topic enrollment could not be found");
        TopicEnrollment topicEnrollment = topicEnrollmentOptional.get();

//        Get topic
        Topic topic = topicEnrollment.getTopic();

//        Grant is leader to member
        if(topicEnrollment.getIsLeader()) {
            List<TopicEnrollment> topicEnrollments = topicEnrollmentRepository.findByTopicOrderByIsLeaderDesc(topic);
            for (TopicEnrollment item : topicEnrollments) {
                if (!item.getIsLeader()) {
                    item.setIsLeader(true);
                    topicEnrollmentRepository.save(item);
                    break;
                }
            }
        }

//        Update available slot
//        topic.setAvailableSlot(topic.getAvailableSlot() + 1);
//        topicRepository.save(topic);

//        Delete
        topicEnrollmentRepository.delete(topicEnrollment);

//        Build response
        return Response.<Void>builder()
                .statusCode(HttpStatus.OK.value())
                .message("Topic enrollment has been deleted successfully")
                .build();
    }

    @Override
    public Response<Void> createTopicEnrollment(CreateTopicEnrollmentRequest request) {
//        Get topic
        Optional<Topic> topicOptional = topicRepository.findById(request.getTopicId());
        if (!topicOptional.isPresent()) throw new BadRequestException("Topic could not be found");
        Topic topic = topicOptional.get();

//        Get topic enrollment
        List<TopicEnrollment> topicEnrollments = topicEnrollmentRepository.findByTopicOrderByIsLeaderDesc(topic);
        if (!topicEnrollments.isEmpty()) {
           if(topic.getMaxSlot() == topicEnrollments.size() && topic.getAvailableSlot() == 0)
               throw new BadRequestException("Topic enrollment is full");
//           Validate user has already existed in topic enrollment
            boolean isAnyMatch = topicEnrollments.stream().anyMatch(topicEnrollment -> topicEnrollment.getStudent().getNtid().equals(request.getNtid()));
            if(isAnyMatch) throw new BadRequestException("The student has already enrolled");
        }

//        Get student
        Optional<User> userOptional = userRepository.findByNtid(request.getNtid());
        if(!userOptional.isPresent()) throw new BadRequestException("Student could not be found");
        User student = userOptional.get();

//           Validate user has already existed in another topic enrollment
        Optional<TopicEnrollment> topicEnrollmentOptional = topicEnrollmentRepository.findByStudent(student);
        topicEnrollmentOptional.ifPresent(topicEnrollment -> {
            throw new BadRequestException("The student has already enrolled in another topic");});

//        Enrollment
        TopicEnrollment topicEnrollment = TopicEnrollment.builder()
                .topic(topic)
                .student(student)
                .build();
        if(topicEnrollments.isEmpty()) topicEnrollment.setIsLeader(true);
        topicEnrollmentRepository.save(topicEnrollment);
        log.info("Topic enrollment: {}", topicEnrollment.getId());

//        Update available slot
//        topic.setAvailableSlot(topic.getAvailableSlot() - 1);
//        topicRepository.save(topic);
        return Response.<Void>builder()
                .statusCode(HttpStatus.CREATED.value())
                .message("Topic enrollment has been created successfully")
                .build();
    }

    @Override
    public Response<List<TopicEnrollmentDTO>> getTopicEnrollmentsByNtid() {
//        Get student
        User student = userCommon.getCurrentUserByCurrentAuditor();

//         Get topic enrollment
        Optional<TopicEnrollment> topicEnrollmentOptional = topicEnrollmentRepository.findByStudent(student);
        if(!topicEnrollmentOptional.isPresent()) throw new BadRequestException("Student has not enrolled yet");

//        Get list
        List<TopicEnrollment> topicEnrollments = topicEnrollmentRepository
                .findByTopicOrderByIsLeaderDesc(topicEnrollmentOptional.get().getTopic());

//        Build response
        List<TopicEnrollmentDTO> topicEnrollmentDTOs = topicEnrollmentMapper.toListDTO(topicEnrollments);
        Map<String, List<TopicEnrollmentDTO>> data = new HashMap<>();
        data.put("topicEnrollments", topicEnrollmentDTOs);

//        Return
        return Response.<List<TopicEnrollmentDTO>>builder()
                .message("Topic enrollments have been retrieved successfully")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }
}
