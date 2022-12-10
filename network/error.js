// Importando response
const response = require("./response");

// Funcion para manejar los errores cuando los haya y retornarlo respuesta
// (Este metodo lo llamamos al final de los endpoints de la API, index.js)
function errors(err, req, res, next) {
  const message = err.message || "Internal Error";
  const status = err.statusCode || 500;

  // Enviando respuesta a traves de la funcion personalizada
  response.error(req, res, message, status);
}

module.exports = errors;
