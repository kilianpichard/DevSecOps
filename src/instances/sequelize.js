const Sequelize = require("sequelize");
require("dotenv").config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_URL } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_URL,
  dialect: "postgres",
  port: 5432,
  logging: console.log,
});

module.exports = sequelize;
