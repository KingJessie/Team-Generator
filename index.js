const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const team = [];

// Function to verify that the user has input 11 digits.
function checkNumber(input) {
  if (/^\d{11}$/.test(input)) {
    return true;
  } else {
    return "Please enter a valid 11-digit number.";
  }
}

function checkEmail(input) {
  if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(input)) {
    return true;
  } else {
    return "Please enter a valid email address.";
  }
}

function checkPin(input) {
  if (/^\d{5}$/.test(input)) {
    return true;
  } else {
    return "Please enter valid number";
  }
}

async function createManager() {
    const manager = await inquirer.prompt([
      {
        type: "input",
        message: "Please enter the manager's name:",
        name: "name",
      },
      {
        type: "input",
        message: "Please enter the manager's 5-digit employee ID:",
        name: "id",
        validate: checkPin,
      },
      {
        type: "input",
        message: "Please enter the manager's email address:",
        name: "email",
        validate: checkEmail,
      },
      {
        type: "input",
        message: "Please enter the manager's 11-digit office number:",
        name: "officeNumber",
        validate: checkNumber,
      },
    ]);


    const newManager = new Manager(
      manager.name,
      manager.id,
      manager.email,
      manager.officeNumber
    );
  
    team.push(newManager);
  
    createTeam();
  };
  
  createManager()

async function createEngineer() {
  const engineer = await inquirer.prompt([
    {
      type: "input",
      message: "Please enter the engineer's name:",
      name: "name",
    },
    {
      type: "input",
      message: "Please enter the engineer's 5-digit employee ID:",
      name: "id",
      validate: checkPin,
    },
    {
      type: "input",
      message: "Please enter the engineer's email address:",
      name: "email",
      validate: checkEmail,
    },
    {
      type: "input",
      message: "Please enter the engineer's GitHub username:",
      name: "github",
    },
  ]);

  const newEngineer = new Engineer(
    engineer.name,
    engineer.id,
    engineer.email,
    engineer.github
  );

  team.push(newEngineer);

  await createTeam();
}


async function createIntern() {
    const intern = await inquirer.prompt([
      {
        type: "input",
        message: "Please enter the intern's name:",
        name: "name",
      },
      {
        type: "input",
        message: "Please enter the intern's 5-digit employee ID:",
        name: "id",
        validate: checkPin,
      },
      {
        type: "input",
        message: "Please enter the intern's email address:",
        name: "email",
        validate: checkEmail,
      },
      {
        type: "input",
        message: "Please enter the intern's school:",
        name: "school",
      },
    ]);
  
    const newIntern = new Intern(
      intern.name,
      intern.id,
      intern.email,
      intern.school
    );
  
    team.push(newIntern);
  
    await createTeam();
  }
  
  async function createTeam() {
    const { choice } = await inquirer.prompt([
      {
        type: "list",
        message: "Please choose the next team member to add:",
        name: "choice",
        choices: ["Engineer", "Intern", "Finish building team"],
      },
    ]);
  
    switch (choice) {
      case "Engineer":
        await createEngineer();
        break;
  
      case "Intern":
        await createIntern();
        break;
  
      default:
        generateHTML();
        break;
    }
  }
  
  async function generateHTML() {
    const html = render(team);
    await fs.promises.writeFile(outputPath, html);
    console.log(`File successfully generated at ${outputPath}`);
  }
  
  