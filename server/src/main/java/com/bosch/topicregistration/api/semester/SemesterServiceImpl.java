package com.bosch.topicregistration.api.semester;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.response.PageResponse;
import com.bosch.topicregistration.api.response.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
    public Response<PageResponse<List<SemesterDTO>>> getListSemester(Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
        Page<Semester> page = semesterRepository.findAll(paging);
        PageResponse<List<SemesterDTO>> pageResponse = PageResponse.<List<SemesterDTO>>builder()
                .totalPages(page.getTotalPages())
                .totalElements(page.getTotalElements())
                .content(semesterMapper.toListSemesterDTO(page.getContent()))
                .build();

        Map<String, PageResponse<List<SemesterDTO>>> data = new HashMap<>();
        data.put("page", pageResponse);
        return Response.<PageResponse<List<SemesterDTO>>>builder()
                .message("Semesters have been successfully retrieved")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }

    @Override
    public Response<Void> createSemester(SemesterRequest request) {
        try {
//            Validate request
            validateSemesterRequest(request);

//            Convert string to semester type
            SemesterType semesterType = SemesterType.valueOf(request.getType());

//            Convert string to local date
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate currentDate = LocalDate.now();
            LocalDate startDate = LocalDate.parse(request.getStartDate(), formatter);
            LocalDate endDate = LocalDate.parse(request.getEndDate(), formatter);

//            Validate date
            if (startDate.isBefore(currentDate))
                throw new BadRequestException("The start date cannot be less than the current date");
            if (endDate.isBefore(startDate))
                throw new BadRequestException("The end date cannot be less than the start date");

            Semester semester = Semester.builder()
                    .type(semesterType)
                    .name(request.getName())
                    .startDate(startDate)
                    .endDate(endDate)
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

    private void validateSemesterRequest(SemesterRequest request) {
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
    public Response<Void> updateSemester(String semesterId, SemesterRequest request) {
        try {
//            Validate request
            validateSemesterRequest(request);

//            Convert string to semester type
            SemesterType semesterType = SemesterType.valueOf(request.getType());

//            Convert string to local date
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate currentDate = LocalDate.now();
            LocalDate startDate = LocalDate.parse(request.getStartDate(), formatter);
            LocalDate endDate = LocalDate.parse(request.getEndDate(), formatter);

//            Validate date
            if (startDate.isBefore(currentDate))
                throw new BadRequestException("The start date cannot be less than the current date");
            if (endDate.isBefore(startDate))
                throw new BadRequestException("The end date cannot be less than the start date");

            Optional<Semester> semesterOptional = semesterRepository.findById(semesterId);
            if (!semesterOptional.isPresent())
                throw new BadRequestException("Semester could not be found");
            Semester semester = semesterOptional.get();

//            Update
            semester.setName(request.getName());
            semester.setStartDate(startDate);
            semester.setEndDate(endDate);
            semester.setType(semesterType);
            semesterRepository.save(semester);

            return Response.<Void>builder()
                    .statusCode(HttpStatus.OK.value())
                    .message("Semester has been updated successfully")
                    .build();
        } catch (Exception exception) {
            log.error(exception.getMessage());
            throw new BadRequestException(exception.getMessage());
        }
    }
}
