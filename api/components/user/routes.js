// Express
const express = require("express");

// Importando response
const response = require("../../../network/response");
// Importando controller de user instanciado
const userController = require("./index");
// Importando middleware de seguridad
const secure = require("./secure");

// Instanciando routes de express
const router = express.Router();

// Routes user

// Obtener todos los usuarios
router.get("/", function (req, res) {
  userController
    .listUsers()
    // Si se resuelva la promesa, enviamos los datos retornados por la promesa a la respuesta
    .then((users) => {
      // Enviamos respuesta de exito a traves de la funcion personalizada
      response.succes(req, res, users, 200);
    })
    .catch((error) => {
      // Enviamos respuesta de error a traves de la funcion personalizada
      response.error(req, res, error.message, 500);
    });
});

// Obtener un usuario
router.get("/:id", async (req, res) => {
  try {
    // Obtenemos el usuario
    const user = await userController.getUser(req.params.id);

    // Validamos si existe usuario
    if (user.length === 0) {
      response.error(req, res, "User don't found", 400);
    }

    // Enviamos respuesta de exito a traves de la funcion personalizada
    response.succes(req, res, user, 200);
  } catch (error) {
    // Enviamos respuesta de error a traves de la funcion personalizada
    response.error(req, res, error.message, 500);
  }
});

// Crear un usuario
router.post("/", async (req, res) => {
  try {
    // Creamos el usuario y almacenamos el valor que nos retornan
    const data = await userController.insertUser(req.body);

    if (data) {
      // Enviamos respuesta de exito a traves de la funcion personalizada
      response.succes(req, res, "User added succesfully", 200);
    }
  } catch (error) {
    // Enviamos respuesta de error a traves de la funcion personalizada
    response.error(req, res, error.message, 500);
  }
});

// Actualizar usuario
router.patch(
  "/:id",
  // Llamamos el middleware para validar que estamos logeados y podemos actualizar el usuario
  secure("update"),
  async (req, res) => {
    try {
      // Actualizamos el usuario y almacenamos el valor que nos retornan
      const userUpdated = await userController.updateUser(
        req.params.id,
        req.body
      );

      if (userUpdated) {
        // Enviamos respuesta de exito a traves de la funcion personalizada
        response.succes(
          req,
          res,
          `User with id ${req.params.id} updated succesfully`
        );
      } else {
        // Enviamos respuesta de error a traves de la funcion personalizada
        response.error(req, res, "User doesn't found", 400);
      }
    } catch (error) {
      // Enviamos respuesta de error a traves de la funcion personalizada
      response.error(req, res, error.message, 500);
    }
  }
);

// Eliminar un usuario
router.delete("/:id", async (req, res) => {
  try {
    // Eliminamos usuario y almacenamos el valor que nos retornan
    const userDeleted = await userController.deleteUser(req.params.id);

    if (userDeleted) {
      // Enviamos respuesta de exito a traves de la funcion personalizada
      response.succes(
        req,
        res,
        `User with id ${req.params.id} deleted succesfully`
      );
    } else {
      // Enviamos respuesta de error a traves de la funcion personalizada
      response.error(req, res, "User doesn't found", 400);
    }
  } catch (error) {
    // Enviamos respuesta de error a traves de la funcion personalizada
    response.error(req, res, error.message, 500);
  }
});

// Seguir un usuario (id del usuario que queremos seguir)
router.post(
  "/follow/:id",
  // Llamamos el middleware para validar que estamos logeados
  secure("logged"),
  async (req, res) => {
    try {
      // Enviamos la data a insertar
      await userController.followUser(req.user.id, req.params.id);
      // Enviamos respuesta de exito a traves de la funcion personalizada
      response.succes(
        req,
        res,
        `User whit id: ${req.params.id} followed successfully`,
        201
      );
    } catch (error) {
      // Enviamos respuesta a traves de la funcion personalizada
      response.error(req, res, error.message, 500);
    }
  }
);

// Obtener seguidores de un usuario
router.get("/following/:id", async (req, res) => {
  try {
    const data = await userController.following(req.params.id);
    // Enviando respuesta a traves de la funcion personalizada
    response.succes(req, res, data, 200);
  } catch (error) {
    // Enviando respuesta a traves de la funcion personalizada
    response.error(req, res, error.message, 500);
  }
});

// Exportando modulo
module.exports = router;
