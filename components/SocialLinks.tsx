import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faLinkedinIn,
  faYoutube,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { socials, type SocialName } from "@/lib/site";

const icons: Record<SocialName, IconDefinition> = {
  facebook: faFacebookF,
  whatsapp: faWhatsapp,
  instagram: faInstagram,
  tiktok: faTiktok,
  linkedin: faLinkedinIn,
  youtube: faYoutube,
};

const brandColors: Record<SocialName, string> = {
  facebook: "bg-[#1877f2]",
  whatsapp: "bg-[#25d366]",
  instagram: "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
  tiktok: "bg-black",
  linkedin: "bg-[#0a66c2]",
  youtube: "bg-[#ff0000]",
};

export function SocialLinks({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <ul className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {socials.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.label} — FB Travel And Services`}
            title={s.label}
            className={`grid place-items-center rounded-full text-white shadow-sm transition hover:-translate-y-0.5 hover:brightness-110 ${brandColors[s.name]} ${
              compact ? "h-8 w-8" : "h-11 w-11"
            }`}
          >
            <FontAwesomeIcon icon={icons[s.name]} className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
          </a>
        </li>
      ))}
    </ul>
  );
}
