package com.bosch.topicregistration.api.enrollment.semester;

import com.bosch.topicregistration.api.enrollment.enrollmentperiod.EnrollmentPeriod;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "semester_tbl")
public class Semester {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id_column", updatable = false)
    private String id;

    @Column(name = "type_column", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private SemesterType type;

    @Column(name = "status_column", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private SemesterStatus status;

    @Column(name = "name_column", nullable = false)
    private String name;

    @Column(name = "start_date_column", nullable = false, unique = true)
    private LocalDateTime startDate;

    @Column(name = "end_date_column", nullable = false, unique = true)
    private LocalDateTime endDate;

    @Column(name = "created_by_column")
    private String createdBy;

    @CreatedDate
    @Column(name = "created_date_column", nullable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "updated_date_column", nullable = false)
    private LocalDateTime updatedDate;

    @OneToMany(mappedBy = "semester")
    @Builder.Default
    private Set<EnrollmentPeriod> enrollmentPeriods = new HashSet<>();

}
