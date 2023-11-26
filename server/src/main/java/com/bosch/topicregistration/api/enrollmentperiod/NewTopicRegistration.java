package com.bosch.topicregistration.api.enrollmentperiod;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewTopicRegistration {
    private String topicCode;
    private List<Map<String, String>> students;
}
