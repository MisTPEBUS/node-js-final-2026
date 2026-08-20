function createDbOptions(env) {
  return Object.freeze({
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    synchronize: env.DB_SYNCHRONIZE,
    ssl: env.DB_ENABLE_SSL,
  });
}

module.exports = createDbOptions;
