// Importando mysql
const mysql = require("mysql2");
// Importando variables de entorno
const config = require("../config");

// Configuracion DB
const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

// Conexion
let connection;

// Funcion para conectarnos a la DB
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

handleConnection();
