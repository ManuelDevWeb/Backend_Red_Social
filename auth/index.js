// Importando jwt
const jwt = require("jsonwebtoken");

// Importando configuracion
const config = require("../config");
// Importando error personalizado
const error = require("../utils/error");

// Funcion que crea el token
function signToken(data) {
  return jwt.sign(data, config.jwt.secret);
}

// Objeto con funciones
const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);

    // Comprobamos si el id ingresador corresponde al jwt actual
    if (decoded.id !== owner) {
      throw error("Not authorized", 401);
    }
  },
  logged: function (req) {
    decodeHeader(req);
  },
};

// Funcion para validar y decodificar header
function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  // Extrayendo el payload del token
  const decoded = verify(token);

  // Almacenar la data del usuario en res
  req.user = decoded;

  return decoded;
}

// Funcion para obtener el token del header
function getToken(auth) {
  // Validando que venga un token por el auth
  if (!auth) {
    throw error("Invalid token", 401);
  }

  // Separando el bearer del token para almacenarlo
  let token = auth.split(" ")[1];

  return token;
}

// Funcion que valida el token
function verify(token) {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    throw error(error.message, 500);
  }
}

// Exportando modulo
module.exports = {
  signToken,
  check,
};
