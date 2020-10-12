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
// View all role
  function viewAllRoles() {
    const query = "SELECT * FROM roles";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      mainMenu();
    });
  }
// View all departments
  function viewAllDepartments() {
    const query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      mainMenu();
    });
  }
// View all employees
  function viewAllEmployees() {
    const query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
      console.table(res);
      mainMenu();
    });
  }
// Add employee prompt
  function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the first name of the employee?",
          name: "firstName",
        },
        {
          type: "input",
          message: "What is the last name of the employee?",
          name: "lastName",
        },
        {
          type: "input",
          message: "What is the employees role id number?",
          name: "roleID",
        },
        {
          type: "input",
          message: "What is the manager id number?",
          name: "managerID",
        },
      ])
      .then(function (answer) {
        let query = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${answer.roleID}, ${answer.managerID})`;
        if (answer.managerID === "") {
          query = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${answer.roleID}, null)`;
        }
        connection.query(query, function (err, res) {
          if (err) throw err;
          console.table(res);
          mainMenu();
        });
      });
  }
// Add department prompt
  function addDept() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the department you would like to add?",
          name: "departmentName",
        },
      ])
      .then((answer) => {
        connection.query(
          "INSERT INTO department (name) VALUES (?)",
          [answer.departmentName],
          function (err, res) {
            if (err) throw err;
            console.table(res);
            mainMenu();
          }
        );
      });
  }
// Add role prompt
  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the role?",
          name: "roleName",
        },
        {
          type: "input",
          message: "What is the salary for the role?",
          name: "salaryTotal",
        },
        {
          type: "input",
          message: "What is the department id number?",
          name: "departmentID",
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
          [answer.roleName, answer.salaryTotal, answer.departmentID],
          function (err, res) {
            if (err) throw err;
            console.table(res);
            mainMenu();
          }
        );
      });
  }
// Update employee role
function updateEmpRole() {
    let employeeArray = [];
    let roleArray = [];
    connection.query("SELECT id as ID,title FROM roles ORDER BY title ASC", function (
      err,
      res
    ) {
      if (err) throw err;
      for (i = 0; i < res.length; i++) {
        roleArray.push(res[i].ID+", "+res[i].title);
      }
      connection.query(
        "SELECT employee.id as ID, concat(employee.first_name, employee.last_name) AS Employee FROM employee ORDER BY employee ASC",
        function (err, res) {
          if (err) throw err;
          for (i = 0; i < res.length; i++) {

            employeeArray.push(res[i].ID+", "+res[i].Employee);
          }
          inquirer
            .prompt([
              {
                name: "role",
                type: "list",
                message: "What is this new role?",
                choices: roleArray,
              },
              {
                name: "employee",
                type: "list",
                message: "What employee would you like to edit?",
                choices: employeeArray,
              },
            ])
            .then((answer) => {
              // console.log(answer);
              connection.query(
                `UPDATE employee SET roles_id = ${answer.role.split(", ")[0]} WHERE id = "${answer.employee}"`
              );
              mainMenu();
            })
            .catch((err) => console.log(err));
        }
      );
    });
  }
}
