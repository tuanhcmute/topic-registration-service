package com.bosch.topicregistration.api.user;

import com.bosch.topicregistration.api.security.oauth2.OAuth2Provider;
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
@Table(name = "user_tbl")
@EntityListeners(AuditingEntityListener.class)
public class User implements Serializable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id_column", updatable = false)
    private String id;

    @Column(name = "ntid_column", nullable = false, unique = true, updatable = false)
    private String ntid;

    @Column(name = "role_column", nullable = false)
    private String role;

    @Column(name = "email_column", nullable = false, unique = true, updatable = false)
    private String email;

    @Column(name = "image_url_column")
    private String imageUrl;

    @Column(name = "name_column", nullable = false)
    private String name;

    @Column(name = "password_column")
    private String password;

    @Column(name = "phone_number_column", nullable = false, unique = true, columnDefinition = "VARCHAR(10)")
    private String phoneNumber;

    @Column(name = "provider_id_column", nullable = false)
    private String providerId;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider_column", nullable = false)
    private OAuth2Provider provider;

    @Column(name = "email_verified_column", nullable = false)
    @Builder.Default
    private Boolean emailVerified = false;

    @Column(name = "biography_column")
    private String biography;

    @Column(name = "created_by_column", nullable = false)
    private String createdBy;

    @CreatedDate
    @Column(name = "created_date_column", nullable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "updated_date_column")
    private LocalDateTime updatedDate;

    @Column(name = "school_year_column")
    private String schoolYear;

    @ManyToOne
    @JoinColumn
    private Clazz clazz;

    @ManyToOne
    @JoinColumn
    private Major major;

    @OneToMany(mappedBy = "user")
    private Set<UserRole> userRoles;

}
