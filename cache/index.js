// Aca agregamos el microservicio para manejar la cache con Redis

// De

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

app.listen(config.cacheService.port, () => {
  console.log(`Service redis running on port ${config.cacheService.port}`);
});
