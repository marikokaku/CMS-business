const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const Connection = require('mysql2/typings/mysql/lib/Connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'kj6Qh$gda',
        database: 'business'
    });

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    afterConnection();
});


const startPrompt = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Update an employee manager',
                'View employee by manager',
                'View employee by department',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'View total utilized budget',
                'Nothing'
            ]
        }
    ])
        .then((answers) => {
            const { choices } = answers;

            if (choices === 'View all departments') {
                allDepartments();
            }
            if (choices === 'View all roles') {
                allRoles();
            }
            if (choices === 'View all employees') {
                allEmployees();
            }
            if (choices === 'Add a department') {
                addDepartment();
            }
            if (choices === 'Add a role') {
                addRole();
            }
            if (choices === 'Add an employee') {
                addEmployee();
            }
            if (choices === 'Update an employee role') {
                updateEmpRole();
            }
            if (choices === 'Update an employee manager') {
                updateEmpMan();
            }
            if (choices === 'View employee by manager') {
                viewEmpByMan();
            }
            if (choices === 'View employee by department') {
                viewEmpByDept();
            }
            if (choices === 'Delete a department') {
                deleteDepartment();
            }
            if (choices === 'Delete a role') {
                deleteRole();
            }
            if (choices === 'Delete an employee ') {
                deleteEmployee();
            }
            if (choices === 'View total utilized budget') {
                viewBudget();
            }
            if (choices === 'Nothing') {
                connection.end()
            };
        });
};

// View all departments

// View all roles

// View all employees

// Add a department

// Add a role

// Add an employee

// Update an employee role

// Update an employee manager

// View employee by manager

// View employee by department

// Delete a department

// Delete a role

// Delete an employee

// View total utilized budget