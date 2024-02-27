-- Tables
    create table approval_history_tbl (
       id_column varchar(255) not null,
        created_by_column varchar(255),
        created_date_column datetime(6) not null,
        reason_column varchar(255),
        status_column varchar(255),
        updated_date_column datetime(6) not null,
        topic_id_column varchar(255),
        primary key (id_column)
    );

    create table clazz_tbl (
       id_column varchar(255) not null,
        code_column varchar(255) not null,
        created_by_column varchar(255) not null,
        created_date_column timestamp not null,
        description_column varchar(255),
        updated_date_column timestamp not null,
        primary key (id_column)
    );
	
	 create table division_tbl (
       id_column varchar(255) not null,
        created_by_column varchar(255),
        created_date_column datetime(6) not null,
        place_column varchar(255) not null,
        specified_time_column varchar(255) not null,
        start_date_column datetime(6) not null,
        updated_date_column datetime(6) not null,
        lecture_id_column varchar(255),
        topic_id_column varchar(255),
        primary key (id_column)
    );
	
	 create table enrollment_period_tbl (
       id_column varchar(255) not null,
        code_column varchar(255) not null,
        created_by_column varchar(255),
        created_date_column datetime(6) not null,
        end_date_column date not null,
        name_column varchar(255) not null,
        start_date_column date not null,
        status_column varchar(255) not null,
        type_column varchar(255) not null,
        updated_date_column datetime(6) not null,
        semester_id_column varchar(255),
        primary key (id_column)
    );
	
    create table major_tbl (
       id_column varchar(255) not null,
        code_column varchar(255) not null,
        created_by_column varchar(255) not null,
        created_date_column timestamp not null,
        description_column varchar(255),
        name_column varchar(255) not null,
        updated_date_column timestamp,
        primary key (id_column)
    );
    create table role_tbl (
       id_column varchar(255) not null,
        code_column varchar(255) not null,
        created_by_column varchar(255) not null,
        created_date_column timestamp not null,
        description_column varchar(255),
        updated_date_column timestamp not null,
        primary key (id_column)
    );
	
	create table semester_tbl (
       id_column varchar(255) not null,
        created_by_column varchar(255),
        created_date_column datetime(6) not null,
        end_date_column date not null,
        name_column varchar(255) not null,
        start_date_column date not null,
        status_column varchar(255) not null,
        type_column varchar(255) not null,
        updated_date_column datetime(6) not null,
        primary key (id_column)
    );
	
	 create table topic_enrollment_tbl (id_column varchar(255) not null,
        created_by_column varchar(255),
        created_date_column datetime(6) not null,
        updated_date_column datetime(6) not null,
        student_id_column varchar(255),
        topic_id_column varchar(255),
        primary key (id_column)
    );
	
	create table topic_tbl (
       id_column varchar(255) not null,
        available_slot_column integer not null,
        created_by_column varchar(255),
        created_date_column datetime(6) not null,
        goal_column longtext not null,
        max_slot_column integer not null,
        name_column varchar(255) not null,
        requirement_column longtext not null,
        status_column varchar(255) not null,
        type_column varchar(255) not null,
        updated_date_column datetime(6) not null,
        lecture_id_column varchar(255),
        major_id_column varchar(255),
        semester_id_column varchar(255),
        primary key (id_column)
    );
	
    create table user_role_tbl (
       id_column varchar(255) not null,
        role_id_column varchar(255),
        user_id_column varchar(255),
        primary key (id_column)
    );
	
    create table user_tbl (
       id_column varchar(255) not null,
        biography_column varchar(255),
        created_by_column varchar(255) not null,
        created_date_column timestamp not null,
        email_column varchar(255) not null,
        email_verified_column boolean not null,
        image_url_column varchar(255),
        name_column varchar(255) not null,
        ntid_column varchar(255) not null,
        password_column varchar(255) not null,
        phone_number_column VARCHAR(10) not null,
        provider_column varchar(255) not null,
        provider_id_column varchar(255),
        school_year_column varchar(255),
        updated_date_column timestamp not null,
        clazz_id_column varchar(255),
        major_id_column varchar(255),
        primary key (id_column)
    ) ;
	
     alter table clazz_tbl 
       add constraint UK_q9a64ke39l41565hutmtwbhl6 unique (code_column);
    alter table enrollment_period_tbl 
       add constraint UK_qokj0peogxen4pb70krppy9ej unique (end_date_column);
    alter table enrollment_period_tbl 
       add constraint UK_3x2aabi14dqsrnxaxmcpdvigt unique (start_date_column);
    alter table major_tbl 
       add constraint UK_18ht3img9m2j1waikmq6js079 unique (code_column);
    alter table major_tbl 
       add constraint UK_r03acmqep7cw3e7smxlqt1jo9 unique (name_column);
    alter table role_tbl 
       add constraint UK_y8ix4j6av64v6vbltfaavlbf unique (code_column);
    alter table semester_tbl 
       add constraint UK_sbrqintgbgjvk99xwu1qhv41n unique (end_date_column);
    alter table semester_tbl 
       add constraint UK_31dgntbgdueglns0k4mlbx38j unique (start_date_column);
    alter table user_tbl 
       add constraint UK_qx868heep1d4dc35abihvdvg7 unique (email_column);
    alter table user_tbl add constraint UK_ph0dhb2s921hkvh7gx3ydj4vx unique (ntid_column);
    alter table user_tbl 
       add constraint UK_d44w452gtp7l3vsxipcixyql6 unique (phone_number_column);
    alter table approval_history_tbl 
       add constraint FK1u4x2n0wg302b6uwnwi9mmfvu 
       foreign key (topic_id_column) 
       references topic_tbl (id_column);
    alter table division_tbl 
       add constraint FK27r2oss8ugfvwp69ejy2vlp8x 
       foreign key (lecture_id_column) 
       references user_tbl (id_column);
    alter table division_tbl 
       add constraint FKqswngu25gjunp8w6ysc583n28 
       foreign key (topic_id_column) 
       references topic_tbl (id_column);
    alter table enrollment_period_tbl 
       add constraint FKctdgx93ahkj4n2291ekdnau1q 
       foreign key (semester_id_column) 
       references semester_tbl (id_column);
    alter table topic_enrollment_tbl 
       add constraint FKh6ty0mg83whiihqc29sd4xcrt 
       foreign key (student_id_column) 
       references user_tbl (id_column);
    alter table topic_enrollment_tbl 
       add constraint FKjbhew2bympn3rimglxdsh32xw 
       foreign key (topic_id_column) 
       references topic_tbl (id_column);
    alter table topic_tbl 
       add constraint FK41155cc4shnxp2bk465yenwb2 
       foreign key (lecture_id_column) 
       references user_tbl (id_column);
    alter table topic_tbl 
       add constraint FKa05ioaeyawnjthbakq8liy3im 
       foreign key (major_id_column) 
       references major_tbl (id_column);
    alter table topic_tbl 
       add constraint FKj4aitscqp4wrlxr8k11os7xt9 
       foreign key (semester_id_column) 
       references semester_tbl (id_column);
    alter table user_role_tbl 
       add constraint FK79yikpioo9jp4ssnbog6x8nx9 
       foreign key (role_id_column) 
       references role_tbl (id_column);
    alter table user_role_tbl 
       add constraint FK5itp13mv4t5qd7ogmfi3mak7f 
       foreign key (user_id_column) 
       references user_tbl (id_column);
    alter table user_tbl 
       add constraint FKim97qluc78kror290j6qplnp8 
       foreign key (clazz_id_column) 
       references clazz_tbl (id_column);
    alter table user_tbl 
       add constraint FKfr8j3tsrgm0nn6g6re9kir1jc 
       foreign key (major_id_column) 
       references major_tbl (id_column);


