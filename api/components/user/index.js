// Importando DB dummy
const storeDummy = require("../../../store/dbDummy");

// Importando controllers del usuario
const UserController = require("./controller");

// Instanciando un objeto a partir de la clase UserController
const Controller = new UserController(storeDummy);

module.exports = Controller;
