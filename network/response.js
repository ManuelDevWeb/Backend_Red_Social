// Funcion para personalizar mensaje success
const succes = (req, res, message, status) => {
  let statusCode = status || 200;
  let statusMessage = message || "";

  res.status(statusCode).send({
    error: false,
    statusCode,
    body: statusMessage,
  });
};

// Funcion para personalziar mensaje error
const error = (req, res, message = "Internal Server Error", status = 500) => {
  res.status(status).send({
    error: true,
    status,
    body: message,
  });
};

module.exports = {
  succes,
  error,
};
