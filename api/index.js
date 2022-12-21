// Express
const express = require("express");
// Swagger (Documentacion)
const swaggerUI = require("swagger-ui-express");

// Importando configuracion con las variables de entorno
const config = require("../config");
// Importando rutas de user
const user = require("./components/user/routes");
// Importando rutas de auth
const auth = require("./components/auth/routes");
// Importando rutas de post
const post = require("./components/post/routes");
// Importando documentacion generada en Swagger editor
const swaggerDoc = require("./swagger.json");

// Instanciando app con express
const app = express();

// Permitir uso de datos en formato JSON
app.use(express.json());
// Permitir el uso de datos en formato URLENCODED
app.use(express.urlencoded({ extended: true }));

// ROUTES

// Usuarios
app.use("/api/user", user);
// Auth
app.use("/api/auth", auth);
// Post
app.use("/api/post", post);
// API Documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.listen(config.api.port, () => {
  console.log(`Server running on port ${config.api.port}`);
});
