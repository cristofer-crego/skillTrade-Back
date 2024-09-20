const server = require("./src/server.js");
const { database, loadProfessions } = require("./src/db.js");
const loadDemoData = require("./src/helpers/loadDemoData.js");

database.sync({ force: false }).then(async () => {
  console.log("Database synchronized");

  // await loadProfessions();
  loadDemoData()
    .then(() => {
      console.log("Datos cargados exitosamente");
    })
    .catch((error) => {
      console.error("Error al cargar datos demo:", error);
    });

  server.listen("5432", () => {
    console.log("listening on port", 3001);
  });
});
