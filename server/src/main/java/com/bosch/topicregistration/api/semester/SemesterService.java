package com.bosch.topicregistration.api.semester;
import com.bosch.topicregistration.api.response.Response;

import java.util.List;

public interface SemesterService {
    Semester getActivatedSemester();

    Response<List<SemesterDetailDTO>> getListSemester();

    Response<String> createNewSemester(SemesterRequest request);
}
