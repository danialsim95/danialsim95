"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, Mail, ChevronDown } from "lucide-react";
import type { Project, Experience } from "@/lib/schema";
import { profile } from "@/lib/profile";
import { ProjectVisual } from "./project-visual";
import { TechnologyLogo } from "./technology-logo";
import { SocialLogo } from "./social-logo";

export function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All work");
  const [expanded, setExpanded] = useState(false);
  const filtered = projects.filter(p => filter === "All work" || p.category === filter);
  const visible = expanded || filter !== "All work" ? filtered : filtered.filter(p => p.featured);
  return <>
    <div className="work-toolbar"><div className="filter-tabs" role="group" aria-label="Filter projects">
      {['All work', 'Full stack', 'Mobile', 'Backend'].map(item => <button key={item} aria-pressed={filter === item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}
    </div><span className="mono work-count">{String(visible.length).padStart(2, '0')} SELECTED PROJECTS</span></div>
    <div className="project-grid project-filter-transition" key={`${filter}-${expanded}`}>
      {visible.map((project, index) => <Link href={`/projects/${project.slug}`} className="project project-flagship" key={project.slug}>
        <ProjectVisual project={project}/>
        <div className="project-meta"><span>{String(index + 1).padStart(2, '0')} / {project.client}</span><ArrowUpRight size={22}/></div>
        <h3>{project.title}</h3><p>{project.summary}</p>
        <div className="tags">{project.stack.map(item => <span key={item}><TechnologyLogo name={item} size={14}/>{item}</span>)}</div>
      </Link>)}
    </div>
    {filter === "All work" && projects.some(p => !p.featured) && <button className="text-button project-expand" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>{expanded ? "Show selected work" : "Explore more projects"} <ArrowDown size={18} className={expanded ? "rotate" : ""}/></button>}
    {projects.length === 0 && <p className="empty-state">New work is on its way. In the meantime, let&apos;s talk about yours.</p>}
  </>;
}

export function ExperienceList({ experiences }: { experiences: Experience[] }) {
  const [expanded, setExpanded] = useState(false);
  const items = expanded ? experiences : experiences.slice(0, 4);
  return <><ol className="timeline" aria-label="Career timeline">
    {items.map(item => <li className={`experience-row${item.current ? ' is-current' : ''}`} key={item.id}>
      <span className="experience-date mono">{item.period}</span>
      <div><h3>{item.role}</h3><p className="company">{item.company}{item.current && <span className="current-label">CURRENT</span>}</p><p>{item.description}</p></div>
    </li>)}
  </ol>{experiences.length > 4 && <button className="text-button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? "Show recent experience" : "View the full journey"}<ChevronDown size={18} className={expanded ? "rotate" : ""}/></button>}</>;
}

export function Contact() {
  const [intent, setIntent] = useState("A freelance project");
  const href = `mailto:${profile.email}?subject=${encodeURIComponent(intent + " - Let's connect")}`;
  return <section id="contact" className="contact section"><div className="container">
    <div className="section-kicker"><span className="section-number">06 /</span> WHAT&apos;S NEXT?</div>
    <div className="contact-top"><h2>Good things start<br/>with a <em>hello.</em></h2><p>A product to build. A team to join.<br/>An idea worth exploring.<br/>Let&apos;s find out what we can make together.</p></div>
    <div className="contact-actions"><label className="contact-intent"><span className="mono">LET&apos;S TALK ABOUT</span><select value={intent} onChange={e => setIntent(e.target.value)}><option>A freelance project</option><option>A full-time opportunity</option><option>A collaboration</option></select></label>
      <a className="button button-dark" href={href}>Start a conversation <ArrowUpRight size={20}/></a>
    </div>
    <div className="contact-bottom"><div className="email-line"><a href={`mailto:${profile.email}`}>{profile.email}</a></div>
    <div className="socials"><a href={profile.github} target="_blank" rel="noreferrer"><SocialLogo name="github"/> GitHub <ArrowUpRight size={15}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><SocialLogo name="linkedin"/> LinkedIn <ArrowUpRight size={15}/></a><a href={href}><Mail size={20}/> Email Danial <ArrowUpRight size={15}/></a></div></div>
  </div></section>;
}
