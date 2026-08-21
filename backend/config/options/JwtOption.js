function createJwtOptions(env) {
  return Object.freeze({
    secretKey: env.JWT_SECRET,
    expiresDay: env.JWT_EXPIRES_DAY,
  });
}

export default createJwtOptions;
