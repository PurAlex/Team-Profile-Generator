// Code to define and export the Manager class.
const Employee = require("./Employee");

// Class inherit from Employee class.
class Manager extends Employee{
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber;
        this.title = "Manager";
    }

    getOfficeNumber(){
       return this.officeNumber;
    }

    getRole(){
        return this.title;
    }
}

module.exports = Manager;