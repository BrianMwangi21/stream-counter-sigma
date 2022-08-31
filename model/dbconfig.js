const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("stream-db", "admin", "pass", {
  dialect: "sqlite",
  host: "./dev.sqlite",
});

module.exports = sequelize;
