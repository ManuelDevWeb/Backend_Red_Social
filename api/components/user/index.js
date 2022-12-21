// Importando DB dummy
const storeDummy = require("../../../store/dbDummy");
// Importando funciones MySQL
const storeMySQL = require("../../../store/mysql");

// Importando controllers del usuario
const UserController = require("./controller");

// Instanciando un objeto a partir de la clase UserController
const Controller = new UserController(storeMySQL);

module.exports = Controller;
