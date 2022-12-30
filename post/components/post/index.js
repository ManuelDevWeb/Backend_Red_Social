// Importando funciones MySQL
const storeMySQL = require("../../../store/mysql");
// Importando Mysql remote
const remoteMySQL = require("../../../store/remote-mysql");

// Importando controllers de post
const PostController = require("./controller");

// Instanciando un objeto a partir de la clase PostController
const Controller = new PostController(remoteMySQL);

module.exports = Controller;
