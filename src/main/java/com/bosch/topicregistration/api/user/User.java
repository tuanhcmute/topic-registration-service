package com.bosch.topicregistration.api.user;

import com.bosch.topicregistration.api.security.AuthProvider;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

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

    @Column(name = "email_column", nullable = false, unique = true, updatable = false)
    private String email;

    @Column(name = "email_verified_column", nullable = false)
    @Builder.Default
    private Boolean emailVerified = false;

    @Column(name = "image_url_column", nullable = false)
    private String imageUrl;

    @Column(name = "name_column", nullable = false)
    private String name;

    @JsonIgnore
    @Builder.Default
    @Column(name = "password_column")
    private String password = null;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider_column", nullable = false)
    private AuthProvider provider;

    @Column(name = "provider_id_column", nullable = false)
    private String providerId;

    @Column(name = "phone_number_column", nullable = false, unique = true, columnDefinition = "VARCHAR(10)")
    private String phoneNumber;
}
