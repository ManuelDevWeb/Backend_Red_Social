// Importando mysql
const mysql = require("mysql2");

// Importando variables de entorno
const config = require("../config");
// Funcion para personalizar y manejar errores
const error = require("../utils/error");

// Configuracion DB
const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

// Conexion
let connection;

// Conectarnos a la DB
function handleConnection() {
  // Creando la conexion a la DB de mysql
  connection = mysql.createConnection(dbConfig);

  // Validando si la conexion fue exitosa
  connection.connect((err) => {
    if (err) {
      console.log("[db error]", err);
      setTimeout(handleConnection, 2000);
    } else {
      console.log("DB Connected!");
    }
  });

  // Capturando el evento error de la conexion en caso de que lo haya
  connection.on("error", (err) => {
    console.log("[db error]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleConnection();
    } else {
      throw err;
    }
  });
}

handleConnection();

// Listar los datos de una tabla
function list(table) {
  // Una promesa es el exito o el fracaso de una operacion asincrona
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
}

// Obtener dato de una tabla
async function get(table, id) {
  return new Promise((resolve, reject) => {
    // Consultando el dato a traves de la query
    connection.query(`SELECT * FROM ${table} WHERE id=?`, id, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
}

// Insertar dato en una tabla
async function insert(table, data) {
  return new Promise((resolve, reject) => {
    // Insertamos el dato a traves de la query
    connection.query(
      `INSERT INTO ${table} SET ?`,
      // ? son los valores que se van a setear al momento de recibir data
      data,
      (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      }
    );
  });
}

// Actualizar dato de una tabla
async function update(table, id, data) {
  return new Promise((resolve, reject) => {
    // Actualizamos el elemento a traves de la query
    connection.query(
      `UPDATE ${table} SET ? WHERE id=?`,
      // El primer ? son los valores que se van a setear con la data recibida, el segundo ? es el valor del id que se recibe
      [data, id],
      (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      }
    );
  });
}

// Eliminar dato de una tabla
async function remove(table, id) {
  return new Promise((resolve, reject) => {
    // Eliminamos el elemento a traves de la query
    connection.query(
      `DELETE FROM ${table} WHERE id=?`,
      // ? es el valor del id que se recibe
      id,
      (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      }
    );
  });
}

// Obtener dato por atributos diferentes a id
async function query(table, query, join) {
  // table -> user_follow
  // query -> {user_from: id}
  // join -> {user: 'user_to'}

  let joinQuery = "";

  if (join) {
    const key = Object.keys(join)[0]; // user
    const val = join[key]; // user_to
    // JOIN user ON user_follow.user_to=user.id
    joinQuery = `JOIN ${key} ON ${table}.${val}=${key}.id`;
  }

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`,
      // ? es el valor que se recibe en la query, en este caso user_from:id o username:username si viene de login
      query,
      (err, data) => {
        if (err) {
          reject(err);
        }

        if (join) {
          resolve(data || null);
        } else {
          resolve(data[0] || null);
        }
      }
    );
  });
}

// Exportando las funciones
module.exports = {
  list,
  get,
  insert,
  update,
  remove,
  query,
};
