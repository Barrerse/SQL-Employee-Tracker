const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'employeeDB'
});

// Test database connection
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database.');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Define routes
app.get('/', (req, res) => {
  // Query database
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/add-employee', (req, res) => {
  // Use inquirer to get user input
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the employee\'s first name:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the employee\'s last name:'
    },
    {
      type: 'input',
      name: 'role',
      message: 'Enter the employee\'s role ID:'
    },
    {
      type: 'input',
      name: 'manager',
      message: 'Enter the employee\'s manager ID:'
    }
  ]).then((answers) => {
    // Insert new employee into database
    const { firstName, lastName, role, manager } = answers;
    const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    db.query(query, [firstName, lastName, role, manager], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
});

