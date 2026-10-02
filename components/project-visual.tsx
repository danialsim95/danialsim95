import { ArrowUpRight, Layers3, MapPin, Braces, Route, Smartphone, Terminal, Check, ScanLine, ShoppingBag, Gift, ShieldCheck } from "lucide-react";
import type { Project } from "@/lib/schema";

export function ProjectVisual({ project }: { project: Project }) {
  return <div className={`project-visual visual-${project.accent}`} aria-hidden="true">
    <span className="visual-caption">{project.category === "Mobile" ? "MOBILE ENGINEERING" : project.category === "Backend" ? "BACKEND SYSTEMS" : "CONNECTED EXPERIENCES"}</span>
    {project.slug === "fngo-eorder" ? <div className="ordering-diagram">
      <div className="ordering-platforms"><span>React Native</span><ArrowUpRight size={20}/><strong>Flutter</strong></div>
      <div className="ordering-features"><div><ShoppingBag size={27}/><span>Ordering</span></div><div><Gift size={27}/><span>Loyalty</span></div><div><ShieldCheck size={27}/><span>Integrity</span></div></div>
    </div> : project.slug === "cuckoo-e-brandshop" ? <div className="ordering-diagram"><div className="ordering-platforms"><strong>WooCommerce</strong></div><div className="ordering-features"><div><ShoppingBag size={27}/><span>Checkout</span></div><div><Check size={27}/><span>Payment</span></div><div><Route size={27}/><span>Reconcile</span></div></div></div> : project.slug === "hts-alis" ? <div className="platform-diagram"><div><Smartphone size={43}/><span>Flutter</span></div><Route size={30}/><div><Braces size={43}/><span>Laravel API</span></div></div> : project.category === "Mobile" ? <div className="asset-diagram">
      <div className="asset-node"><MapPin size={25}/><span>Locate</span></div>
      <div className="asset-hub"><ScanLine size={48}/></div>
      <div className="asset-node"><Check size={25}/><span>Track</span></div>
      <div className="asset-line"/>
    </div> : project.category === "Backend" ? <div className="backend-diagram">
      <div><span>01 / LEGACY</span><code>.NET</code></div><ArrowUpRight size={28}/><div><span>02 / EVOLVE</span><Braces size={26}/><code>Laravel</code></div>
      <div className="diagram-base"><Layers3 size={17}/> Structured data <span>→</span> AWS</div>
    </div> : project.slug === "pips" ? <div className="pipeline-diagram">
      {['Lead', 'Qualify', 'Convert'].map((label, index) => <div key={label}><span>0{index + 1}</span><div className="pipeline-bars"><i/><i/><i/></div><strong>{label}</strong></div>)}
    </div> : <div className="platform-diagram"><div><Smartphone size={43}/><span>Mobile</span></div><Route size={30}/><div><Terminal size={43}/><span>Web</span></div></div>}
    <span className="visual-footnote">{project.client} <span>PROJECT / {project.period.split(' ').at(-1)}</span></span>
  </div>;
}
