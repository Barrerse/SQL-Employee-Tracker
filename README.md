# Employee Tracker

## Description

Employee Tracker is a command-line application that allows the user to manage employees, departments, and roles in a company. The application uses MySQL to store and retrieve data, and inquirer.js to prompt the user for input.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Features](#features)
* [Screenshots](#screenshots)
* [License](#license)

## Installation

To install the necessary dependencies, run:

```
npm install
```

Create a .env file in the root directory of your project and update it with your MySQL username and password.

```
DB_USER=root
DB_PASSWORD=password
DB_NAME=employee_trackerDB
DB_HOST=localhost
DB_PORT=3306
```


## Usage

To start the application, run:

```
node server.js
```

You will be presented with the following options:

* View all departments
* View all roles
* View all employees
* Add a department
* Add a role
* Add an employee
* Update an employee role

Select an option by entering the corresponding number.

## Features

- **View all departments**: This option will display a formatted table showing department names and department IDs.
- **View all roles**: This option will display a formatted table showing job titles, role IDs, the department that role belongs to, and the salary for that role.
- **View all employees**: This option will display a formatted table showing employee data, including employee IDs, first names, last names, job titles, departments, salaries, and managers that the employees report to.
- **Add a department**: This option will prompt you to enter the name of the department you want to add. Once you enter the department name, it will be added to the database.
- **Add a role**: This option will prompt you to enter the name, salary, and department for the role you want to add. Once you enter the role information, it will be added to the database.
- **Add an employee**: This option will prompt you to enter the employee's first name, last name, role, and manager. Once you enter the employee information, it will be added to the database.
- **Update an employee role**: This option will prompt you to select an employee to update and their new role. Once you enter the updated information, it will be updated in the database.

## Screenshots 

![1](https://user-images.githubusercontent.com/108836644/222935960-6bf7dcf7-82ab-447a-a1b8-94b622678405.PNG)


## Video 

![Video_Example](https://link.to.your.video/preview.gif)

See an example of the application working:

![Employee Tracker Demo](https://example.com/employee-tracker-demo.gif)



## License

MIT 
