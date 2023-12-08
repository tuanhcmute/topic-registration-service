package com.bosch.topicregistration.api.semester;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.response.Response;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class SemesterServiceImpl implements SemesterService {
    private final SemesterRepository semesterRepository;
    private final SemesterMapper semesterMapper;

    @Override
    public Semester getActivatedSemester() {
        List<Semester> semesters = semesterRepository.findByStatus(SemesterStatus.ACTIVATED);
        if (semesters.size() == 0) throw new BadRequestException("Current semester is not activated");
        return semesters.get(0);
    }

    @Override
    public Response<List<SemesterDetailDTO>> getListSemester() {
        List<Semester> listSemester = semesterRepository.findAll();
        if(listSemester.size() == 0)
            throw new BadRequestException("List semester is empty");
        List<SemesterDetailDTO> liSemesterDetailDTO = semesterMapper.toListSemesterDetailDTO(listSemester);
        Map<String, List<SemesterDetailDTO>> data = new HashMap<>();
        data.put("semester", liSemesterDetailDTO);
        return Response.<List<SemesterDetailDTO>>builder()
                .message("Approval histories have been successfully retrieved")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }
}
