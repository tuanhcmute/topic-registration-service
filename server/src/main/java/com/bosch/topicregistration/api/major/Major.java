package com.bosch.topicregistration.api.major;

import java.sql.Date;
import java.util.List;

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

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "major_tbl")
public class Major {
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
    private String created_by;

    @Column(name = "created_date_column", nullable = false)
    private Date createdDate;

    @Column(name = "update_date_column", nullable = true)
    private Date updateDate;

    @OneToMany(mappedBy = "major")
    private List<User> users;
}
