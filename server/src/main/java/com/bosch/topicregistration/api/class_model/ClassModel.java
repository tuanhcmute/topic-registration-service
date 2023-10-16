package com.bosch.topicregistration.api.class_model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.bosch.topicregistration.api.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.sql.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "class_tbl")
public class ClassModel {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id_column", updatable = false)
    private String id;

    @Column(name = "code_column", nullable = false, unique = true, updatable = false)
    private String code;

    @Column(name = "description_column", nullable = false)
    private String description;

    @Column(name = "created_by_column", nullable = false)
    private String created_by;

    @Column(name = "created_date_column", nullable = false)
    private Date createdDate;

    @Column(name = "update_date_column", nullable = true)
    private Date updateDate;

    @OneToMany(mappedBy = "classModel")
    private List<User> users;
}
