const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const server = express();
const routeUser = require("./routes/routeUser");
const routeReview = require("./routes/routeReview");
const routeProfessions = require("./routes/routeProfessions");

//middlewares
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());
const corsOptions = {
  origin: "https://skill-trade-front.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

server.use(cors(corsOptions));

// Definir tus rutas aquí
server.use("/users", require("./routes/users"));
server.use("/reviews", require("./routes/reviews"));
server.use("/professions", require("./routes/professions"));

// Manejar errores 404 para rutas no encontradas
server.use((req, res) => {
  res.status(404).send("Not Found");
});

//rutas
server.use("/user", routeUser);
server.use("/professions", routeProfessions);
server.use("/reviews", routeReview);

module.exports = server;
