// Importando controller auth instanciado
const authController = require("../auth");

const TABLE = "user";

// Class controller user
class UserController {
  constructor(store) {
    // Inicializando el objeto con la variable store, en caso de que no venga nada toma por defecto el archivo de la ruta
    this.store = store || require("../../../store/dbDummy");
  }

  // Listar todos los usuarios
  listUsers() {
    // Obtenemos la lista de datos de la tabla user
    return this.store.list(TABLE);
  }

  // Obtener un usuario
  getUser(id) {
    // Obtenemos el usuario de la table user
    return this.store.get(TABLE, id);
  }

  // Insertar un usuario
  async insertUser(data) {
    // Recibimos la data del body
    const user = {
      name: data.name,
      username: data.username,
    };

    // Validamos si viene un id por el body, sino generamos uso
    if (data.id) {
      user.id = data.id;
    } else {
      user.id = (Math.random() + 1).toString(36).substring(7);
    }

    // Si existe password o username incovamos el metodo insertUser de la clase AuthController
    if (data.password || data.username) {
      await authController.insertUser({
        id: user.id,
        username: user.username,
        password: data.password,
      });
    }

    // Obtenemos la respuesta al momento de insertar un usuario
    return this.store.insert(TABLE, user);
  }

  // Modificar un usuario
  updateUser(id, data) {
    // Recibimos la data del body
    const user = {
      name: data.name,
      username: data.username,
    };

    // Obtenemos la respuesta al momento de actualizar un usuario
    return this.store.update(TABLE, id, user);
  }

  // Eliminar un usuario
  deleteUser(id) {
    // Obtenemos la respuesta al momento de eliminar un usuario
    return this.store.remove(TABLE, id);
  }

  // Seguir un usuario
  followUser(from, to) {
    // Obtenemos la respuesta al momento de insertar un usuario
  }

  // Seguidos de un usuario
  async following(id) {
    // Vamos a relacionar los usuarios que en la tabla user tenga el mismo id que en el atributo user_to de la tabla user_follow
    // join = {user: 'user_to}
    // Buscamos en la tabla user_follow el usuario donde coincida el id con user_from
  }
}

module.exports = UserController;
