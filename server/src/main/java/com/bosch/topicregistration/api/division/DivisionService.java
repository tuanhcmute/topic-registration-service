package com.bosch.topicregistration.api.division;

import com.bosch.topicregistration.api.response.PageResponse;
import com.bosch.topicregistration.api.response.Response;

import java.util.List;

public interface DivisionService {
    Response<PageResponse<List<DivisionDTO>>> getDivisionByTopicType(String topicType, Integer pageNumber, Integer pageSize, String sortBy);

    Response<Void> createDivisionByTopicType(String topicType, CreateDivisionRequest request);
}
