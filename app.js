const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require('inquirer');
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
let employees = [];

const managerEntry = (name, id, email) => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'officeNumber',
      message: 'Enter managers office Number',
    },
  ])
    .then((managerEntry) => {
      let manager = new Manager(name, id, email, managerEntry.officeNumber)
      employees.push(manager);
      return inquirer.prompt([
        {
          type: 'confirm',
          name: 'addEmpolyee',
          message: 'Add another employee?',
        },
      ])
        .then((addEmpolyee) => {
          if (addEmpolyee.addEmpolyee == true) {
            employeeEntry();
          } else {
            writeToFile(employees);
          }
        })
    })
};

const internEntry = (name, id, email) => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'school',
      message: 'Enter interns school name',
    },
  ])
    .then((internEntry) => {
      let intern = new Intern(name, id, email, internEntry.school)
      employees.push(intern);
      return inquirer.prompt([
        {
          type: 'confirm',
          name: 'addEmpolyee',
          message: 'Add another employee?',
        },
      ])
        .then((addEmpolyee) => {
          if (addEmpolyee.addEmpolyee == true) {
            employeeEntry();
          } else {
            writeToFile(employees);
          }
        })
    })
};

const engineerEntry = (name, id, email) => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'github',
      message: 'Enter engineers github',
    },
  ])
    .then((engineerEntry) => {
      let engineer = new Engineer(name, id, email, engineerEntry.github)
      employees.push(engineer);
      return inquirer.prompt([
        {
          type: 'confirm',
          name: 'addEmpolyee',
          message: 'Add another employee?',
        },
      ])
        .then((addEmpolyee) => {    
          if (addEmpolyee.addEmpolyee == true) {
            employeeEntry();
          } else {
            writeToFile(employees);
          }
        })
    })
};


const employeeEntry = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter employee name',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What employee contact email? (Required)',
    },
    {
      type: 'input',
      name: 'id',
      message: 'Enter ID (Required)',
    },
    {
      type: 'checkbox',
      name: 'role',
      message: "What is employee's role (Required)",
      choices: ['Manager', 'Engineer', 'Intern'],
    },

  ])
    .then((employeeEntry) => {
      const currentEmp = employeeEntry;
      switch (currentEmp.role[0]) {
        case 'Manager':
          managerEntry(currentEmp.name, currentEmp.id, currentEmp.email);
          break;
        case 'Engineer':
          engineerEntry(currentEmp.name, currentEmp.id, currentEmp.email);
          break;
        case 'Intern':
          internEntry(currentEmp.name, currentEmp.id, currentEmp.email);
          break;
      }
    })
};

employeeEntry();

function writeToFile(html) {
  fs.writeFileSync(outputPath, render(html), 'utf-8');
}