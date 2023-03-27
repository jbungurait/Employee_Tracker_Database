const Executable = require("./lib/index");
const inquirer = require('inquirer');

const runExec = new Executable();

inquirer
    .prompt([
        {
            type: list,
            message: 'Welcome to Employee Database. What would you like to do?',
            choices: ['View all Employees', 'View all Departments', 'View all Roles', 'Add an Employee', 'Add a Department', 'Add a Role', 'Update Employee Role'],
        }
    ]).then((response) => {
        if (response === 'View all Employees') {
            runExec.getEmployess();
        } else if (response === 'View all Departments') {
            runExec.getDepartment();
        } else if (response === 'View all Roles') {
            runExec.getRoles();
        } else if (response === 'Add an Employee') {
            runExec.addEmployee();
        }
    });


