import Link from "next/link";

export function Brand() {
  return <Link href="/" className="brand" aria-label="Danial Sim home">
    <span className="brand-name">danial<span className="brand-period">sim</span></span>
    <span className="brand-role mono">IDEAS. ENGINEERED.</span>
  </Link>;
}
