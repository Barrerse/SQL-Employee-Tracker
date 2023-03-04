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
  
  // View all departments
function viewAllDepartments() {
    db.query('SELECT * FROM departments', (err, results) => {
      if (err) throw err;
      console.table(results);
      employeeTracker();
    });
  }
  
  // View all roles
  function viewAllRoles() {
    db.query('SELECT * FROM roles', (err, results) => {
      if (err) throw err;
      console.table(results);
      employeeTracker();
    });
  }
  
  // View all employees
  function viewAllEmployees() {
    db.query('SELECT * FROM employees', (err, results) => {
      if (err) throw err;
      console.table(results);
      employeeTracker();
    });
  }
  
// Add a department
function addDepartment() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?'
      }
    ]).then((answers) => {
      db.query('INSERT INTO departments SET ?', { name: answers.departmentName }, (err, results) => {
        if (err) throw err;
        console.log('Department added.');
        employeeTracker();
      });
    });
  }
  
// Add a role
function addRole() {
    db.query('SELECT * FROM departments', (err, results) => {
      if (err) throw err;
      inquirer.prompt([
        {
          type: 'input',
          name: 'roleTitle',
          message: 'What is the title of the role?'
        },
        {
          type: 'input',
          name: 'roleSalary',
          message: 'What is the salary of the role?'
        },
        {
          type: 'list',
          name: 'departmentId',
          message: 'Which department does the role belong to?',
          choices: results.map(department => ({ name: department.name, value: department.dept_id }))
        }
      ]).then((answers) => {
        db.query('INSERT INTO roles SET ?', {
          title: answers.roleTitle,
          salary: answers.roleSalary,
          dept_id: answers.departmentId
        }, (err, results) => {
          if (err) throw err;
          console.log('Role added.');
          employeeTracker();
        });
      });
    });
  }
  
  // Add an employee
  function addEmployee() {
    db.query('SELECT * FROM roles', (err, results) => {
      if (err) throw err;
      inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'What is the employee\'s first name?'
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'What is the employee\'s last name?'
        },
        {
          type: 'list',
          name: 'roleId',
          message: 'What is the employee\'s role?',
          choices: results.map(role => ({ name: role.title, value: role.role_id }))
        }
      ]).then((answers) => {
        db.query('SELECT * FROM employees', (err, results) => {
          if (err) throw err;
          inquirer.prompt([
            {
              type: 'list',
              name: 'managerId',
              message: 'Who is the employee\'s manager?',
              choices: [{ name: 'None', value: null }].concat(
                results.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.emp_id }))
              )
            }
          ]).then((managerAnswer) => {
            db.query('INSERT INTO employees SET ?', {
              first_name: answers.firstName,
              last_name: answers.lastName,
              role_id: answers.roleId,
              manager_id: managerAnswer.managerId
            }, (err, results) => {
              if (err) throw err;
              console.log('Employee added.');
              employeeTracker();
            });
          });
        });
      });
    });
  }
  
//   // Update an employee role
//   function updateEmployeeRole() {
//     db.query('SELECT * FROM employees', (err, results) => {
//       if (err) throw err;
//       inquirer.prompt([
//         {
//           type: 'list',
//           name: 'employeeId',
//           message: 'Which employee\'s role do you want to update?',
//           choices: results.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.emp_id }))
//         }
//       ]).then((employeeAnswer) => {
//         db.query('SELECT * FROM roles', (err, results) => {
//           if (err) throw err;
//           inquirer.prompt([
//             {
//               type: 'list',
//               name: 'roleId',
//               message: 'What is the employee\'s new role?',
//               choices: results.map(role => ({ name: role.title, value: role.role_id }))
//             }

function updateEmployeeRole() {
    db.query('SELECT * FROM employees', (err, results) => {
      if (err) throw err;
      inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Which employee role do you want to update?',
          choices: results.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.emp_id }))
        }
      ]).then((employeeAnswer) => {
        db.query('SELECT * FROM roles', (err, results) => {
          if (err) throw err;
          inquirer.prompt([
            {
              type: 'list',
              name: 'roleId',
              message: 'What is the employee\'s new role?',
              choices: results.map(role => ({ name: role.title, value: role.role_id }))
            }
          ]).then((roleAnswer) => {
            db.query('UPDATE employees SET role_id = ? WHERE emp_id = ?', [roleAnswer.roleId, employeeAnswer.employeeId], (err, results) => {
              if (err) throw err;
              console.log('Employee role updated.');
              employeeTracker();
            });
          });
        });
      });
    });
  }
  
  // Remove an employee
function removeEmployee() {
    db.query('SELECT * FROM employees', (err, results) => {
      if (err) throw err;
      inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Which employee do you want to remove?',
          choices: results.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.emp_id }))
        }
      ]).then((answers) => {
        db.query('DELETE FROM employees WHERE ?', { emp_id: answers.employeeId }, (err, results) => {
          if (err) throw err;
          console.log('Employee removed.');
          employeeTracker();
        });
      });
    });
  }
  