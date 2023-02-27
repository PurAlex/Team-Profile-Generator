// Code to define and export the Engineer class.
const Employee = require("./Employee");

// Class inherit from Employee class.
class Engineer extends Employee {
    constructor(name, id, email, github){
        super(name, id, email);
        this.github = github;
        this.title = "Engineer";
    }
    
    getGithub(){
       return this.github;
    }

    getRole(){
        return this.title;
    }
    
}

module.exports = Engineer;