-- Roles
INSERT INTO role_tbl(id_column, code_column, description_column, created_date_column, updated_date_column, created_by_column)
VALUES('885b9ca9-e3b3-4d7b-a01e-37bc491e250e', 'ROLE_ANONYMOUS', NULL, '2023-10-17 10:10:56', '2023-10-17 10:10:56', '885b9ca9-e3b3-4d7b-a01e-37bc491e250e');
INSERT INTO role_tbl(id_column, code_column, description_column, created_date_column, updated_date_column, created_by_column)
VALUES('717b2c92-ad04-4f55-9e89-a746ab6d3af4', 'ROLE_STUDENT', NULL, '2023-10-17 10:10:56', '2023-10-17 10:10:56', '717b2c92-ad04-4f55-9e89-a746ab6d3af4');
INSERT INTO role_tbl(id_column, code_column, description_column, created_date_column, updated_date_column, created_by_column)
VALUES('3b67eba8-8a3d-47fe-8bfe-bfce709dafe9', 'ROLE_LECTURE', NULL, '2023-10-17 10:10:56', '2023-10-17 10:10:56', '3b67eba8-8a3d-47fe-8bfe-bfce709dafe9');
INSERT INTO role_tbl(id_column, code_column, description_column, created_date_column, updated_date_column, created_by_column)
VALUES('b70b89f6-c6cb-4066-aab8-ccf992f61b25', 'ROLE_HEAD', NULL, '2023-10-17 10:10:56', '2023-10-17 10:10:56', 'b70b89f6-c6cb-4066-aab8-ccf992f61b25');
INSERT INTO role_tbl(id_column, code_column, description_column, created_date_column, updated_date_column, created_by_column)
VALUES('70a74fec4-2490-45db-b251-e261614ddf2f', 'ROLE_ADMIN', NULL, '2023-10-17 10:10:56', '2023-10-17 10:10:56', '0a74fec4-2490-45db-b251-e261614ddf2f');

