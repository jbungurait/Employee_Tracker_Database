DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY (id),
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    title TEXT NOT NULL,
    salary INT NOT NULL,
    PRIMARY KEY (id),
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY(id),
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager TEXT,
    FOREIGN KEY(role_id)
    REFERENCES roles(id)
);