package com.bosch.topicregistration.api.semester;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.response.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.time.LocalDate;
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
        if (semesters.isEmpty())
            throw new BadRequestException("Current semester is not activated");

//        Get first result
        return semesters.get(0);
    }

    @Override
    public Response<List<SemesterDTO>> getListSemester() {
        List<Semester> listSemester = semesterRepository.findAll();
        List<SemesterDTO> listSemesterDTO = semesterMapper.toListSemesterDTO(listSemester);
        Map<String, List<SemesterDTO>> data = new HashMap<>();
        data.put("semesters", listSemesterDTO);
        return Response.<List<SemesterDTO>>builder()
                .message("Semesters have been successfully retrieved")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }

    @Override
    public Response<Void> createSemester(SemesterRequest request) {
        try {
            validateCreateSemesterRequest(request);
            LocalDate currentDate = LocalDate.now();
            if(request.getStartDate().isBefore(currentDate))
                throw new BadRequestException("The start date cannot be less than the current date");

            if(request.getEndDate().isBefore(request.getStartDate()))
                throw new BadRequestException("The end date cannot be less than the start date");

            Semester semester = Semester.builder()
                    .type(request.getType())
                    .name(request.getName())
                    .startDate(request.getStartDate())
                    .endDate(request.getEndDate())
                    .status(SemesterStatus.SCHEDULED)
                    .build();
            semesterRepository.save(semester);

            return Response.<Void>builder()
                    .statusCode(HttpStatus.CREATED.value())
                    .message("Semester has been created successfully")
                    .build();
        } catch (Exception exception) {
            log.error(exception.getMessage());
            throw new BadRequestException(exception.getMessage());
        }
    }

    private void validateCreateSemesterRequest(SemesterRequest request) {
        SemesterValidatorResult result = SemesterValidator
                .isNameValid()
                .and(SemesterValidator.isNameValid())
                .and(SemesterValidator.isStartDateValid())
                .and(SemesterValidator.isEndDateValid())
                .and(SemesterValidator.isTypeValid())
                .apply(request);

        if (!result.equals(SemesterValidatorResult.VALID))
            throw new BadRequestException(result.getMessage());
    }

    @Override
    public Response<Void> modifySemester(String semesterId, SemesterRequest request) {
        try {
            validateCreateSemesterRequest(request);
            LocalDate currentDate = LocalDate.now();
            if(request.getStartDate().isBefore(currentDate))
                throw new BadRequestException("The start date cannot be less than the current date");

            if(request.getEndDate().isBefore(request.getStartDate()))
                throw new BadRequestException("The end date cannot be less than the start date");

            Optional<Semester> semesterOptional = semesterRepository.findById(semesterId);

            if (!semesterOptional.isPresent()) 
                throw new BadRequestException("Semester could not be found");
            Semester semester = semesterOptional.get();

//            Update
            semester.setName(request.getName());
            semester.setStartDate(request.getStartDate());
            semester.setEndDate(request.getEndDate());
            semester.setType(request.getType());
            semesterRepository.save(semester);

            return Response.<Void>builder()
                    .statusCode(HttpStatus.CREATED.value())
                    .message("Semester has been updated successfully")
                    .build();
        } catch (Exception exception) {
            log.error(exception.getMessage());
            throw new BadRequestException(exception.getMessage());
        }
    }
}
