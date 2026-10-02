import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound() { return <main id="main" className="not-found"><span className="mono">404 / NOT FOUND</span><h1>This page took a different route.</h1><Link href="/" className="button button-dark"><ArrowLeft size={18}/>Back to Danial&apos;s portfolio</Link></main>; }
