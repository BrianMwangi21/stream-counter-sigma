const { Model, DataTypes } = require("sequelize");
const sequelize = require("./dbconfig");

class Stream extends Model {}

Stream.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    streams: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "stream",
    timestamps: true,
  }
);

module.exports = Stream;
