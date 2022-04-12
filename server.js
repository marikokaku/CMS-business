// packages
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

require('dotenv').config();

// Connect to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.SQL_PW,
  database: 'business'
});

// inquirer prompt started after established connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected!');
  return startPrompt();
});

// inquirer prompt list of options
const startPrompt = () => {
  inquirer.prompt([
    {
      // specifies what type of prompt 
      type: 'list',
      name: 'option',
      message: 'What would you like to do?',
      // pageSize prevents endless scroll
      pageSize: 15,
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Update an employee manager',
        'View employee by department',
        'View employee by manager',
        'Delete a department',
        'Delete a role',
        'Delete an employee',
        'View total utilized budget',
        'Nothing'
      ],
    }
  ])
    .then((answers) => {
      const { option } = answers;

      if (option === 'View all departments') {
        allDepartments();
      }
      if (option === 'View all roles') {
        allRoles();
      }
      if (option === 'View all employees') {
        allEmployees();
      }
      if (option === 'Add a department') {
        addDepartment();
      }
      if (option === 'Add a role') {
        addRole();
      }
      if (option === 'Add an employee') {
        addEmployee();
      }
      if (option === 'Update an employee role') {
        updateEmpRole();
      }
      if (option === 'Update an employee manager') {
        updateEmpMan();
      }
      if (option === 'View employee by department') {
        viewEmpByDept();
      }
      if (option === 'View employee by manager') {
        viewEmpByMan();
      }
      if (option === 'Delete a department') {
        deleteDepartment();
      }
      if (option === 'Delete a role') {
        deleteRole();
      }
      if (option === 'Delete an employee ') {
        deleteEmployee();
      }
      if (option === 'View total utilized budget') {
        viewBudget();
      }
      if (option === 'Nothing') {
        db.end()
      };
    });
};

// View all departments
const allDepartments = () => {
  console.log('All departments...\n');
  const sql = `SELECT * FROM department`;

  db.query(sql, (err, rows) => {
    if (err) throw err;

    const table = cTable.getTable(rows)
    console.log(table);
    startPrompt();
  });
};

// View all roles
const allRoles = () => {
  console.log('All roles...\n');
  const sql = `SELECT 
    role.id,
    role.title, 
    role.salary,
    department.name AS name FROM role
    LEFT JOIN department ON role.department_id = department.id
    `;

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    startPrompt();
  });
};

// View all employees
const allEmployees = () => {
  console.log('All employees...\n');
  const sql = `SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title AS title,
    department.name AS department,
    role.salary AS salary,
    CONCAT (manager.first_name, ' ', manager.last_name) AS manager FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
    `;

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    startPrompt();
  });
};

// Add department
const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter name of new department',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Input required!');
          return false;
        }
      }

    }
  ])
    .then(answer => {
      const sql = `INSERT INTO department (name) VALUES (?)`;
      db.query(sql, answer.name, (err, result) => {
        if (err) throw err;
        console.log('Added department:' + answer.name);

        allDepartments();
      });
    });
};

// Add role
const addRole = () => {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    const department = rows.map(({ name, id }) => ({ name: name, value: id }));

    inquirer.prompt([
      {
        type: 'input',
        name: 'role',
        message: 'Enter new role',
        validate: roleInput => {
          if (roleInput) {
            return true;
          } else {
            console.log('Input required!');
            return false;
          };
        }
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter salary for new role',
        validate: salaryInput => {
          if (salaryInput) {
            return true;
          } else {
            console.log('Input required!');
            return false;
          };
        }
      },
      {
        type: 'list',
        name: 'department',
        message: 'Choose department this role belongs to',
        choices: department
      }
    ])
      .then(answer => {
        const params = [answer.role, answer.salary, answer.department];
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        db.query(sql, params, (err) => {
          if (err) throw err;
          console.log('Added Role:' + answer.role);
          allRoles();
        });
      });
  });
};

// Add employee
const addEmployee = () => { 
};

// Update employee role
const updateEmpRole = () => { };

// Update employee manager
const updateEmpMan = () => { };

// View Employee by Department
const viewEmpByDept = () => { };

// Delete a role
const deleteRole = () => {
  const roleSql = `SELECT * FROM role`;

  connection.promise().query(roleSql, (err, data) => {
    if (err) throw err;

    const role = data.map(({ title, id }) => ({ name: title, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        message: "What role do you want to delete?",
        choices: role
      }
    ])
      .then(roleChoice => {
        const role = roleChoice.role;
        const sql = `DELETE FROM role WHERE id = ?`;

        connection.query(sql, role, (err, result) => {
          if (err) throw err;
          console.log("Successfully deleted!");

          showRoles();
        });
      });
  });
};

// Delete an employee
const deleteEmployee = () => {
  // get employees from employee table 
  const employeeSql = `SELECT * FROM employee`;

  connection.promise().query(employeeSql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to delete?",
        choices: employees
      }
    ])
      .then(empChoice => {
        const employee = empChoice.name;

        const sql = `DELETE FROM employee WHERE id = ?`;

        connection.query(sql, employee, (err, result) => {
          if (err) throw err;
          console.log("Successfully Deleted!");

          showEmployees();
        });
      });
  });
};

// View total utilized budget
const viewBudget = () => {
  console.log('Showing budget by department...\n');

  const sql = `SELECT department_id AS id, 
                        department.name AS department,
                        SUM(salary) AS budget
                 FROM  role  
                 JOIN department ON role.department_id = department.id GROUP BY  department_id`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);

    promptUser();
  });
};





