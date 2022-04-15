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
      if (option === 'Nothing') {
        db.end()
      };
    });
};

// View all departments
const allDepartments = () => {
  console.log('\n All departments: \n');
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
  console.log('\n All roles: \n');
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
  console.log('\n All employees: \n');
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
      message: 'Enter name of new department:',
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
        console.log('\n Department succesffuly added!');

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
        message: 'Enter new role:',
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
        message: 'Enter salary for new role:',
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
        message: 'Choose department this role belongs to:',
        choices: department
      }
    ])
      .then(answer => {
        const params = [answer.role, answer.salary, answer.department];
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        db.query(sql, params, (err) => {
          if (err) throw err;
          console.log('\n Role successfully added!');
          allRoles();
        });
      });
  });
};

// Add employee
const addEmployee = () => {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    const role = rows.map(({ title, id }) => ({ name: title, value: id }));
    inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter first name of new employee:',
        validate: firstNameInput => {
          if (firstNameInput) {
            return true;
          } else {
            console.log('Input required!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter last name of new employee:',
        validate: lastNameInput => {
          if (lastNameInput) {
            return true;
          } else {
            console.log('Input required!');
            return false;
          }
        }
      },
      {
        type: 'list',
        name: 'role',
        message: 'Choose employee role:',
        choices: role
      }
    ])
      .then(answer => {
        const params = [answer.firstName, answer.lastName, answer.role];
        const sql = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)`;
        db.query(sql, params, (err) => {
          if (err) throw err;
          console.log('Employee successfully added!');
          allEmployees();
        });
      });
  });
};

// Update employee role
const updateEmpRole = () => {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    const employee = rows.map(({ first_name, last_name, id }) => ({ name: first_name + '' + last_name, value: id }));

    const sql = `SELECT * FROM role`;
    db.query(sql, (err, rows) => {
      if (err) throw err;
      const role = rows.map(({ title, id }) => ({ name: title, value: id }));

      inquirer.prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'Choose employee to update: ',
          choices: employee
        },
        {
          type: 'list',
          name: 'role',
          message: 'Update employee role to: ',
          choices: role
        }
      ])

        .then(answer => {
          const params = [answer.employee, answer.role];
          const sql = `UPDATE employee WHERE id = (employee) SET role_id = (role)`;
          db.query(sql, params, (err) => {
            if (err) throw err;
            console.log('Employee role successfully updated!');
            allEmployees();
          });
        });
    });
  });
}
