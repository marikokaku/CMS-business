INSERT INTO department (name)
VALUES 
('Accounting'),
('Human Resources'), 
('Marketing'),
('Administrative');

INSERT INTO role (title, salary, department_id)
VALUES
('accounting manager', 80000, 1),
('accountant', 70000, 1),
('human resources manager', 75000, 2),
('communications manager', 90000, 3),
('creative director', 85000, 3),
('receptionist', 50000, 4),
('secretary', 55000, 4);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)