package com.bosch.topicregistration.api.semester;
import com.bosch.topicregistration.api.response.Response;

import java.util.List;

public interface SemesterService {
    Semester getActivatedSemester();

    Response<List<SemesterDTO>> getListSemester();

    Response<Void> createSemester(SemesterRequest request);

    Response<Void> modifySemester(String semesterId, SemesterRequest request);
}
