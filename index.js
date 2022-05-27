const inquirer = require("inquirer");
const connection = require("./connection.js");
const cTable = require("console.table");
const { connect } = require("./connection.js");

connection.connect(function (err) {
  if (err) {
    throw err;
    console.log("Thread ID connection: " + connection.threadId);
    work();
  }
  //   put init function here
});

const work = () => {
  inquirer
    .prompt([
      {
        name: "choice",
        type: "list",
        message: "What?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a new department",
          "Add a new role",
          "Add a new employee",
          "Update employee role",
          "Delete Department",
          "Delete Role",
          "Delete Employee",
          "Exit",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.choice) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a new department":
          addDepartment();
          break;
        case "Add a new role":
          addRole();
          break;
        case "Add a new employee":
          addEmployee();
          break;
        case "Update employee role":
          updateEmployeeRole();
          break;
        case "Delete Department":
          deleteDepartment();
          break;
        case "Delete Role":
          deleteRole();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
        case "exit":
          connection.end();
          break;
      }
    });
};

const viewAllDepartments = () => {
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    console.table(res);
    work();
  });
};

const viewAllRoles = () => {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    console.table(res);
    work();
  });
};

const viewAllEmployees = () => {
  connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    console.table(res);
    work();
  });
};

const addDepartment = () => {
  connection.query("SELECT * departments", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "department",
          type: "input",
          message: "Add Department Name: ",
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO departments SET ?",
          {
            name: answer.department,
          },
          function (err) {
            if (err) throw err;
            console.log("Success!");
            work();
          }
        );
      });
  });
};

const addrole = () => {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the role title? ",
        },
        {
          name: "salary",
          type: "input",
          message: "How much does this role pay?: ",
        },
        {
          name: "department_id",
          type: "input",
          message: "What is the department ID?: ",
        },
      ])
      .then(function (answer) {
        connection.query("INSERT INTO roles SET ?", {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id,
        });
      });
  });
};

const addEmployee = () => {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "Enter employee first name: ",
        },
        {
          name: "last_name",
          type: "input",
          message: "Enter employee last name: ",
        },
        {
          name: "role_id",
          type: "list",
          message: "What is the employee role id? ",
          choices: res.map((role) => role.title),
        },
      ])
      .then(function (answer) {
        const roleId = res.find((role) => role.title === answer.role_id).id;
        connection.query(
          "INSERT INTO employees SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: roleId,
          },
          function (err) {
            if (err) throw err;
            console.log("Employee added!");
            work();
          }
        );
      });
  });
};
