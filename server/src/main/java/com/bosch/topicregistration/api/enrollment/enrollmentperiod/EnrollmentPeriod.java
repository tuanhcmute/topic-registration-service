package com.bosch.topicregistration.api.enrollment.enrollmentperiod;

import com.bosch.topicregistration.api.enrollment.semester.Semester;
import com.bosch.topicregistration.api.enrollment.topic.TopicType;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "enrollment_period_tbl")
@EntityListeners(AuditingEntityListener.class)
public class EnrollmentPeriod {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id_column", updatable = false)
    private String id;

    @Column(name = "code_column", nullable = false)
    @Enumerated
    private EnrollmentPeriodCode code;

    @Column(name = "type_column", nullable = false)
    @Enumerated
    private TopicType type;

    @Column(name = "name_column", nullable = false)
    private String name;

    @Column(name = "start_date_column", nullable = false, unique = true)
    private LocalDateTime startDate;

    @Column(name = "end_date_column", nullable = false, unique = true)
    private LocalDateTime endDate;

    @Column(name = "created_by_column", nullable = false)
    private String createdBy;

    @CreatedDate
    @Column(name = "created_date_column", nullable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "updated_date_column", nullable = false)
    private LocalDateTime updatedDate;

    @ManyToOne
    @JoinColumn
    private Semester semester;
}
