function createR2Options(env) {
  const enabled = Boolean(
    env.R2_ACCESS_KEY_ID &&
      env.R2_SECRET_ACCESS_KEY &&
      env.R2_ENDPOINT &&
      env.R2_BUCKET_NAME &&
      env.R2_PUBLIC_URL,
  );

  return Object.freeze({
    enabled,
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    endpoint: env.R2_ENDPOINT,
    bucketName: env.R2_BUCKET_NAME,
    publicUrl: env.R2_PUBLIC_URL?.replace(/\/+$/, ""),
  });
}

export default createR2Options;
