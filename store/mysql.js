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
  connection.on((err) => {
    console.log("[db error]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleConnection();
    } else {
      throw err;
    }
  });
}

// Listar los datos de una tabla
function list(table) {
  // Una promesa es el exito o el fracaso de una operacion asincrona
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) {
        reject(err);
      }
    });
  });
}

// Obtener dato de una tabla
async function get(table, id) {
  // Consultando el dato a traves de la query
  const element = await connection.query(
    `SELECT * FROM ${table} WHERE id=${id}`
  );

  if (!element || element === null) {
    throw error("User doesn't exist", 500);
  }

  return element;
}

// Insertar dato en una tabla
async function insert(table, data) {
  // Insertamos el dato a traves de la query
  await connection.query(
    `
    INSERT INTO ${table} SET ?
  `,
    // ? son los valores que se van a setear al momento de recibir data
    data
  );

  return true;
}

// Actualizar dato de una tabla
async function update(table, id, data) {
  // Actualizamos el elemento a traves de la query
  await connection.query(
    `
    UPDATE ${table} SET ? WHERE id=?`,
    // El primer ? son los valores que se van a setear con la data recibida, el segundo ? es el valor del id que se recibe
    [data, id]
  );

  return true;
}

// Eliminar dato de una tabla
async function remove(table, id) {
  // Eliminamos el elemento a traves de la query
  await connection.query(
    `
    DELETE FROM ${table} WHERE id=?
  `,
    // ? es el valor del id que se recibe
    id
  );

  return true;
}

// Obtener dato por atributos diferentes a id
function query() {}

// Exportando las funciones
module.exports = {
  list,
  get,
  insert,
  update,
  remove,
  query,
};

handleConnection();
