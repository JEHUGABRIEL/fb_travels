import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { whatsappLink } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

const copy = {
  fr: {
    label: "Écrire à FB Travel sur WhatsApp",
    message: "Bonjour FB Travel, j'aimerais de l'aide pour organiser un voyage.",
  },
  en: {
    label: "Message FB Travel on WhatsApp",
    message: "Hello FB Travel, I would like help planning a trip.",
  },
} as const;

export function WhatsAppFloat({ locale = "fr" }: { locale?: Locale }) {
  const t = copy[locale];
  return (
    <a
      href={whatsappLink(t.message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.label}
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg shadow-nuit/30 transition-transform hover:scale-105 sm:hidden"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="h-7 w-7" />
    </a>
  );
}
