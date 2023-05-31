const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "Junebuggy!",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

class Executable {
  
  initialize() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'menu',
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
      .then((response) => {
          switch (response) {
            case "View all Employees":
              this.getEmployees();
              break;
          
            case "View all Departments":
              this.getDepartment();
              break;
            case "View all Roles":
              this.getRoles();
              break;
            case "Add an Employee":
              this.addEmployee();
              break;
            case "Add a Department":
              this.addDepartment();
              break;
            case "Add a Role":
              this.addRole();
              break;
            case "Update Employee Role":
              this.updateEmployee();
              break;
            case "Exit":
            console.info('Bye Now!');
          break;
        }
      });
  }

  getEmployees() {
    console.log("Getting all employees");
    const sql = `SELECT * FROM employees`;

    db.query(sql, function (err, res) {
      if (err) {
          return;
      } else {
        res.json({
          message: "Employee List",
          data: res.body,
        });
      }
      initialize();
    });
  }

  getRoles() {
    const sql = `SELECT * FROM roles`;

    db.query(sql, function (err, results) {
      if (err) {
        return;
      } else {
        res.json({
          message: "Roles List",
          data: results,
        });
      }
      initialize();
    });
  }

  getDepartment() {
    const sql = `SELECT * FROM department`;

    db.query(sql, function (err, results) {
      if (err) {
        return;
      } else {
        res.json({
          message: "Employee List",
          data: results,
        });
      }
      this.initialize();
    });
  }

  addEmployee() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: "first_name",
          message: "Enter first name.",
        },
        {
          type: 'input',
          name: "last_name",
          message: "Enter last name.",
        },
        {
          type: 'input',
          name: "role_id",
          message: "Enter role.",
        },
        {
          type: 'input',
          name: "manager_id",
          message: "Enter manager.",
        },
      ])
      .then((response) => {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`;
        const first_name = [response.first_name];
        const last_name = [response.last_name];
        const role_id = [response.role_id];
        const manager_id = [response.manager_id];

        db.query(
          sql,
          first_name,
          last_name,
          role_id,
          manager_id,
          function (err, results) {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            } else {
              res.json({
                message: "Employee Created",
                data: results,
              });
            }
          }
        );
        
      })
      this.initialize();
  }

  addDepartment() {
    inquirer
    .prompt([
      {
        type: 'input',
        name: newDepartment,
        message: "Enter New Department Name."
      }
    ]).then((response) => {
      const sql = `INSERT INTO department (dept_name)
      VALUES(?)`;
      const dept_name = response;
      db.query(sql, dept_name, function (err, results) {
        if (err) {
          res.status(500).json({ error: err.message });
              return;
        } else {
          res.json({
            message: "New Department Created",
            data: results,
          });
        };
      });
    });
    this.initialize();
  };

  addRole() {

  }

  updateEmployee() {

  }
}

module.exports = Executable;
