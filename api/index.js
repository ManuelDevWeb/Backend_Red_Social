// Express
const express = require("express");

// Importando configuracion con las variables de entorno
const config = require("../config");
// Importando rutas de user
const user = require("./components/user/routes");

// Instanciando app con express
const app = express();

// Permitir uso de datos en formato JSON
app.use(express.json());
// Permitir el uso de datos en formato URLENCODED
app.use(express.urlencoded({ extended: true }));

// ROUTES

// Usuarios
app.use("/api/user", user);

app.listen(config.api.port, () => {
  console.log(`Server running on port ${config.api.port}`);
});
