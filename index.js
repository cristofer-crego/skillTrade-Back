const server = require("./src/server.js");
const { database, loadProfessions } = require("./src/db.js");
const loadDemoData = require("./src/helpers/loadDemoData.js");

database.sync({ force: true }).then(async () => {
  console.log("Database synchronized");

  await loadProfessions();
  await loadDemoData();

  server.listen("5432", () => {
    console.log("listening on port", 3001);
  });
});
