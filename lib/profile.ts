export const profile = {
  name: "Danial Sim",
  email: "danialsim95@gmail.com",
  github: "https://github.com/danialsim95",
  linkedin: "https://www.linkedin.com/in/danialsim95/",
  resumeUrl: "/resume.pdf",
  atsResumeUrl: "/resume-ats.pdf",
  location: "Dengkil, Selangor, Malaysia",
  currentStack: ["Flutter", "Dart", "React Native", "Kotlin", "Android", "Laravel", "PHP", "Vue.js", "React", "JavaScript", "Angular", "Java", "MySQL", "AWS", "Firebase", "CI/CD", "Git"],
  ribbonStack: ["Flutter", "Dart", "React Native", "Laravel", "Vue.js", "React", "Next.js", "Java", "Angular", "AWS"],
  portfolioStack: ["Next.js", "TypeScript"],
  nextStack: ["Go", "Nuxt", "PostgreSQL", "Java Spring Boot"]
};

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}
