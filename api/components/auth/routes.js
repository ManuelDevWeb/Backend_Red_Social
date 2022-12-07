// Express
const express = require("express");

// Importando response
const response = require("../../../network/response");
// Importando controller de user instanciado
const authController = require("./index");

// Instanciando routes de express
const router = express.Router();

// Routes auth

// Login de usuario
router.post("/signin", async (req, res) => {
  try {
    // Llamando funcion que logea y retorna jwt
    const message = await authController.login(
      req.body.username,
      req.body.password
    );

    // Enviando respuesta a traves de la funcion personalizada
    response.succes(req, res, message, 200);
  } catch (error) {
    // Enviamos respuesta de error a traves de la funcion personalizada
    response.error(req, res, "Invalid Information", 500);
  }
});

// Exportando modulo
module.exports = router;
