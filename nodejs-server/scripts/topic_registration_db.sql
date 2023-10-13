create database topic_registration_db;

use topic_registration_db;


CREATE TABLE `Class` (
    id VARCHAR(100) PRIMARY KEY,
    code VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_by VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `Class` (id, code, name, description, created_by)
VALUES
    ('1', 'CSE101', 'Computer Science 101', 'Introduction to Computer Science', 'Admin'),
    ('2', 'MAT202', 'Mathematics 202', 'Advanced Mathematics Course', 'Teacher1'),
    ('3', 'PHY301', 'Physics 301', 'Advanced Physics Course', 'Teacher2'),
    ('4', 'ENG101', 'English 101', 'Basic English Course', 'Teacher1'),
    ('5', 'HIS201', 'History 201', 'World History Course', 'Admin');

CREATE TABLE `Major`(
	id VARCHAR(100) PRIMARY KEY,
    code VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_by VARCHAR(255) ,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `Major` (id, code, name, description, created_by)
VALUES
    ('1', 'CS', 'Computer Science', 'Study of Computer Science', 'Admin'),
    ('2', 'MATH', 'Mathematics', 'Study of Mathematics', 'Admin'),
    ('3', 'PHY', 'Physics', 'Study of Physics', 'Admin'),
    ('4', 'ENG', 'English', 'Study of English', 'Admin'),
    ('5', 'HIST', 'History', 'Study of History', 'Admin');



CREATE TABLE `Specialization` (
    id VARCHAR(100) PRIMARY KEY,
    code VARCHAR(100) NOT NULL,
    description TEXT,
    name VARCHAR(100) NOT NULL
);

INSERT INTO `Specialization` (id, code, description, name)
VALUES
    ('1', 'CS101', 'Introduction to Computer Science', 'Computer Science - Intro'),
    ('2', 'CS201', 'Advanced Computer Science', 'Computer Science - Advanced'),
    ('3', 'MATH101', 'Basic Mathematics', 'Mathematics - Basic'),
    ('4', 'MATH201', 'Advanced Mathematics', 'Mathematics - Advanced'),
    ('5', 'PHY101', 'Basic Physics', 'Physics - Basic');




CREATE TABLE `User` (
    id VARCHAR(100) PRIMARY KEY,
    code VARCHAR(255) ,
    role ENUM('ADMIN', 'STUDENT', 'TEACHER', 'OTHER') NOT NULL,
    email VARCHAR(255),
    image_url TEXT,
    full_name VARCHAR(255),
    phone_number VARCHAR(20),
    provider_id VARCHAR(255),
    `password` VARCHAR(255),
    provider ENUM('GOOGLE', 'GITHUB'),
    biography TEXT,
    school_year INT,
    created_by VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    specialization_id VARCHAR(255),
    class_id VARCHAR(255),
    major_id VARCHAR(255),
    
	CONSTRAINT fk_user_class FOREIGN KEY (class_id) REFERENCES `Class`(id),
    CONSTRAINT fk_user_major FOREIGN KEY (major_id) REFERENCES `Major`(id),
    CONSTRAINT fk_user_specialization FOREIGN KEY (specialization_id) REFERENCES `Specialization`(id)
);



CREATE TABLE `Semester`(
	id VARCHAR(100) PRIMARY KEY,
    code VARCHAR(255) UNIQUE NOT NULL,
	name VARCHAR(100),
	description TEXT,
	active varchar(20),
    start_date DATETIME,
    end_date DATETIME,
    created_by VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `EnrollmentPeriod`(
	id VARCHAR(100) PRIMARY KEY,
    code VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100),
	description TEXT,
    start_date DATETIME,
    end_date DATETIME,
    active varchar(20),
    type ENUM('TLCN', 'KLTN'),
    period ENUM('lecture', 'head', 'student'),
    semester_id VARCHAR(100),
    created_by VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_enrollmentPeriod_semester FOREIGN KEY (semester_id) REFERENCES Semester(id)
);


CREATE TABLE Topic(
	id VARCHAR(100) PRIMARY KEY,
    code VARCHAR(255) UNIQUE NOT NULL,
    name TEXT,
    type ENUM('TLCN', 'KLTN'),
    goal TEXT,
    expectation TEXT,
    requirement TEXT,
    status varchar(20),
    max_slot int,
    rest_slot int,
    created_by VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    semester_id VARCHAR(100),
    specialization VARCHAR(100),
    lecture_id VARCHAR(100),
    
	CONSTRAINT fk_topic_semester FOREIGN KEY (semester_id) REFERENCES Semester(id),
    CONSTRAINT fk_topic_specialization FOREIGN KEY (specialization) REFERENCES Specialization(id),
    CONSTRAINT fk_topic_lecture FOREIGN KEY (lecture_id) REFERENCES `User`(id)
);

CREATE TABLE `Enrollment`(
	id VARCHAR(100) PRIMARY KEY,
    topic_id VARCHAR(100),
    student_id VARCHAR(100),
    created_by VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_enrollment_topic FOREIGN KEY (topic_id) REFERENCES Topic(id),
	CONSTRAINT fk_enrollment_user FOREIGN KEY (student_id) REFERENCES `User`(id)
);




CREATE TABLE `ApprovalHistory`(
	id VARCHAR(100) PRIMARY KEY,
    code VARCHAR(255) UNIQUE NOT NULL,
	reason TEXT,
    status VARCHAR(20),
    topic_id VARCHAR(100),
    created_by VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_approvalhistory_topic FOREIGN KEY (topic_id) REFERENCES Topic(id)
);

CREATE TABLE Division(
	id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255),
    status VARCHAR(20),
    position VARCHAR(20),
    start_date DATETIME,
    detailed_time DATETIME,
    topic_id VARCHAR(100),
    lecture_id VARCHAR(100),
    created_by VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
	CONSTRAINT fk_division_topic FOREIGN KEY (topic_id) REFERENCES Topic(id),
	CONSTRAINT fk_division_user FOREIGN KEY (lecture_id) REFERENCES `User`(id)
);

INSERT INTO `User` (id, code, role, email, image_url, full_name, phone_number, provider_id, `password`, provider, biography, school_year, created_by, class_id, major_id, specialization_id)
VALUES
  ('1', '20110756', 'STUDENT', 'user1@example.com', '', 'User One', '+123456789', 'provider1', 'hashed_password1', 'GOOGLE', 'Biography 1', 2, 'admin1', '1', '2', '3'),
  ('2', '20110757', 'STUDENT', 'user2@example.com', '', 'User Two', '+987654321', 'provider2', 'hashed_password2', 'GITHUB', 'Biography 2', 3, 'admin2', '3', '4', '5');
  








