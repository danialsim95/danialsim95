import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPortfolio } from "@/lib/content";
import { profile } from "@/lib/profile";
import { PrintButton } from "@/components/print-button";
import { TechnologyLogo } from "@/components/technology-logo";
export const dynamic = "force-static";
export const metadata: Metadata = { title: "Experience Summary", description: "Danial Sim's experience, selected projects, and technical skills." };
export default async function Resume() {
  const { experiences, projects } = await getPortfolio();
  return <main id="main" className="resume"><Link className="text-link resume-back" href="/" style={{marginBottom:30}}><ArrowLeft size={16}/>Portfolio</Link><div className="resume-header"><div><h1>Danial Sim</h1><p>Full-stack Developer · Mobile Engineer · Technical Leadership</p><p>{profile.location}</p></div><PrintButton/></div>
  <div className="resume-contact"><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={profile.linkedin}>linkedin.com/in/danialsim95</a><a href={profile.github}>github.com/danialsim95</a></div>
  <h2>Profile</h2><p>Developer with experience in mobile applications, business systems, full-stack delivery, and university research. Hands-on with Flutter, Laravel, Vue, and React.</p>
  <h2>Technical Skills</h2><div className="tags">{profile.currentStack.map(item => <span key={item}><TechnologyLogo name={item} size={15}/>{item}</span>)}</div>
  <h2>Experience</h2>{experiences.map(item => <article key={item.id} className="experience-row"><span className="mono">{item.period}</span><div><h3>{item.role}</h3><p className="company">{item.company}</p><p>{item.description}</p></div></article>)}
  <h2>Selected Projects</h2>{projects.filter(p => p.featured).map(project => <article className="resume-project" key={project.slug}><h3>{project.client} <span className="mono">/ {project.period}</span></h3><p>{project.summary}</p></article>)}
  <h2>Exploring Next</h2><p>{profile.nextStack.join(' · ')}</p></main>;
}
