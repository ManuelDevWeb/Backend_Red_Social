// Aca separamos la DB en un microservicio

// Definir una API para acceder (Ejecutar desde CMD: nodemon mysql/index.js)

// Express
const express = require("express");

// Importando configuracion
const config = require("../config");
// Importando rutas
const routes = require("./routes");

// Instanciando app con express
const app = express();

// Permitiendo el uso de datos en formato JSON
app.use(express.json());

// ROUTES
app.use("/", routes);

app.listen(config.mysqlService.port, () => {
  console.log(`Service mysql running on port ${config.mysqlService.port}`);
});
