function createWebOptions(env) {
  return Object.freeze({
    port: env.PORT,
  });
}

export default createWebOptions;
