package com.bosch.topicregistration.api.division;

import com.bosch.topicregistration.api.response.Response;

import java.util.List;

public interface DivisionService {
    Response<List<DivisionDTO>> getDivisionByTopicType(String topicType);

    Response<Void> createDivisionByTopicType(String topicType, CreateDivisionRequest request);
}
