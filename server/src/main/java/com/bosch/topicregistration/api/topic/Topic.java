package com.bosch.topicregistration.api.topic;

import com.bosch.topicregistration.api.approvalhistory.ApprovalHistory;
import com.bosch.topicregistration.api.division.Division;
import com.bosch.topicregistration.api.topicenrollment.TopicEnrollment;
import com.bosch.topicregistration.api.semester.Semester;
import com.bosch.topicregistration.api.user.Major;
import com.bosch.topicregistration.api.user.User;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "topic_tbl")
@EntityListeners(AuditingEntityListener.class)
public class Topic implements Serializable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id_column", updatable = false)
    private String id;

    @Column(name = "name_column", nullable = false)
    private String name;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "type_column", nullable = false)
    private TopicType type;

    @Lob
    @Column(name = "goal_column", nullable = false)
    private String goal;

    @Lob
    @Column(name = "requirement_column", nullable = false)
    private String requirement;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "status_column", nullable = false)
    private TopicStatus status;

    @Column(name = "max_slot_column", nullable = false)
    private Integer maxSlot;

    @Column(name = "available_slot_column", nullable = false)
    private Integer availableSlot;

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
    private Major major;

    @ManyToOne
    @JoinColumn
    private Semester semester;

    @ManyToOne
    @JoinColumn
    private User lecture;

    @OneToMany(mappedBy = "topic", fetch = FetchType.EAGER)
    @Builder.Default
    private Set<TopicEnrollment> topicEnrollments = new HashSet<>();

    @OneToMany(mappedBy = "topic", fetch = FetchType.EAGER)
    @Builder.Default
    private Set<ApprovalHistory> approvalHistories = new HashSet<>();

    @OneToOne(mappedBy = "topic")
    private Division division;
}
