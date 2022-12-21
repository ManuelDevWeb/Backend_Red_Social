const TABLE = "post";

// Class controller post
class PostController {
  constructor(store) {
    this.store = store || require("../../../store/dbDummy");
  }

  // Lista de los posts
  listPosts() {
    // Obtenemos la lista de datos de la tabla post
    return this.store.list(TABLE);
  }

  // Obtener un post
  getPost(id) {
    // Obtenemos el dato de la tabla post
    return this.store.get(TABLE, id);
  }

  // Insertar un post
  insertPost(data) {
    // Recibimos los datos del body
    const post = {
      text: data.text,
      user: data.user.id,
    };

    // Validamos si viene un id por el body, sino generamos uno
    if (data.id) {
      post.id = data.id;
    } else {
      post.id = (Math.random() + 1).toString(36).substring(7);
    }

    // Obtenemos la respuesta al momento de insertar un post
    return this.store.inser(TABLE, post);
  }

  // Modificar un post
  updatePost(id, data) {
    // Recibimos los datos del body
    const post = {
      text: data.text,
    };

    // Obtenemos la respuesta al momento de actualizar un post
    return this.store.update(TABLE, id, post);
  }
}

module.exports = PostController;