-- Clazzez
INSERT INTO clazz_tbl(id_column, code_column, description_column, created_date_column, updated_date_column, created_by_column)
VALUES('31bc98c3-1e37-4299-a698-21553b4473b4', '20110ST6', NULL, '2023-10-17 10:10:56', '2023-10-17 10:10:56', '31bc98c3-1e37-4299-a698-21553b4473b4');

-- Majors
INSERT INTO major_tbl(id_column, code_column, name_column, description_column, created_date_column, updated_date_column, created_by_column)
VALUES('d4ed5f34-5550-47e4-a335-f8ad8cc6e3a0', '20110ST', 'Công nghệ phần mềm', NULL, '2023-10-17 10:10:56', '2023-10-17 10:10:56', '31bc98c3-1e37-4299-a698-21553b4473b4');

-- Users
INSERT INTO user_tbl(id_column, ntid_column, email_column, email_verified_column, image_url_column, name_column, password_column,
                     phone_number_column, provider_id_column, provider_column, biography_column, created_by_column,
                     created_date_column, updated_date_column, school_year_column, clazz_id_column, major_id_column)
VALUES('679c7598-dda6-4798-a7f0-7c2bf61f1fe4', '20110743', '20110743@student.hcmute.edu.vn', 1, NULL, 'Đỗ Dương Thái Tuấn', '20110743',
       '0475894650', NULL, 'GOOGLE', NULL, '679c7598-dda6-4798-a7f0-7c2bf61f1fe4',
       '2023-10-17 10:10:56', '2023-10-17 10:10:56', '2020 - 2024', '31bc98c3-1e37-4299-a698-21553b4473b4', 'd4ed5f34-5550-47e4-a335-f8ad8cc6e3a0');
INSERT INTO user_tbl(id_column, ntid_column, email_column, email_verified_column, image_url_column, name_column, password_column,
phone_number_column, provider_id_column, provider_column, biography_column, created_by_column,
                     created_date_column, updated_date_column, school_year_column, clazz_id_column, major_id_column)
