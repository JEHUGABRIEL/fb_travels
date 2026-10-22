import { notFound } from "next/navigation";

// Route volontairement bloquante : elle ne rend qu'une 404, sans coquille statique.
export const instant = false;

/** Toute URL inconnue affiche la 404 localisée, dans la mise en page du site. */
export default async function CatchAll() {
  notFound();
}
