package com.bosch.topicregistration.api.enrollment.topic;

import com.bosch.topicregistration.api.enrollment.semester.Semester;
import com.bosch.topicregistration.api.enrollment.semester.SemesterRepository;
import com.bosch.topicregistration.api.enrollment.semester.SemesterStatus;
import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.response.Response;
import com.bosch.topicregistration.api.user.User;
import com.bosch.topicregistration.api.user.UserCommon;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TopicServiceImpl implements TopicService {

    private final TopicRepository topicRepository;
    private final SemesterRepository semesterRepository;
    private final UserCommon userCommon;
    private final TopicMapper topicMapper;

    @Override
    public Response<List<TopicDTO>> getAllTopicsInLectureEnrollmentPeriod(String type) {
//        Get current semester
        List<Semester> semesters = semesterRepository.findByStatus(SemesterStatus.ACTIVATED);
        if(semesters.size() == 0) throw new BadRequestException("Current semester is not activated");
        Semester currentSemester = semesters.get(0);

//        Get topic type by type from client
        TopicType topicType = TopicType.valueOf(type);

//        Get current user
        Optional<User> userOptional = userCommon.getCurrentUserByCurrentAuditor();
        if(!userOptional.isPresent()) throw new BadRequestException("Lecture could not be found");
        User lecture = userOptional.get();

        // Get topics
        List<Topic> topics = topicRepository.findBySemesterAndTypeAndLecture(currentSemester, topicType, lecture);
        List<TopicDTO> listTopicDTO = topicMapper.toListDTO(topics);
        Map<String, List<TopicDTO>> data = new HashMap<>();
        data.put("topics", listTopicDTO);
        return Response.<List<TopicDTO>>builder()
                .message("")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }
}