VALUES('717b2c92-ad04-4f55-9e89-a746ab6d3af4', '20110234', '20110234@student.hcmute.edu.vn', 1, NULL, 'Nguyễn Kiều Châu Anh', '20110234',
       '0794465667', NULL, 'GOOGLE', NULL, '679c7598-dda6-4798-a7f0-7c2bf61f1fe4',
       '2023-10-17 10:10:56', '2023-10-17 10:10:56', '2020 - 2024', '31bc98c3-1e37-4299-a698-21553b4473b4', 'd4ed5f34-5550-47e4-a335-f8ad8cc6e3a0');
INSERT INTO user_tbl(id_column, ntid_column, email_column, email_verified_column, image_url_column, name_column, password_column,
                     phone_number_column, provider_id_column, provider_column, biography_column, created_by_column,
                     created_date_column, updated_date_column, school_year_column, clazz_id_column, major_id_column)
VALUES('3b67eba8-8a3d-47fe-8bfe-bfce709dafe9', '20110610', '20110610@student.hcmute.edu.vn', 1, NULL, 'Quách Thị Mai Anh', '20110610',
       '0179767891', NULL, 'GOOGLE', NULL, '679c7598-dda6-4798-a7f0-7c2bf61f1fe4',
       '2023-10-17 10:10:56', '2023-10-17 10:10:56', '2020 - 2024', '31bc98c3-1e37-4299-a698-21553b4473b4', 'd4ed5f34-5550-47e4-a335-f8ad8cc6e3a0');
INSERT INTO user_tbl(id_column, ntid_column, email_column, email_verified_column, image_url_column, name_column, password_column,
                     phone_number_column, provider_id_column, provider_column, biography_column, created_by_column,
                     created_date_column, updated_date_column, school_year_column, clazz_id_column, major_id_column)
VALUES('b70b89f6-c6cb-4066-aab8-ccf992f61b25', '20110252', '20110252@student.hcmute.edu.vn', 1, NULL, 'Phạm Phúc Bình', '20110252',
       '0594245213', NULL, 'GOOGLE', NULL, '679c7598-dda6-4798-a7f0-7c2bf61f1fe4',
       '2023-10-17 10:10:56', '2023-10-17 10:10:56', '2020 - 2024', '31bc98c3-1e37-4299-a698-21553b4473b4', 'd4ed5f34-5550-47e4-a335-f8ad8cc6e3a0');
INSERT INTO user_tbl(id_column, ntid_column, email_column, email_verified_column, image_url_column, name_column, password_column,
                     phone_number_column, provider_id_column, provider_column, biography_column, created_by_column,
                     created_date_column, updated_date_column, school_year_column, clazz_id_column, major_id_column)
VALUES('0a74fec4-2490-45db-b251-e261614ddf2f', '20110615', '20110615@student.hcmute.edu.vn', 1, NULL, 'Lương Minh Chiến', '20110615',
       '0929234510', NULL, 'GOOGLE', NULL, '679c7598-dda6-4798-a7f0-7c2bf61f1fe4',
       '2023-10-17 10:10:56', '2023-10-17 10:10:56', '2020 - 2024', '31bc98c3-1e37-4299-a698-21553b4473b4', 'd4ed5f34-5550-47e4-a335-f8ad8cc6e3a0');

