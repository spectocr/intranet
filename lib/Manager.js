// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        // call parent constructor (Employee)
        super(name,id,email);
        this.officeNumber = officeNumber;
        this.role = "Manager";
        
    }
    getRole() {   // Overridden to return 'Manager'
        return "Manager";
    };
    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;