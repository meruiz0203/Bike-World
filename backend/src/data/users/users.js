
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

module.exports = {

    getUsers: function () {
        const usersFilePath = path.join(__dirname, './users.json');
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        return users;
      },

    saveUsers: function (users) {
        const usersDBPath = path.join(__dirname, './users.json');
        fs.writeFileSync(usersDBPath, JSON.stringify(users, null, 2));
      }, 
      
    findAll: function () {
        return this.getUsers();
      }, 
    
    findById: function (id) {
        const user = this.getUsers().find((user) => user.id == id);
        return user;
      }, 
    findByField: function (field, text){
      const allUsers = this.findAll();
      const userEmail = allUsers.find(user => user[field] === text);
      return userEmail || null;
    },   
    
    create: function (user) {
        console.log(`Creating user ${user.email}`);
        const users = this.getUsers();
        const newUser = {
          id: uuidv4(),
          ...user,
        };
        users.push(newUser);
        this.saveUsers(users);
    }, 
    
    update: function (id, user) {
        console.log(`Updating user ${user.email}`);
        const users = this.getUsers();
        const userToEdit = users.find((user) => user.id == id);
        Object.assign(userToEdit, user);
        this.saveUsers(users);
        return user;
      }, 
    
    destroy: function (id) {
        console.log(`Destroying user ${id}`);
        const users = this.getUsers();
        const nonDestroyedUsers = users.filter((user) => user.id != id);
        this.saveUsers(nonDestroyedUsers);
      }  

    
}