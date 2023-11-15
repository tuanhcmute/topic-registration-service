package com.bosch.topicregistration.api.enrollmentperiod;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewTopicRegistration {
    private String topicCode;
    private List<Map<String, String>> students;
}
