const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "Junebuggy!",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);


function initialize() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "Welcome to Employee Database. What would you like to do?",
        choices: [
          "View all Employees",
          "View all Departments",
          "View all Roles",
          "Add an Employee",
          "Add a Department",
          "Add a Role",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then(function({ menu }) {
      switch (menu) {
        case "View all Employees":
          getEmployees();
          break;

        case "View all Departments":
          getDepartment();
          break;
        case "View all Roles":
          getRoles();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Update Employee Role":
          updateEmployee();
          break;
        case "Exit":
          console.info("Bye Now!");
          break;
      }
    });
}

function getEmployees() {
  console.log("Getting all employees");

  db.query(`SELECT * FROM employees`, function (err, res) {
    if (err) {
      return err;
    } else {
      console.table(res);
      };
    initialize();
  });
}

function getRoles() {
  const sql = `SELECT * FROM roles`;

  db.query(sql, function (err, res) {
    if (err) {
      return;
    } else {
      console.table(res);
    };
    initialize();
  });
}

function getDepartment() {
  const sql = `SELECT * FROM department`;

  db.query(sql, function (err, res) {
    if (err) {
      return;
    } else {
      console.table(res);
    };
    initialize();
  });
}

function addEmployee() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's first name:",
        name: "firstName",
      },
      {
        type: "input",
        message: "Enter the employee's last name:",
        name: "lastName",
      },
      {
        type: "input",
        message: "Enter the employee's role id:",
        name: "roleId",
      },
      {
        type: "input",
        message: "Enter the employee's manager id:",
        name: "managerId",
      },
    ])
    .then((response) => {
      db.query(
        "INSERT INTO employees (first_name, last_name, role_id, manager) VALUES (?, ?, ?, ?)",
        [ response.firstName,
            response.lastName,
            response.roleId,
            response.managerId,
          ],
          function (err, results) {
            if (err) throw err;
            console.log(
              `${
                (response.firstName, response.lastName)
              } has been added successfully to the database!`
            );
            initialize();

          }
        );
      });
    };


function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "Enter New Department Name.",
      },
    ])
    .then((response) => {
      db.query(`INSERT INTO department (dept_name) VALUES (?)`, 
      [response.newDepartment], function (err, res) {
        if (err) {
          console.log(err);
        } 
        console.log("Done!");
    });
    initialize();
    });
}

function addRole() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the title:",
        name: "title",
      },
      {
        type: "input",
        message: "Enter the salary:",
        name: "salary",
      },
      {
        type: "input",
        message: "Enter the department id:",
        name: "department_id",
      },
    ])
    .then((results) => {
      db.query(
        "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
        [results.title, results.salary, results.department_id],
        function (err, results) {
          if (err) throw err;
        }
      );
      initialize();
    });
}

function updateEmployee() {
    inquirer
    .prompt([
      {
        type: "input",
        message:
          "Enter the employee ID for the employee you would like to update:",
        name: "id",
      },
      {
        type: "input",
        message: "Enter the New Role ID for the employee:",
        name: "roleId",
      },
    ])
    .then((results) => {
      db.query(
        "UPDATE employees SET role_id = ? WHERE id = ?",
        [results.roleId, results.id],
        function (err, results) {
          if (err) throw err;
        }
      );
      initialize();
    });
}

initialize();

