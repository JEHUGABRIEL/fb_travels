"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { site } from "@/lib/site";

export function NewsletterForm() {
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    const subject = "Inscription à la newsletter FB Travel";
    const body = `Bonjour FB Travel,\n\nJe souhaite recevoir vos offres et actualités à l'adresse : ${email}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDone(true);
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">Votre adresse e-mail</span>
          <input
            name="email"
            type="email"
            required
            placeholder="votre@email.com"
            className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white placeholder:text-white/45 focus:border-soleil focus:bg-white/15"
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-soleil px-6 py-3 font-bold text-nuit transition-colors hover:bg-soleil-clair"
        >
          <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4" />
          Je m&apos;inscris
        </button>
      </form>
      {done ? (
        <p className="mt-3 flex items-center gap-2 text-sm text-soleil-clair" role="status">
          <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4" />
          Votre message est prêt : envoyez-le depuis votre messagerie pour confirmer l&apos;inscription.
        </p>
      ) : (
        <p className="mt-3 text-xs text-white/55">
          Offres, rappels de dates et conseils pratiques. Désinscription possible à tout moment.
        </p>
      )}
    </div>
  );
}
