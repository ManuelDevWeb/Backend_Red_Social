// Express
const express = require("express");

// Importando responses
const response = require("../network/response");
// Importando store DB
const store = require("../store/mysql");

// Instanciando router de express
const router = express.Router();

// Routes

// Obtener todos los datos de una tabla
router.get("/:table", async (req, res, next) => {
  try {
    // Llamamos metodo encargado de listar todos los datos
    const data = await store.list(req.params.table);
    // Enviando respuesta a traves de la funcion personalizada
    response.succes(req, res, data, 200);
  } catch (error) {
    next(error);
  }
});

// Obtener un dato de una tabla por id
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

// Insertar un dato en una tabla
router.post("/:table", async (req, res, next) => {
  try {
    // Llamamos metodo encargado de insertar un dato
    const element = await store.insert(req.params.table, req.body);
    // Enviando respuesta a traves de la funcion personalizada
    response.succes(req, res, element, 200);
  } catch (error) {
    next(error);
  }
});

// Atualizar un dato de una tabla por id
router.patch("/:table/:id", async (req, res, next) => {
  try {
    // Llamamos metodo encargado de actualiza un dato
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

// Eliminar un dato de una tabla por id
router.delete("/:table/:id", async (req, res, next) => {
  try {
    // Llamamos metodo encargado de eliminar un dato
    await store.remove(req.params.table, req.params.id);
    // Enviando respuesta a traves de la funcion personalizada
    response.succes(
      req,
      res,
      `Element with id: ${req.params.id} deleted successfully`,
      200
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
