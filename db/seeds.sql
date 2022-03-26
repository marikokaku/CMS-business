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

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Tony', 'Hawk', 1, NULL),
('Ryan', 'Sheckler', 2, 1),
('Rob', 'Dyrdek', 3, NULL),
('Bam', 'Margera', 4, NULL),
('Jason', 'Lee', 5, NULL),
('Leticia', 'Bufoni', 6, NULL),
('P.', 'Rod', 7, NULL);
