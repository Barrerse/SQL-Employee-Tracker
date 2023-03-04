DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

DROP TABLE IF EXISTS department;

CREATE TABLE departments (
  dept_id INTEGER AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (dept_id)
);

DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
  role_id INTEGER AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  salary DECIMAL(10,2) NULL,
  dept_id INTEGER,
  PRIMARY KEY (role_id),
  FOREIGN KEY (dept_id) REFERENCES Departments(dept_id)
);

DROP TABLE IF EXISTS employee;

CREATE TABLE employees (
  emp_id INTEGER AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY (emp_id),
  FOREIGN KEY (role_id) REFERENCES roles (role_id),
  FOREIGN KEY (manager_id) REFERENCES employees(emp_id)
);