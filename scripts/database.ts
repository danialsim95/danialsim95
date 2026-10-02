import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { loadEnvConfig } from "@next/env";
import postgres from "postgres";
import { portfolioSchema } from "../lib/schema";

loadEnvConfig(process.cwd());
if (!process.env.DATABASE_URL) throw new Error("Set DATABASE_URL in .env.local before running database commands.");
const sql = postgres(process.env.DATABASE_URL, { max: 1, prepare: false });
const command = process.argv[2];
try {
  if (command === "migrate") {
    await sql.unsafe(await readFile(resolve("database/schema.sql"), "utf8"));
    console.log("Portfolio tables are ready.");
  } else if (command === "seed") {
    const content = portfolioSchema.parse(JSON.parse(await readFile(resolve("lib/content.json"), "utf8")));
    await sql.begin(async tx => {
      for (const [position, project] of content.projects.entries()) {
        await tx`INSERT INTO portfolio_projects (slug, content, position)
          VALUES (${project.slug}, ${tx.json(project)}, ${position})
          ON CONFLICT (slug) DO UPDATE SET content = EXCLUDED.content, position = EXCLUDED.position, updated_at = now()`;
      }
      for (const [position, experience] of content.experiences.entries()) {
        await tx`INSERT INTO portfolio_experiences (id, content, position)
          VALUES (${experience.id}, ${tx.json(experience)}, ${position})
          ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content, position = EXCLUDED.position, updated_at = now()`;
      }
    });
    console.log("Content imported. Existing records not in the file were preserved.");
  } else throw new Error("Use migrate or seed.");
} finally {
  await sql.end();
}
