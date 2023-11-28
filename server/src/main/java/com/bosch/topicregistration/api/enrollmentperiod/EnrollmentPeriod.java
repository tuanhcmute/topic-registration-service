package com.bosch.topicregistration.api.enrollmentperiod;

import com.bosch.topicregistration.api.semester.Semester;
import com.bosch.topicregistration.api.semester.SemesterStatus;
import com.bosch.topicregistration.api.topic.TopicType;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Nationalized;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;
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
    @Enumerated(value = EnumType.STRING)
    private EnrollmentPeriodCode code;

    @Column(name = "status_column", nullable = false)
    @Enumerated(EnumType.STRING)
    private SemesterStatus status;

    @Column(name = "type_column", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private TopicType type;

    @Column(name = "name_column", nullable = false)
    @Lob
    @Nationalized
    private String name;

    @Column(name = "start_date_column", nullable = false, unique = true)
    private LocalDate startDate;

    @Column(name = "end_date_column", nullable = false, unique = true)
    private LocalDate endDate;

    @Column(name = "created_by_column")
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
