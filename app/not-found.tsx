import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-28">
      <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight">
        Cette page n'existe pas.
      </h1>
      <p className="mt-5 text-lg text-nuit/75">
        Le lien est peut-être incorrect ou la page a été déplacée. Revenez à l'accueil ou contactez
        l'agence.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="rounded bg-nuit px-6 py-3.5 font-bold text-white hover:bg-azur">
          Retour à l'accueil
        </Link>
        <Link href="/contact" className="rounded border-2 border-nuit px-6 py-3 font-bold hover:bg-brume">
          Contacter l'agence
        </Link>
      </div>
    </section>
  );
}
