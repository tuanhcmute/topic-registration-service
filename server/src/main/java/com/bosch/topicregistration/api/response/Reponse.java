package com.bosch.topicregistration.api.response;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Reponse {
    private String message;
    private int status;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Object data;
}
