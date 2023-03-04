INSERT INTO departments (name)
 VALUES
  ('Engineering'),
  ('Quality'),
  ('Customer Service'),
  ('Accounting'),
  ('Sales');

INSERT INTO roles (title, salary, dept_id) 
VALUES
  ('Director', 5000000, 1),
  ('Manager', 120000, 4),
  ('Manager', 130000, 3),
  ('Supervisor', 90000, 5),
  ('Manager', 160000, 2),
  ('Intern', 30000, 1);


INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES
  ('Walter', 'White', 1, NULL),
  ('Skyler', 'White', 2, 1),
  ('Saul', 'Goodman', 3, 1),
  ('Jesse', 'Pinkman', 4, 1),
  ('Hank', 'Schrader', 5, 1),
  ('Todd', 'Alquist', 6, 1);
