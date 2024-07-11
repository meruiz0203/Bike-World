const products = require("./catalogo/bikes")
const users = require("./users/users");

const db = {
  products,
  users,
};

module.exports = db;
