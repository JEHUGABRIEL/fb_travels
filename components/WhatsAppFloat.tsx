import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { whatsappLink } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Bonjour FB Travel, j'aimerais de l'aide pour organiser un voyage.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Écrire à FB Travel sur WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg shadow-nuit/30 transition-transform hover:scale-105 sm:hidden"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="h-7 w-7" />
    </a>
  );
}
