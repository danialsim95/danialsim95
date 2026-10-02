import type { Metadata } from "next";
import { profile, siteUrl } from "@/lib/profile";
import "./globals.css";
import { ScrollEffects } from "@/components/scroll-effects";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: "Danial Sim | Full-stack & Mobile Engineer", template: "%s | Danial Sim" },
  description: "Full-stack and mobile engineer with team leadership experience in Malaysia. Flutter, Laravel and Vue.js, from architecture and automated testing to production delivery.",
  alternates: { canonical: `${siteUrl()}/` },
  openGraph: { type: "website", locale: "en_MY", siteName: "Danial Sim", title: "Danial Sim | Full-stack & Mobile Engineer", description: "Enterprise applications, team leadership, architecture and automated testing.", url: `${siteUrl()}/`, images: [{url:`${siteUrl()}/images/social-preview.png`, width:1200, height:630, alt:"Danial Sim - Full-stack Developer"}] },
  twitter: { card: "summary_large_image", images: [`${siteUrl()}/images/social-preview.png`] },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = { "@context": "https://schema.org", "@type": "Person", name: profile.name,
    url: siteUrl(), jobTitle: "Full-stack and Mobile Engineer", sameAs: [profile.github, profile.linkedin],
    knowsAbout: [...profile.currentStack, ...profile.portfolioStack] };
  return <html lang="en" data-scroll-behavior="smooth"><body>
    <a className="skip-link" href="#main">Skip to content</a>
    {children}
    <ScrollEffects/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
  </body></html>;
}
