require("dotenv").config();
// const { USER, PASSWORD, HOST, PORT, BDD } = process.env;
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const BDD = process.env.BDD;

const database = new Sequelize(
  `postgresql://${USER}:${PASSWORD}@${HOST}:${PORT}/${BDD}`,
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

const loadProfessions = async () => {
  const professionsPath = path.join(
    __dirname,
    "../src/helpers/professions.json"
  );
  try {
    const data = fs.readFileSync(professionsPath, "utf8");
    const professions = JSON.parse(data);

    await Professions.bulkCreate(professions, { ignoreDuplicates: true });
    console.log("Profesiones cargadas con éxito");
  } catch (error) {
    console.error("Error al cargar profesiones:", error);
  }
};

module.exports = {
  Users,
  Reviews,
  Professions,
  loadProfessions,
  database,
};
