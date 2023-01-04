// Redis
const redis = require("redis");

// Importando variables de entorno
const config = require("../config");

// Creando cliente de redis
const client = redis.createClient({
  // Estos datos lo sacamos de la configuracion de la DB creada en redis
  url: `redis://${config.redis.user}:${config.redis.password}@${config.redis.host}:${config.redis.port}`,
});

(async () => {
  await client.connect();
  console.log("Conectado a REDIS");
})();

// Listar los datos de una tabla en cache
async function list(table) {
  const res = await client.get(table);

  // Convertimos el string a JSON, puesto redis almacena en string
  return JSON.parse(res);
}

// Obtener dato de una tabla en cache
function get(table, id) {
  const element = `${table}_${id}`;

  return list(element);
}

// Actualizar cache
async function update(table, data) {
  let key = table;

  if (data && data.id) {
    key = key + "_" + data.id;
  }

  await client.setEx(key, 60, JSON.stringify(data));

  return true;
}

// Exportando las funciones
module.exports = {
  list,
  get,
  update,
};
