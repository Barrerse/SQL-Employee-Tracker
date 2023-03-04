const inquirer = require('inquirer');
// Uses mySQL2 promise version 
const mysql = require('mysql2/promise');

require('dotenv').config();


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employeeDB',
  });


  // simple code to test if inquirer and the server are working properly

  async function addEmployee() {
    const answers = await inquirer.prompt([
      {
        name: 'firstName',
        message: 'Enter the employee\'s first name:',
      },
      {
        name: 'lastName',
        message: 'Enter the employee\'s last name:',
      },
      {
        name: 'role',
        message: 'Enter the employee\'s role ID:',
      },
      {
        name: 'manager',
        message: 'Enter the employee\'s manager ID:',
      },
    ]);
    const { firstName, lastName, role, manager } = answers;
    const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const result = await connectionPool.execute(query, [firstName, lastName, role, manager]);
    console.log('Employee added successfully!');
    start();
  }
  