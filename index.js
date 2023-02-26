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
        this.responses = [];
    }

    getResponses(){
        return this.responses;
    }

    // Let the user choose team member or ends the app
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

    // Logs questions of manager member
    managerChoice() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the team manager's name?",
                    name: "name",
                    validate: name => {
                        if (name){
                            return true;
                        } else {
                            console.log("\nManager's name MUST be added!");
                        }
                    }

                },
                {
                    type: "number",
                    message: "What is the team manager's id?",
                    name: "id",
                    validate: id => {
                        if(id){
                            return true;
                        } else {
                            console.log("\nEnter a valid number");
                            return false;
                        }
                    }
                },
                {
                    type: "input",
                    message: "What is the team manager's email?",
                    name: "email",
                    validate: email =>{
                        if(email){
                            return true;
                        } else console.log("\nEmail MUST be added");
                    }
                },
                {
                    type: "input",
                    message: "What is the team manager's office number?",
                    name: "officeNumber",
                },
            ])
            .then(response => {
                const managerResponses = new Manager(response.name, response.id, response.email, response.officeNumber)
                this.responses.push(managerResponses);
                this.teamChoices();
            });
    }

    // Logs questions of engineer member
    engineerChoice() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is your engineer's name?",
                    name: "name",
                    validate: name => {
                        if (name){
                            return true;
                        } else {
                            console.log("\nEngineer's name MUST be added!");
                        }
                    }
                },
                {
                    type: "number",
                    message: "What is your engineer's id?",
                    name: "id",
                    validate: id => {
                        if(id){
                            return true;
                        } else {
                            console.log("\nEnter a valid number");
                            return false;
                        }
                    }
                },
                {
                    type: "input",
                    message: "What is your engineer's email?",
                    name: "email",
                    validate: email =>{
                        if(email){
                            return true;
                        } else console.log("\nEmail MUST be added");
                    }
                },
                {
                    type: "input",
                    message: "What is your engineer's Github username?",
                    name: "github",
                }
            ])
            .then((response) => {

                const engineerResponses = new Engineer(response.name, response.id, response.email, response.github)
                this.responses.push(engineerResponses);
                
                this.teamChoices();
            });
    }

    // Logs questions of intern member
    internChoice() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is your intern's name?",
                    name: "name",
                    validate: name => {
                        if (name){
                            return true;
                        } else {
                            console.log("\nEngineer's name MUST be added!");
                        }
                    }
                },
                {
                    type: "number",
                    message: "What is your intern's id?",
                    name: "id",
                    validate: id => {
                        if(id){
                            return true;
                        } else {
                            console.log("\nEnter a valid number");
                            return false;
                        }
                    }
                },
                {
                    type: "input",
                    message: "What is your intern's email?",
                    name: "email",
                    validate: email =>{
                        if(email){
                            return true;
                        } else console.log("\nEmail MUST be added");
                    }
                },
                {
                    type: "input",
                    message: "What is your intern's school?",
                    name: "school",
                },
            ])
            .then((response) => {

                const internResponses = new Intern(response.name, response.id, response.email, response.school)
                this.responses.push(internResponses);

                this.teamChoices();
            });
    }

    // Logs thank you and ends the app
    endChoices(){
        console.log("\nThank you!");
        
        const buildPage = () => {
            const htmlPage = render(this.getResponses());
         
            fs.writeFile('./output/index.html', htmlPage, err => {
                err ? console.log(err) : console.log("\nFile created!");
            })
        }

        buildPage();
    }
}

// Initialize a new questions object
const questions = new Questions();

// Start app
questions.managerChoice();
