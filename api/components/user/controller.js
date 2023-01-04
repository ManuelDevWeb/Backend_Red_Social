// Importando controller auth instanciado
const authController = require("../auth");

const TABLE = "user";

// Class controller user
class UserController {
  constructor(store, cache) {
    // Inicializando el objeto con la variable store, en caso de que no venga nada toma por defecto el archivo de la ruta
    this.store = store || require("../../../store/dbDummy");
    this.cache = cache || require("../../../store/redis");
  }

  // Listar todos los usuarios
  async listUsers() {
    // Validamos si no esta en cache, si no hay usuarios consultamos y cacheamos datos
    let users = await this.cache.list(TABLE);

    if (!users) {
      console.log("NO ESTABA EN CACHE, BUSCANDO EN DB");
      users = await this.store.list(TABLE);
      this.cache.update(TABLE, users);
    } else {
      console.log("NOS TRAEMOS DATOS DE CACHE");
    }

    // Obtenemos la lista de datos de la tabla user
    return users;
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
    return this.store.insert(TABLE + "_follow", {
      user_from: from,
      user_to: to,
    });
  }

  // Seguidos de un usuario
  async following(id) {
    const join = {};
    // Vamos a relacionar los usuarios que en la tabla user tenga el mismo id que en el atributo user_to de la tabla user_follow
    join[TABLE] = "user_to";
    // join = {user: 'user_to}
    // Buscamos en la tabla user_follow el usuario donde coincida el id con user_from
    const query = { user_from: id };

    return await this.store.query(TABLE + "_follow", query, join);
  }
}

module.exports = UserController;
