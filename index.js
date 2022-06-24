const inquirer = require("inquirer");
const connection = require("./connection.js");
const cTable = require("console.table");
// const { connect } = require("./connection.js");

connection.connect(function (err) {
  if (err) {
    throw err;
  }
  //   put init function here
  console.log(`Thread ID connection: ${connection.threadId} `);
  task();
});

const task = () => {
  inquirer
    .prompt([
      {
        name: "choice",
        type: "list",
        message: "Please choose from the following list: ",
        choices: [
          "View departments ",
          "View roles ",
          "View employees ",
          "Add department ",
          "Add role ",
          "Add employee ",
          "Update employee role ",
          "Remove department ",
          "Delete role ",
          "Remove employee ",
          "Exit application ",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.choice) {
        case "View departments ":
          viewDepartments();
          break;
        case "View roles ":
          viewRoles();
          break;
        case "View employees ":
          viewEmployees();
          break;
        case "Add department ":
          addDepartment();
          break;
        case "Add role ":
          addRole();
          break;
        case "Add employee ":
          addEmployee();
          break;
        case "Update employee role ":
          updateRole();
          break;
        case "Remove department ":
          removeDepartment();
          break;
        case "Delete role ":
          deleteRole();
          break;
        case "Remove employee ":
          removeEmployee();
          break;
        case "Exit application ":
          connection.end();
          break;
      }
    });
};

const viewDepartments = () => {
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;

    console.table(res);
    task();
  });
};

const viewRoles = () => {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;

    console.table(res);
    task();
  });
};

const viewEmployees = () => {
  connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;

    console.table(res);
    task();
  });
};

const addDepartment = () => {
  connection.query("SELECT * FROM departments", function (err, res) {
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
            task();
          }
        );
      });
  });
};

const addRole = () => {
  connection.query("SELECT * FROM departments", function (err, res) {
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
          type: "list",
          message: "What is the department ID?: ",
          choices: res.map((department) => department.name),
        },
      ])
      .then(function (answer) {
        const departmentName = res.find(
          (department) => department.name === answer.department_id
        );

        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            department_id: departmentName.id,
          },

          function (err) {
            if (err) throw err;
            console.log("Role added.");
            task();
          }
        );
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
            task();
          }
        );
      });
  });
};

const updateRole = () => {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the first name of the employee? ",
          answer: res.map((employee) => employee.first_name),
        },
        {
          name: "role_id",
          type: "list",
          message: "What is the new role being assigned to the employee? ",
          choices: res.map((role) => role.title),
        },
      ])
      .then(function (answer) {
        const roleId = res.find((role) => role.title === answer.role_id).id;

        connection.query(
          "UPDATE employees SET ? WHERE ?",
          [
            {
              role_id: roleId,
            },
            {
              first_name: answer.firstName,
            },
          ],
          function (err) {
            if (err) throw err;
            console.log("Role updated!");
            task();
          }
        );
      });
  });
};

const removeDepartment = () => {
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "department",
          type: "input",
          message: "Which department would you like to remove? ",
          answer: res.map((department) => department.name),
        },
      ])
      .then(function (answer) {
        connection.query(
          "DELETE FROM departments WHERE ?",
          {
            name: answer.department,
          },
          function (err) {
            if (err) throw err;
            console.log("Department removed. ");
            task();
          }
        );
      });
  });
};

const deleteRole = () => {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "roles",
          type: "input",
          message: "Which role would you like to remove? ",
          answer: res.map((roles) => roles.title),
        },
      ])
      .then(function (answer) {
        connection.query(
          "DELETE FROM roles WHERE ?",
          {
            title: answer.roles,
          },
          function (err) {
            if (err) throw err;
            console.log("Role removed. ");
            task();
          }
        );
      });
  });
};

const removeEmployee = () => {
  connection.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the first name of the employee? ",
          answer: res.map((employee) => employee.first_name),
        },
        {
          name: "last_name",
          type: "input",
          message: "what is the last name of the employee? ",
          answer: res.map((employee) => employee.last_name),
        },
      ])
      .then(function (answer) {
        connection.query(
          "DELETE FROM employees WHERE ?",
          {
            first_name: answer.first_name,
          },
          function (err) {
            if (err) throw err;
            console.log("Employee deleted. ");
            task();
          }
        );
      });
  });
};
