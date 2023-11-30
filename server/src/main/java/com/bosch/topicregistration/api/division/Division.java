package com.bosch.topicregistration.api.division;

import com.bosch.topicregistration.api.topic.Topic;
import com.bosch.topicregistration.api.user.User;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Nationalized;
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
@Table(name = "division_tbl")
@EntityListeners(AuditingEntityListener.class)
public class Division {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id_column", updatable = false)
    private String id;

    @Column(name = "created_by_column")
    private String createdBy;

    @Column(name = "start_date_column", nullable = false)
    private LocalDateTime startDate;

    @Nationalized
    @Column(name = "specified_time_column", nullable = false)
    private String specifiedTime;

    @Nationalized
    @Column(name = "place_column", nullable = false)
    private String place;

    @CreatedDate
    @Column(name = "created_date_column", nullable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "updated_date_column", nullable = false)
    private LocalDateTime updatedDate;

    @ManyToOne
    @JoinColumn
    private User lecture;

    @OneToOne
    @JoinColumn
    private Topic topic;
}
