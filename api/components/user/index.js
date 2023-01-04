// Importando DB dummy
const storeDummy = require("../../../store/dbDummy");
// Importando funciones MySQL
const storeMySQL = require("../../../store/mysql");

// Configuracion
const config = require("../../../config");

let store, cache;

if (config.remoteDB === true) {
  // Importando Mysql remote
  store = require("../../../store/remote-mysql");
  // Importando redis remote
  cache = require("../../../store/remote-redis");
} else {
  store = require("../../../store/mysql");
  cache = require("../../../store/redis");
}

// Importando controllers del usuario
const UserController = require("./controller");

// Instanciando un objeto a partir de la clase UserController
const Controller = new UserController(store, cache);

module.exports = Controller;
