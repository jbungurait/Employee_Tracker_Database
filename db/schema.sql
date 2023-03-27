DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee_list (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager TEXT,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES roles(id),
    PRIMARY KEY (id),
);

CREATE TABLE dapartment (
    id INT NOT NULL,
    PRIMARY KEY (id),
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    PRIMARY KEY (id),
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES dapartment(id)
);
