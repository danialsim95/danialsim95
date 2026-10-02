import Link from "next/link";
import { assetPath } from "@/lib/paths";

export default function LegacyPolicy() {
  const href = assetPath('/scoscreen/index.html');
  return <main id="main" className="detail-main container"><meta httpEquiv="refresh" content={`0;url=${href}`}/><h1>ScoScreen Privacy Policy</h1><Link className="text-link" href={href}>Open privacy policy</Link></main>;
}
