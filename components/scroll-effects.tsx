"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollEffects() {
  const pathname = usePathname();
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || !window.IntersectionObserver) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observed = new Set<HTMLElement>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) element.dataset.reveal = "visible";
        else if (entry.boundingClientRect.bottom <= 0 || entry.boundingClientRect.top >= window.innerHeight) element.dataset.reveal = "pending";
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    function discover() {
      if (reducedMotion.matches) return;
      main!.querySelectorAll<HTMLElement>(".section-kicker, .section-heading, .project, .about-grid > div, .stack-columns > div, .timeline .experience-row, .service-grid > article, .contact-top, .contact-actions").forEach(element => {
        if (observed.has(element)) return;
        observed.add(element);
        const bounds = element.getBoundingClientRect();
        element.dataset.reveal = bounds.top < window.innerHeight - 30 && bounds.bottom > 0 ? "visible" : "pending";
        observer.observe(element);
      });
    }
    function revealAll() {
      if (!reducedMotion.matches) return;
      observed.forEach(element => { element.dataset.reveal = "visible"; });
      observer.disconnect();
    }
    function navigate(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
      let id: string;
      try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(null, "", url.hash);
      if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: reducedMotion.matches ? "instant" : "smooth", block: "start" });
    }
    discover();
    const mutations = new MutationObserver(discover);
    mutations.observe(main, { childList: true, subtree: true });
    reducedMotion.addEventListener("change", revealAll);
    document.addEventListener("click", navigate, true);
    return () => {
      observer.disconnect(); mutations.disconnect();
      reducedMotion.removeEventListener("change", revealAll);
      document.removeEventListener("click", navigate, true);
      observed.forEach(element => { delete element.dataset.reveal; });
    };
  }, [pathname]);
  return null;
}
