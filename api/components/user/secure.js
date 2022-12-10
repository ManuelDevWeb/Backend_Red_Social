// Importando funciones auth jwt
const jwtAuth = require("../../../auth");

// Exportando funcion que retorna la funcion middleware
function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case "update":
        // Validamos si el usuario puede realizar la accion
        const owner = req.params.id;
        // Llamamos el metodo que valida el jwt
        jwtAuth.check.own(req, owner);
        next();
        break;
      case "logged":
        // Llamamos el metodo que valida el jwt
        jwtAuth.check.logged(req);
        next();
        break;
      case "updatedPost":
        // Validamos si el usuario puede realizar la accion
        const ownerPost = req.body.user;
        // Llamamos el metodo que valida el jwt
        jwtAuth.check.own(req, ownerPost);
        next();
        break;
      default:
        next();
    }
  }

  return middleware;
}

module.exports = checkAuth;
