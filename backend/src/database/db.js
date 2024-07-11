const cart =  require("./models/products/cart");
const users = require("./models/users/user");


const db = {
  cart,
  users
};

module.exports = db;