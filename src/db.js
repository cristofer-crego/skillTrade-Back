require("dotenv").config(); // Cargar variables de entorno desde el archivo .env
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");

// Configuración de la conexión a la base de datos
const database = new Sequelize(
  `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.NAME}`,
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Para permitir conexiones SSL inseguras
      },
    },
    logging: false, // Desactiva los logs de SQL, si prefieres
  }
);

// Prueba de conexión a la base de datos
const testConnection = async () => {
  try {
    await database.authenticate();
    console.log("Conexión a la base de datos exitosa.");
  } catch (err) {
    console.error("No se pudo conectar a la base de datos:", err);
    process.exit(1); // Salir con error si la conexión falla
  }
};

testConnection();

// Importación de modelos
const Users = require("./models/Users")(database, DataTypes);
const Reviews = require("./models/Reviews")(database, DataTypes);
const Professions = require("./models/Professions")(database, DataTypes);

// Definición de asociaciones
Users.hasMany(Reviews, { foreignKey: "userId" });
Reviews.belongsTo(Users, { foreignKey: "userId" });

Professions.hasMany(Users, { foreignKey: "professionId" });
Users.belongsTo(Professions, { foreignKey: "professionId" });

// Función para cargar datos de profesiones
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

// Llamada a la función de carga de profesiones
const main = async () => {
  await loadProfessions();
};

main().catch((err) => console.error("Error en la ejecución principal:", err));

// Exportar módulos
module.exports = {
  Users,
  Reviews,
  Professions,
  loadProfessions,
  database,
};

// require("dotenv").config();
// // const { USER, PASSWORD, HOST, PORT, BDD } = process.env;
// const { Sequelize, DataTypes } = require("sequelize");
// const fs = require("fs");
// const path = require("path");

// const database = new Sequelize(
//   `postgresql://cristofer:sWleYoVqtrBQBsZZW3RNLWc3gn3pquaC@dpg-crjkajbtq21c73a3vmng-a.oregon-postgres.render.com/skilltrade`,
//   {
//     dialect: "postgres",
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//     logging: false,
//   }
// );
// const Users = require("./models/Users")(database, DataTypes);
// const Reviews = require("./models/Reviews")(database, DataTypes);
// const Professions = require("./models/Professions")(database, DataTypes);

// Users.hasMany(Reviews, { foreignKey: "userId" });
// Reviews.belongsTo(Users, { foreignKey: "userId" });

// Professions.hasMany(Users, { foreignKey: "professionId" });
// Users.belongsTo(Professions, { foreignKey: "professionId" });

// const loadProfessions = async () => {
//   const professionsPath = path.join(
//     __dirname,
//     "../src/helpers/professions.json"
//   );
//   try {
//     const data = fs.readFileSync(professionsPath, "utf8");
//     const professions = JSON.parse(data);

//     await Professions.bulkCreate(professions, { ignoreDuplicates: true });
//     console.log("Profesiones cargadas con éxito");
//   } catch (error) {
//     console.error("Error al cargar profesiones:", error);
//   }
// };

// module.exports = {
//   Users,
//   Reviews,
//   Professions,
//   loadProfessions,
//   database,
// };
