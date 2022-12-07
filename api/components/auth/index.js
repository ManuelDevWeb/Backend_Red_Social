// Importando DB dummy
const storeDummy = require("../../../store/dbDummy");

// Importando controllers de auth
const AuthController = require("./controller");

// Instanciando un objeto a partir de la clase AuthController
const Controller = new AuthController(storeDummy);

module.exports = Controller;