-- UserRoles
INSERT INTO user_role_tbl(id_column, role_id_column, user_id_column)
VALUES('e0bedd69-1df6-4a9c-a1d5-b5e97cd31aa9', '3b67eba8-8a3d-47fe-8bfe-bfce709dafe9', '679c7598-dda6-4798-a7f0-7c2bf61f1fe4');
INSERT INTO user_role_tbl(id_column, role_id_column, user_id_column)
VALUES('efe75e0c-7116-4587-a03e-52a98d5b791a', 'b70b89f6-c6cb-4066-aab8-ccf992f61b25', '679c7598-dda6-4798-a7f0-7c2bf61f1fe4');
INSERT INTO user_role_tbl(id_column, role_id_column, user_id_column)
VALUES('547eb200-5425-4c7a-95ef-09ccfd878428', '717b2c92-ad04-4f55-9e89-a746ab6d3af4', '717b2c92-ad04-4f55-9e89-a746ab6d3af4');
INSERT INTO user_role_tbl(id_column, role_id_column, user_id_column)
VALUES('547eb200-5425-4c7a-95ef-09ccfd878429', '717b2c92-ad04-4f55-9e89-a746ab6d3af4', '3b67eba8-8a3d-47fe-8bfe-bfce709dafe9');
INSERT INTO user_role_tbl(id_column, role_id_column, user_id_column)
VALUES('547eb200-5425-4c7a-95ef-09ccfd878420', '717b2c92-ad04-4f55-9e89-a746ab6d3af4', 'b70b89f6-c6cb-4066-aab8-ccf992f61b25');
INSERT INTO user_role_tbl(id_column, role_id_column, user_id_column)
VALUES('547eb200-5425-4c7a-95ef-09ccfd878421', '717b2c92-ad04-4f55-9e89-a746ab6d3af4', '0a74fec4-2490-45db-b251-e261614ddf2f');

-- Semesters
INSERT INTO semester_tbl(id_column, type_column, status_column, name_column, start_date_column, end_date_column,
                         created_by_column, created_date_column, updated_date_column)
VALUES('d29bae2c-e1db-4ce9-bbc7-659fae4f4fce', 'FIRST_SEMESTER', 'ACTIVATED', 'HKI năm học 2023 - 2024', '2023-08-21', '2023-12-18',
       NULL, '2023-10-17 10:10:56', '2023-10-17 10:10:56');

-- Enrollment period
INSERT INTO enrollment_period_tbl(id_column, code_column, created_by_column, created_date_column, end_date_column, name_column, start_date_column,
                                  status_column, type_column, updated_date_column, semester_id_column)
VALUES('d29bae2c-e1db-4ce9-bbc7-659fae4f4fce', 'LECTURE_ENROLLMENT_PERIOD', NULL, '2023-10-17 10:10:56', '2023-09-11',
       'Đợt giảng viên đề xuất đề tài tiểu luận chuyên ngành học kỳ I/2023 (28/08 - 11/09/2023)', '2023-08-28',
       'ACTIVATED', 'TLCN', '2023-10-17 10:10:56', 'd29bae2c-e1db-4ce9-bbc7-659fae4f4fce');
INSERT INTO enrollment_period_tbl(id_column, code_column, created_by_column, created_date_column, end_date_column, name_column, start_date_column,
                                  status_column, type_column, updated_date_column, semester_id_column)
VALUES('e9a37111-5be3-43e1-a5f3-b6f3879f19fc', 'STUDENT_ENROLLMENT_PERIOD', NULL, '2023-10-17 10:10:56', '2023-09-24',
       'Đợt sinh viên đăng ký tiểu luận chuyên ngành học kỳ I/2023 (18/09 - 24/09/2023)', '2023-09-18',
       'TERMINATED', 'TLCN', '2023-10-17 10:10:56', 'd29bae2c-e1db-4ce9-bbc7-659fae4f4fce');

-- Topics
INSERT INTO topic_tbl(id_column, created_by_column, created_date_column, goal_column, name_column, requirement_column, status_column,
type_column, updated_date_column, lecture_id_column, major_id_column, semester_id_column, max_slot_column, available_slot_column)
VALUES('3d11314f-5c15-4244-aa87-cc727e963cd3', NULL, '2023-09-21 0:00:00', '', 'Xây dựng website bán giầy sử dụng MERN Stack',
       '- Đọc hiểu tài liệu tiếng Anh, - Kỹ năng lập trình tốt, - Có tinh thần trách nhiệm', 'CREATED',
       'TLCN', '2023-09-21 0:00:00', '679c7598-dda6-4798-a7f0-7c2bf61f1fe4', 'd4ed5f34-5550-47e4-a335-f8ad8cc6e3a0', 'd29bae2c-e1db-4ce9-bbc7-659fae4f4fce', 2, 2);