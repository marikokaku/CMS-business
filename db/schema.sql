DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) 
    ON UPDATE CASCADE ON DELETE CASCADE 
);

-- CREATE TABLE employee (
--     id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(30) NOT NULL,
--     role_id INTEGER NOT NULL,
--     manager_id INTEGER NULL,
--     FOREIGN KEY (role_id) REFERENCES role(id) 
--     ON UPDATE CASCADE ON DELETE RESTRICT,
--     FOREIGN KEY (manager_id) REFERENCES employee(id)
--     ON UPDATE CASCADE ON DELETE SET NULL
-- );