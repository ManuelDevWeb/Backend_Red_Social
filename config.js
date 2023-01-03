// Archivo con las variables de entorno
module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  microservicePost: {
    port: process.env.POST_PORT || "",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "keySecret",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "admin123",
    database: process.env.MYSQL_DB || "db_redSocial",
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || "localhost",
    port: process.env.MYSQL_SRV_PORT || 3001,
  },
  remoteDB: process.env.REMOTE_DB || false,
  cacheService: {
    host: process.env.CACHE_SRV_HOST || "localhost",
    port: process.env.CACHE_SRV_PORT || 3003,
  },
};
