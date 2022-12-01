// Funcion para personalizar errores
function err(message, codeStatus) {
  let e = new Error(message);

  if (codeStatus) {
    e.codeStatus === codeStatus;
  }

  return e;
}

module.exports = err;
