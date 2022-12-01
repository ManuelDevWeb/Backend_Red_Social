// Express
const express = require("express");

// Instanciando routes de express
const router = express.Router();

// Routes user

// Obtener todos los usuarios
router.get("/", function (req, res) {});

// Obtener un usuario
router.get("/:id", async (req, res) => {});

// Crear un usuario
router.post("/", (req, res) => {});

// Actualizar usuario
router.patch("/:id", async (req, res) => {});

// Eliminar un usuario
router.delete("/:id", async (req, res) => {});

// Seguir un usuario (id del usuario que queremos seguir)
router.post("/follow/:id", async (req, res) => {});

// Obtener seguidores de un usuario
router.get("/following/:id", async (req, res) => {});

// Exportando modulo
module.exports = router;
