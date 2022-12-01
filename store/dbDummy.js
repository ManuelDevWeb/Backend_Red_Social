// Funcion para personalizar y manejar errores
const error = require("../utils/error");

const db = {
  user: [],
};

// Obtener lista de datos
function list(table) {
  // Una promesa es el exito o el fracaso de una operacion asincrona
  return new Promise((resolve, reject) => {
    // Si se resuelve la promesa, retornamos los datos correspondientes a la key enviada
    resolve(db[table] || []);
  });
}

// Obtener un dato
async function get(table, id) {
  // Obteniendo todos los datos
  let collection = await list(table);

  // Filtrando el objeto encontrado
  const element = collection.find((item) => item.id === id) || null;

  if (!element || element === null) {
    throw error("User doesn't exist", 500);
  }

  return element;
}

// Insertar un dato
function insert(table, data) {
  // Si no existe una key en el objeto con el valor de la tabla recibido, creamos un arreglo vacio para esa key
  if (!db[table]) {
    db[table] = [];
  }

  // Insertamos un nuevo dato en la data correspondiente a la key recibida
  db[table].push(data);

  console.log(db);

  return true;
}

// Eliminar un dato
function remove() {}

// Obtener datos por atributos diferentes a id
function query() {}

// Actualizar un dato
function update() {}

module.exports = {
  list,
  get,
  insert,
  remove,
  query,
  update,
};
