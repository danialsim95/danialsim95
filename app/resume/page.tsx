import type { Metadata } from "next";
import Link from "next/link";
import blocks from "@/lib/resume-content.json";
import { getResumeLink } from "@/lib/resume";
import { PrintButton } from "@/components/print-button";
export const dynamic = "force-static";
export const metadata: Metadata = { title: "Resume", description: "Danial Sim's team leadership, engineering experience, technical skills and education." };
export default function Resume() {
  const resume = getResumeLink();
  return <main id="main" className="resume ats-resume">
    <div className="resume-tools"><Link href="/">Back to portfolio</Link><a href={resume.href}>View resume PDF</a><PrintButton/></div>
    {blocks.map((block, index) => {
      switch (block.kind) {
        case "name": return <h1 key={index}>{block.text}</h1>;
        case "section": return <h2 key={index}>{block.text}</h2>;
        case "role": return <h3 key={index}>{block.text}</h3>;
        case "page": return <h2 key={index} className="resume-page-break">{block.text}</h2>;
        case "bullet": return <p key={index} className="resume-bullet">- {block.text}</p>;
        case "reference": return <p key={index} className="resume-reference">{block.text}</p>;
        default: return <p key={index}>{block.text}</p>;
      }
    })}
  </main>;
}
