// Importando DB dummy
const storeDummy = require("../../../store/dbDummy");
// Importando funciones MySQL
const storeMySQL = require("../../../store/mysql");
// Importando Mysql remote
const remoteMySQL = require("../../../store/remote-mysql");

// Importando controllers de auth
const AuthController = require("./controller");

// Instanciando un objeto a partir de la clase AuthController
const Controller = new AuthController(remoteMySQL);

module.exports = Controller;
