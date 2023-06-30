const sequelize = require("sequelize");
const db = require("../instances/sequelize");
const User = db.define("user", {
  email: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  lastname: {
    type: sequelize.STRING,
    allowNull: false,
  },
  firstname: {
    type: sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
