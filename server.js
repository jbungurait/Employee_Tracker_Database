const express = require("express");
const routes = require("./routes");
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
