# Danial Sim Portfolio

Next.js App Router, React, TypeScript, custom responsive CSS, and Lucide icons. The website is statically exported for free GitHub Pages hosting. `README.md` is the introduction shown on Danial's GitHub profile; this file documents the application.

## Local Development

Requires Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The site uses validated `lib/content.json` at build time, with no database or admin server. Optional local settings are listed in `.env.example`. Never commit credentials.

Use `npm run build` followed by `npm start` to preview the actual static export. To match production, set `NEXT_PUBLIC_BASE_PATH=/danialsim95` and `NEXT_PUBLIC_SITE_URL=https://danialsim95.github.io/danialsim95` for the build and preview, then open `/danialsim95/`.

## Content

- `lib/content.json`: projects and full job history, the live site's build-time content source.
- `lib/profile.ts`: contact details, current skills, and future interests.
- `public/images/engineering-workspace.webp`: generated conceptual senior-engineering workspace for the hero, not a real workplace photograph or a client product screenshot. The theme uses graphite, soft teal, and cool white.
- `public/images/danial-sim-portrait.png`: Danial's supplied portrait, used without alteration in the navbar and GitHub profile README.
- `public/tech/`: locally hosted Devicon technology logos with the upstream license, including MySQL. CI/CD uses the GitHub Actions mark, also used by this portfolio.
- The portfolio showcases real projects Danial worked on. Project diagrams illustrate those projects; they are not product screenshots or measured results.
- Danial confirmed the job history: Senior Full-stack Developer (May–Sep 2025), Technical Lead (Oct 2025–Aug 2026), and no Alpro entry.
- Projects summarize [Danial's public LinkedIn](https://www.linkedin.com/in/danialsim95/) and his supplied corrections. HTS ALis covers Flutter mobile and Laravel PHP API development; i-Neighbour / IOI Community focuses on Android Java. The internship starter-code repository is excluded from the showcase. No confidential source or unverified performance figures are presented.
- The featured F&N GO / eOrder MY case study comes from Danial's supplied contribution summary. It highlights the Flutter rewrite, ordering and loyalty features, native integrations, and production delivery. Internal implementation notes and author email identities are omitted.
- F&N GO replacement development is dated Jul 2024–Jun 2025. The supplied summary also mentions legacy work in 2023–2024; that does not change the separately confirmed Flow Digital employment start of Jan 2024.
- Current skills prioritize mobile experience, then web/backend work and delivery tools. The roadmap is Go, Next.js, Nuxt, PostgreSQL, and Java Spring Boot.
- Section reveals replay when returning from either direction and respond to reduced-motion preferences. Same-page links scroll to sections and move keyboard focus; navigation highlights the current section. Content remains visible without JavaScript, and hover tooltips also support keyboard focus.

Project details and a printable experience summary live at `/projects/[slug]` and `/resume`. Save the summary as a PDF using the browser's print dialog.

The main resume button opens Danial's Google Drive PDF, configured in `lib/profile.ts`. It does not require a Vercel-hosted copy. Ensure the Drive file is shared with **Anyone with the link / Viewer** ([Google Drive sharing guide](https://support.google.com/drive/answer/2494822)). An optional `RESUME_URL` environment variable can override the link; a locally hosted PDF can be placed at `public/resume.pdf` with `RESUME_URL=/resume.pdf` ([Next.js public files](https://nextjs.org/docs/app/api-reference/file-conventions/public-folder)). The existing printable `/resume` page remains available separately.

## Editing Content

Edit `lib/content.json` for projects and job history, `lib/profile.ts` for skills and contact details, and `app/page.tsx` for introductory copy. Push to `main` to rebuild and publish. Preview changes locally before publishing. A CMS and PostgreSQL are not required.

The original `database/` files and `scripts/database.ts` are retained as optional future server-hosting tooling, but are not connected to this static website. Database edits cannot update a GitHub Pages site at runtime.

## Hosting And CI/CD

GitHub hosts the source, profile card, and exported website. No Vercel project, database account, deployment token, or paid hosting plan is needed.

1. Push the reviewed source to `danialsim95/danialsim95` on `main`.
2. In repository **Settings > Pages > Build and deployment**, select **GitHub Actions** as the source.
3. The `Portfolio CI` workflow checks content, lint, types, the static build, and desktop/mobile browser interactions.
4. Only a successful `main` build publishes the `out/` artifact to the `github-pages` environment.
5. Open https://danialsim95.github.io/danialsim95/ after the deployment succeeds.

The workflow sets the repository base path and production URL, so routes, images, social logos, metadata, and legacy policy links work below `/danialsim95/`. Pull requests are tested but do not deploy. Publishing credentials come from GitHub's short-lived workflow token with deployment permissions limited to the deploy job. Images are served as static files; there is no runtime image optimizer. `404.html` handles unknown routes. Next.js runtime redirects and custom response headers are not available on Pages.

References: [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [GitHub Pages Actions deployment](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [GitHub Pages usage limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits). This is a personal portfolio with contact links, not a storefront, payment flow, or hosted SaaS product. GitHub restricts sites primarily facilitating commercial transactions or providing commercial SaaS.

## Verification

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

SEO includes social preview artwork, structured person data, metadata, robots, and a sitemap. Set the production URL before publishing. Google Fonts have system fallbacks. Contact opens email drafts; the website does not send mail. Social marks are locally hosted monochrome assets; email has a labeled link and no clipboard action.

The shared `danialsim` wordmark uses the tagline "Ideas. Engineered." Social SVG provenance is recorded in `public/social/SOURCES.md`. Services describe a connected SaaS offering without prescribing a fixed technology stack.

## GitHub Profile Improvements

- Pin 3–5 strong public repositories with screenshots, clear setup instructions, and engineering decisions. Describe private client work only in approved public case studies.
- Add the deployed portfolio URL to GitHub's website field and the profile README.
- Set location/timezone, professional bio, and LinkedIn in profile settings.
- Enable private contribution counts when appropriate without exposing private repository names.
- Add a repository social preview and keep selected work aligned with the portfolio.
- Static skill badges are included. External language/streak widgets depend on third-party uptime and public activity; the former language widget is replaced with a dependable introduction.
- Add analytics only when useful; consider privacy expectations and the external service's free-tier limits.

[GitHub's profile and resume guide](https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume) covers profile READMEs and project pinning.

## Legacy Content

The PHP application remains in the repository for reference; only `out/` is published. GitHub Pages does not execute PHP or expose root API files. Existing PHP integrations need separate hosting if still used. ScoScreen's privacy page lives at `/scoscreen/index.html`, under the site's base path; `/app/scoscreen/` is a static forwarding page.
