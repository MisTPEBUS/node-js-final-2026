const { z } = require("zod");

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(8080),
  DB_HOST: z.string().default("localhost"),
  DB_PORT: z.coerce.number().int().positive().default(5432),

  DB_USERNAME: z.string().default("student"),
  DB_PASSWORD: z.string().default("student666"),
  DB_DATABASE: z.string().default("fitness"),

  DB_SYNCHRONIZE: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),

  DB_ENABLE_SSL: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),

  JWT_SECRET: z
    .string()
    .default(
      "CP9Blj1swQv2YpJxD-9Yr7Hy5Z1AMIeeV2I2N1IWu5tvHNirbRPQirTSCy86SNM_ugBKJ-_NpgtBGc5VLdo-7Q",
    ),

  JWT_EXPIRES_DAY: z.string().default("30d"),
});

const env = envSchema.parse(process.env);

module.exports = Object.freeze(env);
