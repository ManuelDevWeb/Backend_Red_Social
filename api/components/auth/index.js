// Importando DB dummy
const storeDummy = require("../../../store/dbDummy");
// Importando funciones MySQL
const storeMySQL = require("../../../store/mysql");

// Importando controllers de auth
const AuthController = require("./controller");

// Instanciando un objeto a partir de la clase AuthController
const Controller = new AuthController(storeMySQL);

module.exports = Controller;
