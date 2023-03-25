DROP DATABASE IF EXISTS eployees_db;
CREATE DATABASE eployees_db;

USE eployees_db;

CREATE TABLE employee (
    id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name: VARCHAR(30) NOT NULL, 
    last_name: VARCHAR(30) NOT NULL,
    role_id: INT NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES role (id),
    manager_id: INT,
    FOREIGN KEY (manager_id)
    REFERENCES role (id)
    ON DELETE SET NULL,
);

CREATE TABLE role (
    id: INT NOT NULL PRIMARY KEY,
    title: VARCHAR(30) NOT NULL,
    salary: DECIMAL NOT NULL,
    department_id: INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES dapartment (id),
);

CREATE TABLE dapartment (
    id: INT NOT NULL PRIMARY KEY,
    dept_name: VARCHAR(30) NOT NULL,
);