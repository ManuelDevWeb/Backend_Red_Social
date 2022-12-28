// Axios
const axios = require("axios");

class AxiosInstance {
  constructor(config = {}) {
    // Creamos instancia de axios
    this.axios = axios.create(config);
  }

  async send(url, method, data) {
    // Enviamos la peticion al metodo y la url indicada
    const res = await this.axios({ method, url, data });

    return res.data.body;
  }
}

module.exports = AxiosInstance;
