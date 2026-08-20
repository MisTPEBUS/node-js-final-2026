const env = require("./env");
const createDbOptions = require("./options/DBOption");
const createJwtOptions = require("./options/JwtOption");
const createWebOptions = require("./options/WebOption");

const config = Object.freeze({
  db: createDbOptions(env),
  web: createWebOptions(env),
  jwt: createJwtOptions(env),
});

module.exports = config;
