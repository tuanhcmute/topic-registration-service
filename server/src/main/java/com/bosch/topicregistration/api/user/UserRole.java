package com.bosch.topicregistration.api.user;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Nationalized;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "user_role_tbl")
@EntityListeners(AuditingEntityListener.class)
public class UserRole implements Serializable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id_column", updatable = false)
    private String id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn
    private User user;

    @ManyToOne
    @JoinColumn
    private Role role;

    @CreatedDate
    @Column(name = "created_date_column", nullable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "updated_date_column", nullable = false)
    private LocalDateTime updatedDate;

    //    @CreatedBy
    @Column(name = "created_by_column")
    private String createdBy;

    @Lob
    @Column(name = "description_column", nullable = false)
    @Nationalized
    private String description;
}
