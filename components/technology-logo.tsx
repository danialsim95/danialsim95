import Image from "next/image";
import { Code2 } from "lucide-react";
import { technologyIcons } from "@/lib/technologies";
import { assetPath } from "@/lib/paths";

export function TechnologyLogo({ name, size = 24 }: { name: string; size?: number }) {
  const icon = technologyIcons[name];
  if (!icon) return <Code2 className="technology-logo" size={size} aria-hidden="true"/>;
  return <Image className="technology-logo" src={assetPath(`/tech/${icon}.svg`)} width={size} height={size} alt="" aria-hidden="true" loading="eager" unoptimized/>;
}

export function StackRibbon({ technologies }: { technologies: string[] }) {
  return <div className="stack-ribbon"><div className="container" role="group" aria-label="Technologies I work with">
    {technologies.map((name, index) => <a key={name} className="stack-logo-item" href="#stack" aria-label={name} aria-describedby={`technology-tooltip-${index}`}>
      <TechnologyLogo name={name} size={34}/>
      <span className="tech-tooltip" role="tooltip" id={`technology-tooltip-${index}`}>{name}</span>
    </a>)}
  </div></div>;
}
