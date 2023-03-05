const mysql = require("mysql");
const inquirer = require("inquirer");


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

  console.log(`
   _____                _                        
  |  ___|              | |                       
  | |__ _ __ ___  _ __ | | ___  _   _  ___  ___  
  |  __| '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\ 
  | |__| | | | | | |_) | | (_) | |_| |  __|  __/ 
  \\____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___| 
                 | |             __/ |           
                 |_|            |___/            
   _____              _                          
  |_   _|            | |                         
    | |_ __ __ _  ___| | _____ _ __              
    | | '__/ _\` |/ __| |/ / _\` | '__|             
    | | | | (_| | (__|   |  __| |                
    \\_|_|  \\__,_|\\___|_|\\_\\___|_|                
  `);

  employeeTracker();
});

// function which prompts the user for what action they should take
function employeeTracker() {
  inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "Would you like to do?",
      choices: [
        "View Employees",
        "View Employees by Department",
        "Add Employee",
        "Remove Employees",
        "Update Employee Role",
        "Add Role",
        "End"
      ]
    })
    .then(function ({ task }) {
      switch (task) {
        case "View Employees":
          viewEmployee();
          break;

        case "View Employees by Department":
          viewEmployeeByDepartment();
          break;
      
        case "Add Employee":
          addEmployee();
          break;
        // ...
      }
    });
}

//View Employees/ READ all, SELECT * FROM
function viewEmployee() {
    console.log("Viewing employees\n");
  
    var query =
      `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
    ON m.id = e.manager_id`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
      console.log("Employees viewed!\n");
  
      firstPrompt();
    });
  
}

