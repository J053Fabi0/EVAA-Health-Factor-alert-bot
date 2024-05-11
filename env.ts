import fs from "fs";
import { parse } from "dotenv";
import { envSchema, JSONSchemaType } from "env-schema";

export interface Env {
  ADMIN_ID: string;
  BOT_TOKEN: string;
}

const schema: JSONSchemaType<Env> = {
  type: "object",
  required: ["BOT_TOKEN", "ADMIN_ID"],
  properties: {
    BOT_TOKEN: { type: "string" },
    ADMIN_ID: { type: "string" },
  },
};

const env: Env = envSchema({ schema, data: parse(fs.readFileSync(".env")) });

export default env;

// Environment variables thar are not in .env

export const HEADLESS = process.env.HEADLESS === "false" ? false : true;
