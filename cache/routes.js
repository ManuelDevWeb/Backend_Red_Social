// Express
const express = require("express");

// Importando response
const response = require("../network/response");
// Importando store Redis
const store = require("../store/redis");

// Instanciando routes de express
const router = express.Router();

// Routes

// Obtener todos los datos de la cache de una tabla
router.get("/:table", async (req, res, next) => {
  try {
    // Llamamos metodo encargado de listar todos los datos
    const data = await store.list(req.params.table);
    console.log(data);
    // Enviando respuesta a traves de la funcion personalizada
    response.succes(req, res, data, 200);
  } catch (error) {
    next(error);
  }
});

// Obtener dato especifico de la cache de una tabla
router.get("/:table/:id", async (req, res, next) => {
  try {
    // Llamamos metodo encargado de obtener un dato de la lista
    const element = await store.get(req.params.table, req.params.id);
    // Enviando respuesta a traves de la funcion personalizada
    response.succes(req, res, element, 200);
  } catch (error) {
    next(error);
  }
});

// Actualizar la cache de una tabla
router.patch("/:table/:id", async (req, res, next) => {
  try {
    // Llamamos metodo encargado de actualizar un dato
    await store.update(req.params.table, req.params.id, req.body);
    // Enviando respuesta a traves de la funcion personalizada
    response.succes(
      req,
      res,
      `Element with id: ${req.params.id} updated successfully`,
      200
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