//"View Employees by Department" / READ by, SELECT * FROM
// Make a department array
function viewEmployeeByDepartment() {
    console.log("Viewing employees by department\n");
  
    var query =
      `SELECT d.id, d.name, r.salary AS budget
    FROM employee e
    LEFT JOIN role r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      const departmentChoices = res.map(data => ({
        value: data.id, name: data.name
      }));
  
      console.table(res);
      console.log("Department view succeed!\n");
  
      promptDepartment(departmentChoices);
    });
  }
  
  // User choose the department list, then employees pop up
  function promptDepartment(departmentChoices) {
  
    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Which department would you choose?",
          choices: departmentChoices
        }
      ])
      .then(function (answer) {
        console.log("answer ", answer.departmentId);
  
        var query =
          `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
    FROM employee e
    JOIN role r
    ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    WHERE d.id = ?`
  
        connection.query(query, answer.departmentId, function (err, res) {
          if (err) throw err;
  
          console.table("response ", res);
          console.log(res.affectedRows + "Employees are viewed!\n");
  
          firstPrompt();
        });
      });
  }

  // Add Employee / CREATE, INSERT INTO
function addEmployee() {
    console.log("Adding new employee\n");
  
    var query =
      `SELECT r.id, r.title, r.salary 
      FROM role r`
    db.query(query, function (err, res) {
      if (err) throw err;
  
      const roleChoices = res.map(({ id, title, salary }) => ({
        value: id, title: `${title}`, salary: `${salary}`
      }));
  
      console.table(res);
      console.log("RoleToInsert!\n");
  
      promptInsert(roleChoices);
    });
  }
  
  // Prompts to insert the data into table
  function promptInsert(roleChoices) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?"
        },
        {
          type: "list",
          name: "roleId",
          message: "What is the employee's role?",
          choices: roleChoices
        },
        {
          type: "list",
          name: "managerId",
          message: "Who is the employee's manager?",
          choices: getManagerChoices()
        }
      ])
      .then(function (answer) {
        console.log(answer);
  
        var query = `INSERT INTO employee SET ?`
        // when finished prompting, insert a new item into the db with that info
        db.query(query,
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            manager_id: answer.managerId,
            role_id: answer.roleId,
          },
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log(res.affectedRows + "Employee added!\n");
  
            firstPrompt();
          });
      });
  }
  
  // Get managers for choices
  function getManagerChoices() {
    var query =
      `SELECT id, first_name, last_name 
      FROM employee`
    db.query(query, function (err, res) {
      if (err) throw err;
  
      const managerChoices = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${first_name} ${last_name}`
      }));
  
      console.table(res);
      console.log("ManagerChoices!\n");
  
      return managerChoices;
    });
  }
  
  function addEmployee() {
    const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`;
  
    const employee = promptEmployee();
    const params = [employee.firstName, employee.lastName, employee.roleId, employee.managerId];
  
    // declare connection object before using it
    const connection = mysql.createConnection(dbConfig);
    connection.query(query, params, function (err, res) {
      if (err) throw err;
      console.log(`${employee.firstName} ${employee.lastName} added to database!\n`);
      connection.end();
      startApp();
    });
  }
  
  
  function promptInsert(roleChoices) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?"
        },
        {
          type: "list",
          name: "roleId",
          message: "What is the employee's role?",
          choices: roleChoices
        },
      ])
      .then(function (answer) {
        console.log(answer);
  
        var query = `INSERT INTO employee SET ?`
        connection.query(query,
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.roleId,
            manager_id: answer.managerId,
          },
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log(res.insertedRows + "Inserted successfully!\n");
  
            firstPrompt();
          });
      });
  }
  
  function removeEmployees() {
    console.log("Deleting an employee");
  
    var query =
      `SELECT e.id, e.first_name, e.last_name
      FROM employee e`;
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${id} ${first_name} ${last_name}`
      }));
  
      console.table(res);
      console.log("ArrayToDelete!\n");
  
      promptDelete(deleteEmployeeChoices);
    });
  }
  
  function viewEmployeeByDepartment() {
    console.log("Viewing employees by department\n");
  
    var query =
      `SELECT d.id, d.name, r.salary AS budget
      FROM employee e
      LEFT JOIN role r
      ON e.role_id = r.id
      LEFT JOIN department d
      ON d.id = r.department_id
      GROUP BY d.id, d.name`;
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      const departmentChoices = res.map(data => ({
        value: data.id, name: data.name
      }));
  
      console.table(res);
      console.log("Department view succeed!\n");
  
      promptDepartment(departmentChoices);
    });
  }
  
  function promptDepartment(departmentChoices) {

    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Which department would you choose?",
          choices: departmentChoices
        }
      ])
      .then(function (answer) {
        console.log("answer ", answer.departmentId);
  
        var query =
          `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
  FROM employee e
  JOIN role r
  ON e.role_id = r.id
  JOIN department d
  ON d.id = r.department_id
  WHERE d.id = ?`
  
        connection.query(query, answer.departmentId, function (err, res) {
          if (err) throw err;
  
          console.table("response ", res);
          console.log(res.affectedRows + "Employees are viewed!\n");
  
          firstPrompt();
        });
      });
  }

  function updateEmployeeRole() {
    // Fetch employee and role data from the database
    employeeArray();
  }
  
  function employeeArray() {
    console.log("Updating an employee");
  
    // Query to fetch employee data with their current role information
    var query =
      `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    JOIN role r
      ON e.role_id = r.id
    JOIN department d
      ON d.id = r.department_id
    JOIN employee m
      ON m.id = e.manager_id`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      // Create an array of employee choices for the prompt
      const employeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${first_name} ${last_name}`
      }));
  
      console.table(res);
      console.log("employeeArray To Update!\n")
  
      // Call the roleArray function and pass in the employee choices
      roleArray(employeeChoices);
    });
  }
  
  function roleArray(employeeChoices) {
    console.log("Updating a role");
  
    // Query to fetch all available roles
    var query =
      `SELECT r.id, r.title, r.salary 
    FROM role r`
    let roleChoices;
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      // Create an array of role choices for the prompt
      roleChoices = res.map(({ id, title, salary }) => ({
        value: id, title: `${title}`, salary: `${salary}`
      }));
  
      console.table(res);
      console.log("roleArray to Update!\n")
  
      // Call the promptEmployeeRole function and pass in the employee and role choices
      promptEmployeeRole(employeeChoices, roleChoices);
    });
  }
  
  function promptEmployeeRole(employeeChoices, roleChoices) {
    // Prompt the user to select an employee and a new role
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee do you want to set with the role?",
          choices: employeeChoices
        },
        {
          type: "list",
          name: "roleId",
          message: "Which role do you want to update?",
          choices: roleChoices
        },
      ])
      .then(function (answer) {
  
        // Update the selected employee's role in the database
        var query = `UPDATE employee SET role_id = ? WHERE id = ?`
        connection.query(query,
          [answer.roleId,
          answer.employeeId
          ],
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log(res.affectedRows + "Updated successfully!");
  
            firstPrompt();
          });
      });
  }
  
  async function promptAddRole(departments) {
    // Prompt the user for the new role information
    const { title, salary, department } = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the new role?",
      },
      {
        type: "number",
        name: "salary",
        message: "What is the salary for the new role?",
      },
      {
        type: "list",
        name: "department",
        message: "Which department does the new role belong to?",
        choices: departments,
      },
    ]);
  
    // Insert the new role into the database
    await db.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [title, salary, department]
    );
    console.log(`\nAdded ${title} to the database\n`);
  }
  
  function exitApp() {
    console.log("Exiting employee management system.");
    connection.end();
    process.exit();
  }
  