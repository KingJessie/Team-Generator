const Employee = require('./employee');
class Engineer extends Employee {
    constructor(name, id, email, github) {
      super(name, id, email);
      this.role = 'Engineer';
      this.github = github;
    }
    getRole() {
      return this.role;
    }
    getGithub() {
      return this.github;
    }
  }
  
  module.exports = Engineer;
