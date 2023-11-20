package com.bosch.topicregistration.api.topicenrollment;

import com.bosch.topicregistration.api.topic.Topic;
import com.bosch.topicregistration.api.user.User;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "topic_enrollment_tbl")
@EntityListeners(AuditingEntityListener.class)
public class TopicEnrollment {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id_column", updatable = false)
    private String id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn
    private User student;

    @Column(name = "is_leader_column")
    @Builder.Default
    private Boolean isLeader = false;

    @ManyToOne
    @JoinColumn
    private Topic topic;

    @Column(name = "created_by_column")
    private String createdBy;

    @CreatedDate
    @Column(name = "created_date_column", nullable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "updated_date_column", nullable = false)
    private LocalDateTime updatedDate;
}
