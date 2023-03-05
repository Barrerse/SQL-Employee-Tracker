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


-- DROP DATABASE IF EXISTS employeesDB;

-- CREATE DATABASE employeesDB;

-- USE employeesDB;

-- CREATE TABLE department (
--   id INT NOT NULL AUTO_INCREMENT,
--   name VARCHAR(45) NULL,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE role (
--   id INT NOT NULL AUTO_INCREMENT,
--   title VARCHAR(45) NULL,
--   salary DECIMAL(10,3) NULL,
--   department_id INT NULL,
--   PRIMARY KEY (id),
--   FOREIGN KEY (department_id) REFERENCES department(id)
-- );

-- CREATE TABLE employee (
--   id INT NOT NULL AUTO_INCREMENT,
--   first_name VARCHAR(45) NULL,
--   last_name VARCHAR(45) NULL,
--   role_id INT NULL,
--   manager_id INT NULL,
--   PRIMARY KEY (id),
--   FOREIGN KEY (role_id) REFERENCES role(id),
--   FOREIGN KEY (manager_id) REFERENCES employee(id)
-- );
