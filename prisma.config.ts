import { defineConfig } from "prisma/config";
import * as dotenv from "dotenv";
import path from "path";

// ✅ Load .env manually
dotenv.config({ path: path.resolve(__dirname, ".env") });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: databaseUrl, // guaranteed to be a string
  },
});
