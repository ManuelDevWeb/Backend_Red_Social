// Funcion para personalizar y manejar errores
const error = require("../utils/error");

const db = {
  user: [
    { id: "100", username: "test1", name: "Manuel" },
    { id: "101", username: "test2", name: "Carlos" },
    { id: "102", username: "test3", name: "Valencia" },
  ],
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
async function remove(table, id) {
  // Obteniendo todos los datos
  let collection = await list(table);

  // Obteniendo indice del elemento a eliminar
  const indexItem = await collection.findIndex((item) => item.id === id);

  if (indexItem < 0) {
    return false;
  }

  // Eliminamos 1 elemento desde el index del elemento encontrado en la coleccion
  collection.splice(indexItem, 1);

  return true;
}

// Obtener datos por atributos diferentes a id
async function query(table, data) {
  // Obteniendo todos los datos
  let collection = await list(table);

  // Obteniendo la key de la data enviada
  let keys = Object.keys(data);
  // console.log(keys);
  let key = keys[0];
  // console.log(key);

  // Validamos si la key del objeto que tenemos en la coleccion, coindice con la key del objeto del elemento enviado
  return collection.find((item) => item[key] === data[key]) || null;
}

// Actualizar un dato
async function update(table, id, data) {
  // Obteniendo todos los datos
  let collection = await list(table);

  // Obteniendo el indice del elemento
  const indexItem = await collection.findIndex((item) => item.id === id);

  if (indexItem === -1) {
    return false;
  }

  const element = collection[indexItem];

  collection[indexItem] = {
    name: data.name || element.name,
    username: data.username || element.username,
    id: element.id,
  };

  console.log(collection);

  return true;
}

module.exports = {
  list,
  get,
  insert,
  remove,
  query,
  update,
};
