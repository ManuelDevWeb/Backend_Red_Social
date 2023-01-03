// Este storage hace llamados a la API del microservicio de redis que apunta al store redis

// Imposando clase instancia de Axios
const AxiosInstance = require("./../utils/axios-instance");
// Importando config
const config = require("./../config");

// Instanciando Axios con su configuracion
const axiosRequest = new AxiosInstance({
  baseURL: `http://${config.cacheService.host}:${config.cacheService.port}`,
  headers: {
    "content-type": "application/json",
  },
});
