// Importando DB dummy
const storeDummy = require("../../../store/dbDummy");
// Importando funciones MySQL
const storeMySQL = require("../../../store/mysql");

// Configuracion
const config = require("../../../config");

let store = "";

if (config.remoteDB === true) {
  // Importando Mysql remote
  store = require("../../../store/remote-mysql");
} else {
  store = require("../../../store/mysql");
}

// Importando controllers del usuario
const UserController = require("./controller");

// Instanciando un objeto a partir de la clase UserController
const Controller = new UserController(store);

module.exports = Controller;
