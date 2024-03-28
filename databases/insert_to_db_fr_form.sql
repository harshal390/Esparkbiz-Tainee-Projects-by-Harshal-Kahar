create database main_database;

CREATE TABLE basic_details (
    unique_id VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number varchar(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    hobbies VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);