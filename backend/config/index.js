import env from "./env.js";
import createDbOptions from "./options/DBOption.js";
import createJwtOptions from "./options/JwtOption.js";
import createWebOptions from "./options/WebOption.js";

const config = Object.freeze({
  db: createDbOptions(env),
  web: createWebOptions(env),
  jwt: createJwtOptions(env),
});

export default config;
