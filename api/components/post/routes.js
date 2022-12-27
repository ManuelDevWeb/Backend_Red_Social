// Express
const express = require("express");

// Importando response
const response = require("../../../network/response");
// Importando controller de post instanciado
const postController = require("./index");
// Importando middleware seguridad
const secure = require("../user/secure");

// Instanciando routes de express
const router = express.Router();

// Routes post

// Obtener todos los posts
router.get("/", async (req, res, next) => {
  try {
    // Llamando el metodo del controlador que retorna la lista de post
    const posts = await postController.listPosts();
    // Enviando respuesta a traves de la funcion personalizada
    response.succes(req, res, posts, 200);
  } catch (error) {
    // Asi ejecutamos el siguiente middleware que se encarga de retornar la respuesta a traves de la funcion personalizada
    next(error);
  }
});

// Obtener un post
router.get("/:id", async (req, res, next) => {
  try {
    // Llamando el metodo del controlador que retorna un post
    const post = await postController.getPost(req.params.id);

    if (post.length === 0) {
      response.error(req, res, "Post don't found", 400);
    }

    // Enviando respuesta a traves de la funcion personalizada
    response.succes(req, res, post, 200);
  } catch (error) {
    // Asi ejecutamos el siguiente middleware que se encarga de retornar la respuesta a traves de la funcion personalizada
    next(error);
  }
});

// Crear un post
router.post(
  "/",
  // Llamamos el middleware que valida que estamos logeados
  secure("logged"),
  async (req, res, next) => {
    try {
      await postController.insertPost({ ...req.body, user: req.user });

      // Enviando respuesta a traves de la funcion personalizada
      response.succes(req, res, "Post added succesfully", 200);
    } catch (error) {
      // Asi ejecutamos el siguiente middleware que se encarga de retornar la respuesta a traves de la funcion personalizada
      next(error);
    }
  }
);

// Modificar un post
router.patch(
  "/:id",
  // Llamamos el middleware que valida que estamos logeados
  secure("updatedPost"),
  async (req, res, next) => {
    await postController.updatePost(req.params.id, req.body);

    response.succes(
      req,
      res,
      `Post with id: ${req.params.id} updated successfully`,
      200
    );
    try {
    } catch (error) {
      // Asi ejecutamos el siguiente middleware que se encarga de retornar la respuesta a traves de la funcion personalizada
      next(error);
    }
  }
);

// Exportando modulo
module.exports = router;
