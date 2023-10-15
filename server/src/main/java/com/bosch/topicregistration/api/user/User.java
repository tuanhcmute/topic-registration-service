package com.bosch.topicregistration.api.user;

import com.bosch.topicregistration.api.class_model.ClassModel;
import com.bosch.topicregistration.api.major.Major;
import com.bosch.topicregistration.api.security.oauth2.OAuth2Provider;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "user_tbl")
public class User implements Serializable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id_column", updatable = false)
    private String id;

    @Column(name = "ntid_column", nullable = false, unique = true, updatable = false)
    private String ntid;

    // @Column(name = "code_column", nullable = false, unique = true, updatable = false)
    // private String code;

    @Column(name = "role_column", nullable = false, updatable = true)
    private String role;

    @Column(name = "email_column", nullable = false, unique = true, updatable = false)
    private String email;

    @Column(name = "image_url_column", nullable = true)
    private String imageUrl;

    @Column(name = "name_column", nullable = false)
    private String name;

    @JsonIgnore
    @Builder.Default
    @Column(name = "password_column")
    private String password = null;

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

    @Column(name = "biography_column", nullable = true)
    private String biography;

    @Column(name = "created_by_column", nullable = false)
    private String created_by;

    @Column(name = "created_date_column", nullable = false)
    private Date createdDate;

    @Column(name = "update_date_column", nullable = true)
    private Date updateDate;

    @Column(name = "school_year_column", nullable = true)
    private Date schoolYear;

    @ManyToOne
    @JoinColumn(name = "classId", nullable = true)
    private ClassModel classModel;

    @ManyToOne
    @JoinColumn(name = "majorId", nullable = true)
    private Major major;
}
