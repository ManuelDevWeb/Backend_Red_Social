// Aca en las peticiones llamamos la API del microservicio de mysql

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

async function list(table) {
  return await axiosRequest.send(`/${table}`, "GET");
}

module.exports = { list };
