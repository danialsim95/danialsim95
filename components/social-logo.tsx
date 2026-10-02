import Image from "next/image";
import { assetPath } from "@/lib/paths";

export function SocialLogo({ name }: { name: "github" | "linkedin" }) {
  return <Image className={`social-logo social-logo-${name}`} src={assetPath(`/social/${name}.svg`)} width={24} height={24} alt="" aria-hidden="true" loading="eager" unoptimized/>;
}
