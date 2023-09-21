CREATE DATABASE authentication_demo;
USE authentication_demo;

CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255),
  email VARCHAR(255),
  oauth_provider VARCHAR(255),  -- For OAuth login
  oauth_id VARCHAR(255),        -- For OAuth login
  role VARCHAR(20) NOT NULL,-- student, teacher
  enable tinyint default 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS confirm_token (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    expired_time DATETIME NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_confirm_token_user
    FOREIGN KEY (user_id)
    REFERENCES Users(id)
);
