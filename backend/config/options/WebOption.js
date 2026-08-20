function createWebOptions(env) {
  return Object.freeze({
    port: env.PORT,
  });
}

module.exports = createWebOptions;
