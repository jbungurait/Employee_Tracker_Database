const router = require("express").Router();
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "Junebuggy!",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

app.get("/emplyees", (req, res) => {
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
});

app.

module.exports = router;
