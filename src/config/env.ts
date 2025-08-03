import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.string().default("3333"),
  NODE_ENV: z.string(),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
