package com.bosch.topicregistration.api.user;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

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
@Table(name = "major_tbl")
public class Major implements Serializable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id_column", updatable = false)
    private String id;

    @Column(name = "code_column", nullable = false, unique = true, updatable = false)
    private String code;

    @Column(name = "name_column", nullable = false, unique = true, updatable = false)
    private String name;

    @Column(name = "description_column", nullable = false)
    private String description;

    @Column(name = "created_by_column", nullable = false)
    private String createdBy;

    @Column(name = "created_date_column", nullable = false)
    private LocalDateTime createdDate;

    @Column(name = "updated_date_column")
    private LocalDateTime updatedDate;

    @OneToMany(mappedBy = "major")
    private Set<User> users;
}
