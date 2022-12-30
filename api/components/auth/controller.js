// Importando bcrypt
const bcrypt = require("bcryptjs");

// Importando funciones del jwt
const jwtAuth = require("../../../auth");
// Importando error personalizado
const error = require("../../../utils/error");

const TABLE = "auth";

// Class controller auth
class AuthController {
  constructor(store) {
    this.store = store || require("../../../store/dbDummy");
  }

  // Insertar un usuario (auth)
  async insertUser(data) {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      // Guardando la password encriptada
      authData.password = await bcrypt.hash(data.password, 6);
    }

    // Obtenemos la respuesta al momento de insertar un usuario
    return this.store.insert(TABLE, authData);
  }

  // Login
  async login(username, password) {
    // Obteniendo el usuario encontrado por el username
    const user = await this.store.query(TABLE, { username });

    // Comparando password ingresada con la que hay en la DB
    const equals = await bcrypt.compare(password, user.password);

    if (!equals) {
      throw error("Invalid credentials", 401);
    }

    return jwtAuth.signToken(user);
  }
}

module.exports = AuthController;
