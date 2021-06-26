// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        // call parent constructor (Employee)
        super(name, id, email);
        this.github = github;
        
    }
    getGithub() {
        return this.github;
    };
    getRole() {   // Overridden to return 'Engineer'
        return "Engineer";
    };
}

module.exports = Engineer;