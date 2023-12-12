package com.bosch.topicregistration.api.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageResponse<T> {
    private Integer totalPages;
    private T content;
}
