package com.bosch.topicregistration.api.user;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "role_tbl")
@EntityListeners(AuditingEntityListener.class)
public class Role implements Serializable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id_column", updatable = false)
    private String id;

    // Values: ROLE_STUDENT, ROLE_ADMIN
    @Enumerated(value = EnumType.STRING)
    @Column(name = "code_column", unique = true, nullable = false)
    private RoleCode code;

    @Column(name = "description_column")
    private String description;

    @CreatedDate
    @Column(name = "created_date_column", nullable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "updated_date_column", nullable = false)
    private LocalDateTime updatedDate;

    //    @CreatedBy
    @Column(name = "created_by_column", nullable = false)
    private String createdBy;

    @OneToMany(mappedBy = "role")
    private Set<UserRole> userRoles;

}
