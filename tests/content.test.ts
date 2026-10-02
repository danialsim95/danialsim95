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
test("freelance history starts in January 2017", () => {
  const experience = portfolioSchema.parse(content).experiences.find(item => item.id === "freelance");
  assert.equal(experience?.period, "Jan 2017 - Present");
  assert.equal(experience?.current, true);
  assert.equal(experience?.role, "Full-Stack Developer");
});
test("Flow Digital titles show full-stack career progression", () => {
  const { experiences } = portfolioSchema.parse(content);
  assert.equal(experiences.find(item => item.id === "flow-senior")?.role, "Senior Full-Stack Developer");
  assert.equal(experiences.find(item => item.id === "flow-developer")?.role, "Full-Stack Developer");
});
