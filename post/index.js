// Separando la entidad Post en un microservicio

// Definir una API para acceder (Ejecutar desde CMD: nodemon post/index.js)

// Express
const express = require("express");

// Imporando configuracion con las variables de entorno
const config = require("../config");
// Importando rutas de post
const post = require("./components/post/routes");

// Instanciando app con express
const app = express();

// Permitir el uso de datos en formato JSON
app.use(express.json());

// ROUTES
app.use("/api/post", post);

app.listen(config.microservicePost.port, () => {
  console.log(`Server running on port ${config.microservicePost.port}`);
});
