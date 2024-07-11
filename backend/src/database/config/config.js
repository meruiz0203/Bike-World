module.exports = {
  development: {
    username: "root",
    password: null,
    database: "bike_world_db",
    host: "127.0.0.1",
    dialect: "mysql",
    /*rol*/
    jwtSecret: "miClaveSecretaParaJWT",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
