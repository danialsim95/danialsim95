import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { getPortfolio } from "@/lib/content";
import { Navigation } from "@/components/navigation";
import { ProjectVisual } from "@/components/project-visual";
import { profile, siteUrl } from "@/lib/profile";
import { TechnologyLogo } from "@/components/technology-logo";

export const dynamic = "force-static";
export const dynamicParams = false;
export async function generateStaticParams() {
  return (await getPortfolio()).projects.map(project => ({slug: project.slug}));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getPortfolio()).projects.find(p => p.slug === slug);
  return project ? { title: project.client, description: project.summary, alternates: { canonical: `${siteUrl()}/projects/${slug}/` } } : { title: "Project not found" };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = (await getPortfolio()).projects.find(p => p.slug === slug);
  if (!project) notFound();
  return <><Navigation/><main id="main" className="detail-main"><div className="container">
    <Link href="/#work" className="back-link"><ArrowLeft size={17}/>Back to selected work</Link>
    <div className="section-kicker">{project.client.toUpperCase()} / {project.period.toUpperCase()}</div>
    <h1>{project.title}</h1><p className="detail-summary">{project.summary}</p>
    <div className="tags">{project.stack.map(item => <span key={item}><TechnologyLogo name={item} size={17}/>{item}</span>)}</div>
    <ProjectVisual project={project}/>
    {project.caseStudy && <section className="case-study" aria-label="Project case study">
      <div className="case-study-intro"><h2>The project</h2><p>{project.caseStudy.overview}</p></div>
      <div className="case-study-sections">{project.caseStudy.sections.map((section, index) => <article key={section.title}><span className="mono">0{index + 1} /</span><h3>{section.title}</h3><p>{section.text}</p></article>)}</div>
      <div className="case-study-delivery"><h3>Delivered</h3>{project.caseStudy.delivery.map(item => <p key={item}><Check size={18}/>{item}</p>)}</div>
    </section>}
    <div className="detail-grid"><div><h2>Project contributions</h2><ul>{project.highlights.map(item => <li key={item}><Check size={18}/>{item}</li>)}</ul></div><div><h2>Let&apos;s talk about the work.</h2><p>Interested in the approach, or building something similar? Get in touch to discuss the engineering behind this project.</p><div className="detail-links"><a className="button button-dark" href={`mailto:${profile.email}?subject=${encodeURIComponent(`Let's talk about ${project.client}`)}`}>Discuss this project <ArrowUpRight size={18}/></a><a className="text-link" href={project.repo || project.source} target="_blank" rel="noreferrer">{project.repo ? 'View source' : project.caseStudy ? 'Connect on LinkedIn' : 'Project on LinkedIn'}<ArrowUpRight size={16}/></a></div><p className="detail-note">Real project work. The diagram illustrates the project, rather than showing a product screenshot.</p></div></div>
  </div></main></>;
}
