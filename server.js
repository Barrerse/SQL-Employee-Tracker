const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'employeeDB'
});

// Connect to the database and start the application
db.connect((err) => {
    if (err) throw err;
    console.log('Database connected.');
    employeeTracker();
  });
  
  // Main application function
function employeeTracker() {
    inquirer.prompt([
      {
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add A Department',
          'Add A Role',
          'Add An Employee',
          'Update An Employee Role',
          'Log Out'
        ]
      }
    ]).then((answers) => {
      switch (answers.prompt) {
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Add A Department':
          addDepartment();
          break;
        case 'Add A Role':
          addRole();
          break;
        case 'Add An Employee':
          addEmployee();
          break;
        case 'Update An Employee Role':
          updateEmployeeRole();
          break;
        case 'Log Out':
          console.log('Goodbye!');
          db.end();
          break;
      }
    });
  }
  
  