// Este storage hace llamados a la API del microservicio de mysql que apunta al store mysql

// Importando clase instancia de Axios
const AxiosInstance = require("./../utils/axios-instance");
// Importando config
const config = require("./../config");

// Instanciando Axios con su configuracion
const axiosRequest = new AxiosInstance({
  baseURL: `http://${config.mysqlService.host}:${config.mysqlService.port}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// A diferencia de antes las peticiones ya se hacen a otra API que llama los metodos del store mysql y no directamente al archivo mysql

// Funcion para obtener listado de datos de una tabla, hace peticion a otra API (Microservicio)
async function list(table) {
  return await axiosRequest.send(`/${table}`, "GET");
}

// Funcion para obtener un dato de una tabla, hace peticion a otra API (Microservicio)
async function get(table, id) {
  return await axiosRequest.send(`/${table}/${id}`, "GET");
}

// Funcion para insertar datos de una tabla, hace peticion a otra API (Microservicio)
async function insert(table, data) {
  return await axiosRequest.send(`/${table}`, "POST", data);
}

// Funcion para actualizar datos de una tabla, hace peticion a otra API (Microservicio)
async function update(table, id, data) {
  return await axiosRequest.send(`/${table}/${id}`, "PATCH", data);
}

// Funcion para eliminar datos de una tabla, hace peticion a otra API (Microservicio)
async function remove(table, id) {
  return await axiosRequest.send(`/${table}/${id}`, "DELETE");
}

module.exports = { list, get, insert, update, remove };
