require("dotenv").config();
const { USER, PASSWORD, HOST, PORT, BDD } = process.env;
const { Sequelize, DataTypes } = require("sequelize");

const database = new Sequelize(
  `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${BDD}`,
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);
const Users = require("./models/Users")(database, DataTypes);
const Reviews = require("./models/Reviews")(database, DataTypes);
const Professions = require("./models/Professions")(database, DataTypes);

Users.hasMany(Reviews, { foreignKey: "userId" });
Reviews.belongsTo(Users, { foreignKey: "userId" });

Professions.hasMany(Users, { foreignKey: "professionId" });
Users.belongsTo(Professions, { foreignKey: "professionId" });

module.exports = {
  Users,
  Reviews,
  Professions,
  database,
};
