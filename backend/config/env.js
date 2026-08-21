import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
  quiet: true,
});

const envSchema = z.object({
  PORT: z.coerce.number().int().positive(),
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().int().positive(),

  DB_USERNAME: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_DATABASE: z.string().min(1),

  DB_SYNCHRONIZE: z
    .enum(["true", "false"])
    .transform((value) => value === "true"),

  DB_ENABLE_SSL: z
    .enum(["true", "false"])
    .transform((value) => value === "true"),

  JWT_SECRET: z.string().min(1),

  JWT_EXPIRES_DAY: z.string().min(1),
});

const env = envSchema.parse(process.env);

export default Object.freeze(env);
