package com.bosch.topicregistration.api.semester;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.response.Response;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class SemesterServiceImpl implements SemesterService {
    private final SemesterRepository semesterRepository;
    private final SemesterMapper semesterMapper;

    @Override
    public Semester getActivatedSemester() {
        List<Semester> semesters = semesterRepository.findByStatus(SemesterStatus.ACTIVATED);
        if (semesters.size() == 0)
            throw new BadRequestException("Current semester is not activated");
        return semesters.get(0);
    }

    @Override
    public Response<List<SemesterDetailDTO>> getListSemester() {
        List<Semester> listSemester = semesterRepository.findAll();
        if (listSemester.size() == 0)
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

    @Override
    public Response<String> createNewSemester(SemesterRequest request) {
        try {
            SemesterValidatorResult result = SemesterValidator
                    .isNameValid()
                    .and(SemesterValidator.isNameValid())
                    .and(SemesterValidator.isStartDateValid())
                    .and(SemesterValidator.isEndDateValid())
                    .and(SemesterValidator.isStatusValid())
                    .and(SemesterValidator.isTypeValid())
                    .apply(request);

            if (!result.equals(SemesterValidatorResult.VALID))
                throw new BadRequestException(result.getMessage());
                    
            LocalDate currentDate = LocalDate.now();
            if(request.getStartDate().compareTo(currentDate) == -1)
                throw new BadRequestException("The start date cannot be less than the current date");

            if(request.getEndDate().compareTo(request.getStartDate()) == -1)
                throw new BadRequestException("The end date cannot be less than the start date");

                

            Semester semester = Semester.builder()
                    .type(request.getType())
                    .status(request.getStatus())
                    .name(request.getName())
                    .startDate(request.getStartDate())
                    .endDate(request.getEndDate())
                    .createdBy(null)
                    .updatedDate(LocalDateTime.now())
                    .createdDate(LocalDateTime.now())
                    .enrollmentPeriods(null)
                    .build();

            semesterRepository.save(semester);

            return Response.<String>builder()
                    .statusCode(HttpStatus.CREATED.value())
                    .message("New semester has been created successfully")
                    .build();
        } catch (Exception exception) {
            throw new BadRequestException(exception.getMessage());
        }
    }

    @Override
    public Response<String> modifySemester(String semesterId, SemesterRequest request) {
        try {
            SemesterValidatorResult result = SemesterValidator
                    .isNameValid()
                    .and(SemesterValidator.isNameValid())
                    .and(SemesterValidator.isStartDateValid())
                    .and(SemesterValidator.isEndDateValid())
                    .and(SemesterValidator.isStatusValid())
                    .and(SemesterValidator.isTypeValid())
                    .apply(request);

            if (!result.equals(SemesterValidatorResult.VALID))
                throw new BadRequestException(result.getMessage());
                    
            LocalDate currentDate = LocalDate.now();
            if(request.getStartDate().compareTo(currentDate) == -1)
                throw new BadRequestException("The start date cannot be less than the current date");

            if(request.getEndDate().compareTo(request.getStartDate()) == -1)
                throw new BadRequestException("The end date cannot be less than the start date");

                

            Optional<Semester> semesterOptional = semesterRepository.findById(semesterId);

            if (!semesterOptional.isPresent()) 
                throw new BadRequestException("Can not find Semester you need to update");

            Semester semester = semesterOptional.get();
            semester.setName(request.getName());
            semester.setStartDate(request.getStartDate());
            semester.setEndDate(request.getEndDate());
            semester.setType(request.getType());
            semester.setStatus(request.getStatus());

            semesterRepository.save(semester);

            return Response.<String>builder()
                    .statusCode(HttpStatus.CREATED.value())
                    .message("New semester has been updated successfully")
                    .build();
        } catch (Exception exception) {
            throw new BadRequestException(exception.getMessage());
        }
    }
}
