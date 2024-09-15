const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Professions = sequelize.define("Professions", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Professions;
};