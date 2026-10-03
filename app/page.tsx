import { ArrowDown, ArrowUpRight, Braces, Layers3, Smartphone, MapPin, Code2, Terminal, GraduationCap } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Projects, ExperienceList, Contact } from "@/components/portfolio";
import { getPortfolio } from "@/lib/content";
import { profile } from "@/lib/profile";
import { TechnologyLogo, StackRibbon } from "@/components/technology-logo";
import { Brand } from "@/components/brand";
import { SocialLogo } from "@/components/social-logo";
import { getResumeLink } from "@/lib/resume";
import { assetPath } from "@/lib/paths";

export const dynamic = "force-static";

export default async function Home() {
  const { projects, experiences } = await getPortfolio();
  const resume = getResumeLink();
  return <>
    <Navigation/>
    <main id="main">
      <section className="hero">
        <div className="hero-art" style={{backgroundImage:`url("${assetPath('/images/engineering-workspace.webp')}")`}} role="img" aria-label="Conceptual senior engineer's workspace with software architecture, web development, and mobile application screens"/>
        <div className="container hero-content">
          <div className="hero-eyebrow"><span className="status-dot"/><span className="mono">FULL-STACK & MOBILE ENGINEER · TEAM LEAD</span></div>
          <h1>Danial Sim<span className="hero-dot">.</span></h1>
          <h2>Ideas to interfaces.<br/>And everything <em>in between.</em></h2>
          <p className="hero-description">I build enterprise applications with Flutter, Laravel and Vue.js.<br/>Architecture, automated testing and production delivery.</p>
          <div className="hero-actions"><a className="button button-accent" href="#work">Explore my work <ArrowDown size={19}/></a><a className="hero-secondary" href="#contact">Let&apos;s build something <ArrowUpRight size={18}/></a></div>
          <div className="hero-bottom"><span><MapPin size={14}/> Selangor, Malaysia <span className="hero-timezone">/ UTC +08</span></span><a href={profile.github} target="_blank" rel="noreferrer"><SocialLogo name="github"/> @danialsim95 <ArrowUpRight size={14}/></a></div>
        </div>
      </section>
      <StackRibbon technologies={profile.ribbonStack}/>
      <section id="work" className="section work"><div className="container">
        <div className="section-kicker"><span className="section-number">01 /</span> SELECTED WORK</div>
        <div className="section-heading"><h2>Real problems.<br/><em>Thoughtful solutions.</em></h2><p>From enterprise workflows to everyday experiences.<br/>A selection of things I&apos;ve helped bring to life.</p></div>
        <Projects projects={projects}/>
      </div></section>
      <section id="about" className="section about"><div className="container about-grid">
        <div><div className="section-kicker"><span className="section-number">02 /</span> THE PERSON BEHIND THE CODE</div><h2>Curious by nature.<br/><em>Builder by choice.</em></h2><div className="about-location"><MapPin size={17}/>{profile.location}</div></div>
        <div className="about-copy"><p className="large-copy">Hi, I&apos;m Danial. I build full-stack and mobile systems, with experience leading the teams that deliver them.</p><p>At Flow Digital Asia, I progressed from Full-Stack Developer to Team Lead and led a mobile team of up to 3 developers. My work spans architecture, code review, automated testing and Android and iOS releases.</p><p>I migrated FlowHubr to BLoC and Clean Architecture, delivered enterprise asset and approval workflows, and established multi-tenant Laravel backends. I use specification-driven AI-assisted development with tests and architecture checks to support delivery.</p><a className="text-link" href={resume.href} target={resume.external ? "_blank" : undefined} rel={resume.external ? "noreferrer" : undefined}>{resume.label} <ArrowUpRight size={18}/></a><div className="research-note"><GraduationCap size={24}/><div><strong>A research-informed perspective</strong><span>UKM research experience and a Bachelor of Information Technology with Honours and Distinction.</span></div></div></div>
      </div></section>
      <section id="stack" className="section stack-section"><div className="container">
        <div className="section-kicker"><span className="section-number">03 /</span> MY TOOLBOX</div><div className="section-heading"><h2>The right tools.<br/><em>An open mind.</em></h2><p>A practical foundation today.<br/>Room to explore what comes next.</p></div>
        <div className="stack-columns"><div className="stack-current"><div className="stack-title"><Braces size={22}/><h3>In my stack</h3><span className="mono">HANDS-ON EXPERIENCE</span></div><div className="tech-grid">{profile.currentStack.map(item => <div className="tech-item" key={item}><TechnologyLogo name={item}/><span>{item}</span></div>)}</div></div>
        <div className="stack-next"><div className="stack-title"><Code2 size={22}/><h3>Portfolio experience</h3></div><p>Next.js and TypeScript power this website, giving me hands-on experience alongside my client delivery stack.</p><div className="tags portfolio-tags">{profile.portfolioStack.map(item => <span key={item}><TechnologyLogo name={item} size={19}/>{item}</span>)}</div><div className="stack-title"><Terminal size={22}/><h3>On my radar</h3></div><p>What I&apos;m interested in working with next.</p><div className="tags future-tags">{profile.nextStack.map(item => <span key={item}><TechnologyLogo name={item} size={19}/>{item}<ArrowUpRight size={13}/></span>)}</div></div></div>
      </div></section>
      <section id="experience" className="section experience"><div className="container experience-grid"><div><div className="section-kicker"><span className="section-number">04 /</span> THE JOURNEY</div><h2>Built on<br/><em>experience.</em></h2><p className="experience-intro">From research and mobile apps<br/>to full-stack delivery and leadership.</p><a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight size={17}/></a></div><div><ExperienceList experiences={experiences}/></div></div></section>
      <section id="services" className="section services"><div className="container"><div className="section-kicker"><span className="section-number">05 /</span> LET&apos;S MAKE IT HAPPEN</div><div className="section-heading"><h2>Full-stack SaaS.<br/><em>Across every platform.</em></h2><p>Web + mobile + backend.<br/>One connected product, from architecture to release.</p></div>
      <div className="saas-intro"><Layers3 size={29}/><p>I connect web, mobile, and backend into complete SaaS applications. Flutter, Vue / React, and Laravel are part of my toolkit, not a requirement. I&apos;m open to other technology stacks and choose the right tools for your product, team, and long-term goals.</p><a className="text-link" href={`mailto:${profile.email}?subject=${encodeURIComponent('Full-stack SaaS application enquiry')}`}>Discuss your SaaS product <ArrowUpRight size={18}/></a></div>
      <div className="service-grid">
        {[{icon:Code2,title:'Web interfaces',text:'Customer-facing applications and operational tools, connected to shared services. The framework follows your product needs.',number:'01'}, {icon:Smartphone,title:'Mobile applications',text:'Android and iOS experiences with native integrations, built around your users and the needs of each platform.',number:'02'}, {icon:Layers3,title:'Shared backend',text:'APIs, data models, authentication, business workflows, and integrations that support every client, with a stack that fits your architecture.',number:'03'}].map(({icon:Icon,title,text,number}) => <article key={title}><div className="service-top"><Icon size={28}/><span className="mono">{number}</span></div><h3>{title}</h3><p>{text}</p><a href={`mailto:${profile.email}?subject=${encodeURIComponent(title + ' enquiry')}`} className="text-link">Discuss a project <ArrowUpRight size={17}/></a></article>)}
      </div></div></section>
      <Contact/>
    </main>
    <footer className="footer"><div className="container"><Brand/><span>Thoughtfully built. Always evolving.</span><span className="mono">© {new Date().getFullYear()} DANIAL SIM</span><a href="#main" title="Back to top" aria-label="Back to top"><ArrowDown className="rotate" size={20}/></a></div></footer>
  </>;
}
