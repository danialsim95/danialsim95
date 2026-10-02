"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./brand";
import { assetPath } from "@/lib/paths";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
    let frame = 0;
    function update() {
      frame = 0;
      const offset = (document.querySelector(".navigation")?.getBoundingClientRect().height ?? 84) + 120;
      const current = sections.filter(section => section.getBoundingClientRect().top <= offset).at(-1);
      setActive(current?.id ?? "");
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [pathname]);
  return <header className="navigation"><div className="nav-inner">
    <div className="nav-identity"><Image className="nav-portrait" src={assetPath('/images/danial-sim-portrait.png')} alt="Portrait of Danial Sim" width={48} height={48} sizes="48px" priority/><Brand/></div>
    <button className="menu-button icon-button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="navigation-links" onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
    <nav id="navigation-links" className={open ? "nav-links open" : "nav-links"} aria-label="Main navigation">
      {[['Work', '/#work'], ['About', '/#about'], ['Stack', '/#stack'], ['Experience', '/#experience']].map(([label, href]) => <Link key={label} href={href} aria-current={pathname === "/" && active === href.split('#')[1] ? "location" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
      <Link className="nav-contact" href="/#contact" aria-current={pathname === "/" && active === "contact" ? "location" : undefined} onClick={() => setOpen(false)}>Let&apos;s talk <ArrowUpRight size={16}/></Link>
    </nav>
  </div></header>;
}
