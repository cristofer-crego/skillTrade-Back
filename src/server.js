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

//CORS con opciones específicas
const allowedOrigins = [
  "https://skill-trade-front.vercel.app",
  "http://localhost:5173",
];
server.use(
  cors({
    origin: allowedOrigins, //cambiaremos esto al dominio del cliente al deployar
    credentials: true, //esto habilita el envío de cookies en solicitudes CORS
  })
);
// const corsOptions = {
//   origin: "https://skill-trade-front.vercel.app", // Permitir solicitudes desde este dominio
//   optionsSuccessStatus: 200,
// };

// server.use(cors(corsOptions));
server.get("/", (req, res) => {
  res.send("Bienvenido a la API");
});
//rutas
server.use("/user", routeUser);
server.use("/professions", routeProfessions);
server.use("/reviews", routeReview);

module.exports = server;
