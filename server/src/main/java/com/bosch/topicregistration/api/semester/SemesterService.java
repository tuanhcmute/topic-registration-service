package com.bosch.topicregistration.api.semester;

import com.bosch.topicregistration.api.response.PageResponse;
import com.bosch.topicregistration.api.response.Response;

import java.util.List;

public interface SemesterService {
    Semester getActivatedSemester();

    Response<PageResponse<List<SemesterDTO>>> getListSemester(Integer pageNumber, Integer pageSize, String sortBy);

    Response<Void> createSemester(SemesterRequest request);

    Response<Void> updateSemester(String semesterId, SemesterRequest request);
}
