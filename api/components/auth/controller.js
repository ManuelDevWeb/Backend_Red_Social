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
      auth.username = data.username;
    }

    if (data.password) {
      // TODO: Guardando password encriptada
      auth.password = data.password;
    }

    // Obtenemos la respuesta al momento de insertar un usuario
    return this.store.insert(TABLE, authData);
  }

  // Login
  async login(username, password) {
    // Obteniendo el usuario encontrado por el username
    const user = await this.store.query(TABLE, { username });

    // TODO: COMPARE PASSWORD

    // TODO: RETURN JWT

    return;
  }
}

module.exports = AuthController;
