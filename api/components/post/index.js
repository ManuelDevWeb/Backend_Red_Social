// Importando funciones MySQL
const storeMySQL = require("../../../store/mysql");

// Importando controllers de post
const PostController = require("./controller");

// Instanciando un objeto a partir de la clase PostController
const Controller = new PostController(storeMySQL);

module.exports = Controller;
