const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

class Questions {
    constructor() {

    }

    teamChoices(){
        inquirer
        .prompt([
            {
                type: "list",
                message: "Which type of team member would you like to add?",
                choices: ["Engineer", "Intern", "I don't want to add any more team members"],
                name: "teamMember",
            },
        ])
        .then(({ teamMember }) => {
            if (teamMember === "Engineer") {
                this.engineerChoice();
            } else if (teamMember === "Intern"){
                this.internChoice();
            } else if (teamMember === "I don't want to add any more team members"){
                this.endChoices();
            };
        });
    }

    managerChoice() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the team manager's name?",
                    name: "name",

                },
                {
                    type: "input",
                    message: "What is the team manager's id?",
                    name: "id",
                },
                {
                    type: "input",
                    message: "What is the team manager's email?",
                    name: "email",
                },
                {
                    type: "input",
                    message: "What is the team manager's office number?",
                    name: "office",
                },
            ])
            .then((response) => {
                this.teamChoices();
            });
    }

    engineerChoice() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is your engineer's name?",
                    name: "name",
                },
                {
                    type: "input",
                    message: "What is your engineer's id?",
                    name: "id",
                },
                {
                    type: "input",
                    message: "What is your engineer's email?",
                    name: "email",
                },
                {
                    type: "input",
                    message: "What is your engineer's Github username?",
                    name: "github",
                }
            ])
            .then((response) => {
                this.teamChoices();
            });
    }

    internChoice() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is your intern's name?",
                    name: "name",
                },
                {
                    type: "input",
                    message: "What is your intern's id?",
                    name: "id",
                },
                {
                    type: "input",
                    message: "What is your intern's email?",
                    name: "email",
                },
                {
                    type: "input",
                    message: "What is your intern's school?",
                    name: "school",
                },
            ])
            .then((response) => {
                this.teamChoices();
            });
    }

    endChoices(){
        console.log("\nThank you!");
    }
}

const questions = new Questions();
questions.managerChoice();
