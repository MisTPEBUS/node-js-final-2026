import env from "./env.js";
import createDbOptions from "./options/DBOption.js";
import createJwtOptions from "./options/JwtOption.js";
import createR2Options from "./options/R2Option.js";
import createWebOptions from "./options/WebOption.js";

const config = Object.freeze({
  db: createDbOptions(env),
  web: createWebOptions(env),
  jwt: createJwtOptions(env),
  cloudflareR2: createR2Options(env),
});

export default config;
