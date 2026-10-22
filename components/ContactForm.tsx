"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { site, whatsappLink } from "@/lib/site";

const field =
  "mt-1.5 w-full rounded border border-nuit/20 bg-white px-3.5 py-3 text-[1rem] text-nuit placeholder:text-nuit/40 focus:border-azur";

const subjects = [
  "Billet d'avion",
  "Réservation d'hôtel",
  "Assurance voyage",
  "Assistance visa",
  "Guide touristique",
  "Location de voiture",
  "Autre demande",
];

export function ContactForm() {
  function compose(form: HTMLFormElement) {
    const d = new FormData(form);
    return [
      "Bonjour FB Travel,",
      "",
      `Sujet : ${d.get("subject")}`,
      `Nom : ${d.get("name")}`,
      d.get("phone") ? `Téléphone : ${d.get("phone")}` : null,
      "",
      `${d.get("message")}`,
    ]
      .filter((l): l is string => l !== null)
      .join("\n");
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const body = compose(e.currentTarget);
    if (submitter?.value === "email") {
      const subject = String(new FormData(e.currentTarget).get("subject"));
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      window.open(whatsappLink(body), "_blank", "noopener,noreferrer");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block text-sm font-semibold">
        Votre demande concerne
        <select name="subject" className={field} defaultValue={subjects[0]}>
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          Nom
          <input name="name" className={field} autoComplete="name" required />
        </label>
        <label className="block text-sm font-semibold">
          Téléphone
          <input name="phone" type="tel" className={field} autoComplete="tel" placeholder="+236…" />
        </label>
      </div>
      <label className="block text-sm font-semibold">
        Message
        <textarea
          name="message"
          rows={5}
          className={field}
          placeholder="Destination, dates, nombre de voyageurs…"
          required
        />
      </label>
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          value="whatsapp"
          className="inline-flex items-center gap-2.5 rounded bg-nuit px-6 py-3.5 font-bold text-white transition-colors hover:bg-azur"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5 text-soleil-clair" />
          Envoyer sur WhatsApp
        </button>
        <button
          type="submit"
          value="email"
          className="inline-flex items-center gap-2.5 rounded border-2 border-nuit px-6 py-3 font-bold text-nuit transition-colors hover:bg-brume"
        >
          <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
          Envoyer par e-mail
        </button>
      </div>
    </form>
  );
}
