"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { site, whatsappLink } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

const field =
  "mt-1.5 w-full rounded border border-nuit/20 bg-white px-3.5 py-3 text-[1rem] text-nuit placeholder:text-nuit/40 focus:border-azur";

const copy = {
  fr: {
    subjects: [
      "Billet d'avion",
      "Réservation d'hôtel",
      "Assurance voyage",
      "Assistance visa",
      "Guide touristique",
      "Location de voiture",
      "Autre demande",
    ],
    subjectLabel: "Votre demande concerne",
    name: "Nom",
    phone: "Téléphone",
    message: "Message",
    placeholder: "Destination, dates, nombre de voyageurs…",
    whatsapp: "Envoyer sur WhatsApp",
    email: "Envoyer par e-mail",
    greeting: "Bonjour FB Travel,",
    subject: "Sujet",
    nameField: "Nom",
    phoneField: "Téléphone",
  },
  en: {
    subjects: [
      "Flight ticket",
      "Hotel booking",
      "Travel insurance",
      "Visa assistance",
      "Guided tour",
      "Car rental",
      "Other request",
    ],
    subjectLabel: "Your request is about",
    name: "Name",
    phone: "Phone",
    message: "Message",
    placeholder: "Destination, dates, number of travellers…",
    whatsapp: "Send on WhatsApp",
    email: "Send by email",
    greeting: "Hello FB Travel,",
    subject: "Subject",
    nameField: "Name",
    phoneField: "Phone",
  },
} as const;

export function ContactForm({ locale = "fr" }: { locale?: Locale }) {
  const t = copy[locale];

  function compose(form: HTMLFormElement) {
    const d = new FormData(form);
    return [
      t.greeting,
      "",
      `${t.subject} : ${d.get("subject")}`,
      `${t.nameField} : ${d.get("name")}`,
      d.get("phone") ? `${t.phoneField} : ${d.get("phone")}` : null,
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
        {t.subjectLabel}
        <select name="subject" className={field} defaultValue={t.subjects[0]}>
          {t.subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          {t.name}
          <input name="name" className={field} autoComplete="name" required />
        </label>
        <label className="block text-sm font-semibold">
          {t.phone}
          <input name="phone" type="tel" className={field} autoComplete="tel" placeholder="+236…" />
        </label>
      </div>
      <label className="block text-sm font-semibold">
        {t.message}
        <textarea
          name="message"
          rows={5}
          className={field}
          placeholder={t.placeholder}
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
          {t.whatsapp}
        </button>
        <button
          type="submit"
          value="email"
          className="inline-flex items-center gap-2.5 rounded border-2 border-nuit px-6 py-3 font-bold text-nuit transition-colors hover:bg-brume"
        >
          <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
          {t.email}
        </button>
      </div>
    </form>
  );
}
