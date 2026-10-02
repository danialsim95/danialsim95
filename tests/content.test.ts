import test from "node:test";
import assert from "node:assert/strict";
import content from "../lib/content.json";
import { portfolioSchema, projectSchema } from "../lib/schema";
test("fallback validates with unique routes and records", () => {
  const data = portfolioSchema.parse(content);
  assert.equal(new Set(data.projects.map(p => p.slug)).size, data.projects.length);
  assert.equal(new Set(data.experiences.map(e => e.id)).size, data.experiences.length);
  assert.ok(data.projects.some(p => p.featured));
});
test("project schema rejects unsafe identifiers and links", () => {
  assert.equal(projectSchema.safeParse({ ...content.projects[0], slug: "../private" }).success, false);
  assert.equal(projectSchema.safeParse({ ...content.projects[0], source: "javascript:alert(1)" }).success, false);
});
