// Separando la DB en un microservicio

// Definir una API para acceder (Para ejecutar: nodemon mysql/index.js)

// Express
const express = require("express");

// Importando configuracion
const config = require("../config");

// Instanciando app con express
const app = express();

// Permitiendo el uso de datos en formato JSON
app.use(express.json());

// ROUTES

app.listen(config.mysqlService.port, () => {
  console.log(`Server running on port ${config.mysqlService.port}`);
});
