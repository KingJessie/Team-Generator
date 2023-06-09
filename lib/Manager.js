const Employee = require('./employee');
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
      super(name, id, email);
      this.role = 'Manager';
      this.officeNumber = officeNumber;
    }
    getRole() {
      return this.role;
    }
    getOfficeNumber() {
      return this.officeNumber;
    }
  }
  
  module.exports = Manager;
  
