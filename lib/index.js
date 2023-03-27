const mysql = require("mysql2");
const inquirer = require('inquirer');

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

getEmployess() {
  const sql = `SELECT id, last_name, first_name as title FROM employees`;

  db.query(sql, function (err, results) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    } else {
      res.json({
        message: "Employee List",
        data: results,
      });
    }
  });
};

getRoles() {
    const sql = `SELECT id, title, salary, department_id as title FROM role`;
  
    db.query(sql, function (err, results) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      } else {
        res.json({
          message: "Roles List",
          data: results,
        });
      }
    });
  };

 getDepartment() {
    const sql = `SELECT id, dept_name as title FROM department`;
  
    db.query(sql, function (err, results) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      } else {
        res.json({
          message: "Employee List",
          data: results,
        });
      }
    });
  };

addEmployee() {
inquirer
  .prompt([
    {
      type: input,
      name: 'first_name',
      message: 'Enter first name.',
    },
    {
      type: input,
      name: 'last_name',
      message: 'Enter last name.',
    },
    {
      type: input,
      name: 'role_id',
      message: 'Enter role.'
    },
    {
      type: input,
      name: 'manager_id',
      message: 'Enter manager.',
    },
  ]).then( (response) => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`;
        const first_name = [response.first_name];
        const last_name = [response.last_name];
        const role_id = [response.role_id];
        const manager_id = [response.manager_id];

    db.query(sql, first_name, last_name, role_id, manager_id, function (err, results) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      } else {
        res.json({
          message: "Employee Created",
          data: results,
        });
      }
    });
  });
  };


  
}

module.exports = Executable;