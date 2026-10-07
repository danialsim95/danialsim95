import test from "node:test";
import assert from "node:assert/strict";
import content from "../lib/content.json";
import { portfolioSchema, projectSchema } from "../lib/schema";
import resume from "../lib/resume-content.json";
import { profile } from "../lib/profile";
import { technologyIcons } from "../lib/technologies";
import { existsSync } from "node:fs";
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
  assert.equal(experiences.find(item => item.id === "flow-lead")?.period, "Sep 2025 - Aug 2026");
  assert.equal(experiences.find(item => item.id === "flow-senior")?.period, "May - Aug 2025");
  assert.ok(resume.some(block => block.text === "Team Lead | Sep 2025 - Aug 2026"));
  assert.ok(resume.some(block => block.text === "Senior Full-Stack Developer | May 2025 - Aug 2025"));
});

test("general October 7 resume updates are reflected in public content", () => {
  assert.equal(profile.atsResumeUrl, "/resume-ats.pdf");
  assert.ok(content.projects.some(project => project.slug === "smasjid"));
  assert.equal(content.experiences.find(role => role.id === "myxlab-research")?.role, "Part-time UI/UX Designer");
  const text = resume.map(block => block.text).join(" ");
  assert.match(text, /Python - TestDome \(2026\)/);
  assert.match(text, /Vue.js - TestDome \(2026\)/);
  assert.match(text, /EU Holidays/);
  assert.match(text, /sMasjid/);
  assert.doesNotMatch(text, /ARBA/);
});

test("earlier employment matches the latest general resume", () => {
  const ukm = content.experiences.filter(role => role.company.includes("(UKM)"));
  assert.equal(ukm.length, 1);
  assert.equal(ukm[0].role, "Software Developer & Research Assistant");
  assert.equal(ukm[0].period, "Sep 2020 - Sep 2023");
  assert.equal(content.experiences.find(role => role.id === "timetec")?.company, "Timetec Cloud Sdn Bhd");
  for (const id of ["myxlab-mobile", "myxlab-research"]) {
    const description = content.experiences.find(role => role.id === id)?.description;
    assert.ok(description && description.length <= 100);
  }
});

test("commerce technologies have locally hosted brand logos", () => {
  for (const name of ["WordPress", "WooCommerce"]) {
    const icon = technologyIcons[name];
    assert.ok(icon);
    assert.ok(existsSync(new URL(`../public/tech/${icon}.svg`, import.meta.url)));
  }
});
