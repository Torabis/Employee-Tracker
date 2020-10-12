// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const conTable = require("console.table");

// MySql db connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "sadegh",

  password: "sadegh",
  database: "employee_DB",
});

// Initiate mysql connection
connection.connect(function (err) {
  if (err) throw err;
  console.log(`EMPLOYEE TRACKER!`);
  mainMenu();
});

//initial prompt
function mainMenu() {
  inquirer
    .prompt({
      name: "userAction",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all the roles",
        "View all the departments",
        "View all employees",
        "Add employee",
        "Add role",
        "Add department",
        "Update employee role",
        "Quit",
      ],
    })
    .then((userAnswer) => {
      switch (userAnswer.userAction) {
        case "View all the roles":
          viewAllRoles();
          break;

        case "View all the departments":
          viewAllDepartments();
          break;

        case "View all employees":
          viewAllEmployees();
          break;

        case "View all employees by department":
          viewAllEmpByDepartment();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "Add department":
          addDept();
          break;

        case "Add role":
          addRole();
          break;

        case "Update employee role":
          updateEmpRole();
          break;

        case "Quit":
          connection.end();
      }
    });

  
}
