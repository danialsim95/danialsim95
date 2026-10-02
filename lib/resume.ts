import "server-only";
import { profile } from "./profile";
import { assetPath } from "./paths";

export function getResumeLink() {
  const href = process.env.RESUME_URL?.trim() || profile.resumeUrl;
  if (href && (href.startsWith("/") && !href.startsWith("//") || href.startsWith("https://"))) {
    return { href: href.startsWith('/') ? assetPath(href) : href, label: "View my resume (PDF)", external: href.startsWith("https://") };
  }
  return { href: assetPath("/resume/"), label: "View my resume", external: false };
}
