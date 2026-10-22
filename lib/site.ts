export const site = {
  name: "FB Travel And Services",
  short: "FB Travel",
  tagline: "L'expertise au service de vos besoins",
  city: "Bangui",
  address: "Parc du Cinquantenaire, Lakouanga, face au restaurant Cafrina, Bangui",
  addressShort: "Parc du Cinquantenaire, Lakouanga, Bangui",
  email: "fb.travel@outlook.com",
  whatsapp: "23675293601",
  phones: [
    { label: "+236 75 29 36 01", tel: "+23675293601" },
    { label: "+236 72 09 35 88", tel: "+23672093588" },
    { label: "+236 74 51 85 91", tel: "+23674518591" },
  ],
  facebook: "https://www.facebook.com/profile.php?id=61567061300905",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Parc+du+Cinquantenaire+Lakouanga+Bangui",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type SocialName = "facebook" | "whatsapp" | "instagram" | "tiktok" | "linkedin" | "youtube";

export type SocialLink = { name: SocialName; label: string; href: string };

// Ajoutez ici vos autres comptes : l'icône correspondante apparaîtra automatiquement.
export const socials: SocialLink[] = [
  { name: "facebook", label: "Facebook", href: site.facebook },
  {
    name: "whatsapp",
    label: "WhatsApp",
    href: whatsappLink("Bonjour FB Travel, j'aimerais de l'aide pour organiser un voyage."),
  },
];

export const services = [
  {
    id: "billets",
    title: "Billets d'avion",
    short: "Aller simple ou aller-retour, vers l'Afrique et le reste du monde.",
    long: "Dites-nous d'où vous partez, où vous allez et à quelle date. Nous cherchons les vols disponibles, vous présentons les options et nous occupons de la réservation et de l'émission du billet.",
    points: [
      "Vols au départ de Bangui, vers l'Afrique, l'Europe et au-delà",
      "Aller simple, aller-retour, voyages en groupe",
      "Modification et suivi de votre réservation",
    ],
    icon: "plane",
    message: "Bonjour FB Travel, je souhaite réserver un billet d'avion.",
  },
  {
    id: "hotels",
    title: "Réservation d'hôtel",
    short: "Un hébergement confirmé avant votre départ, à votre budget.",
    long: "Séjour touristique, déplacement professionnel ou mission : nous réservons l'hôtel qui correspond à votre budget et à votre emploi du temps, et vous remettons la confirmation.",
    points: [
      "Hôtels en ville comme près des aéroports",
      "Confirmation de réservation remise avant le départ",
      "Réservations groupées pour équipes et délégations",
    ],
    icon: "hotel",
    message: "Bonjour FB Travel, je souhaite réserver un hôtel.",
  },
  {
    id: "assurance",
    title: "Assurance voyage",
    short: "Une couverture pour partir l'esprit tranquille.",
    long: "Beaucoup d'ambassades demandent une assurance voyage avec la demande de visa. Nous vous orientons vers la couverture adaptée à votre destination et à la durée de votre séjour.",
    points: [
      "Attestation d'assurance pour dossier de visa",
      "Couverture adaptée à la destination et à la durée",
      "Conseils avant l'achat",
    ],
    icon: "shield",
    message: "Bonjour FB Travel, je souhaite une assurance voyage.",
  },
  {
    id: "visa",
    title: "Assistance visa",
    short: "Un dossier complet et bien préparé, du premier conseil au dépôt.",
    long: "Chaque pays a ses règles. Nous vous indiquons les pièces à réunir, vérifions votre dossier avec vous et vous accompagnons dans les démarches jusqu'à la décision.",
    points: [
      "Liste des pièces à fournir selon la destination",
      "Vérification du dossier avant dépôt",
      "Réservations de vol et d'hôtel pour le dossier, quand l'ambassade les demande",
    ],
    icon: "passport",
    message: "Bonjour FB Travel, j'ai besoin d'aide pour une demande de visa.",
  },
  {
    id: "guide",
    title: "Guide touristique",
    short: "Découvrir une destination avec quelqu'un qui la connaît.",
    long: "Pour un circuit, une visite ou un voyage d'affaires, nous organisons un accompagnement sur place afin que vous profitiez de votre séjour sans perdre de temps.",
    points: [
      "Visites et circuits à la demande",
      "Accompagnement de voyages d'affaires",
      "Programmes pour groupes",
    ],
    icon: "map",
    message: "Bonjour FB Travel, je souhaite des informations sur un guide touristique.",
  },
  {
    id: "voiture",
    title: "Location de voiture",
    short: "Un véhicule à votre arrivée ou pour vos déplacements en ville.",
    long: "Besoin d'un véhicule pour une journée, une mission ou toute la durée de votre séjour ? Indiquez-nous vos dates et le type de déplacement, nous vous proposons une solution.",
    points: [
      "Location à la journée ou au séjour",
      "Véhicules pour déplacements professionnels",
      "Réservation en même temps que votre vol",
    ],
    icon: "car",
    message: "Bonjour FB Travel, je souhaite louer une voiture.",
  },
] as const;

export const offers = [
  {
    id: "douala",
    destination: "Douala",
    airline: "ECAir",
    detail: "Aller-retour Bangui – Douala",
    price: "285 700 FCFA",
    boardPrice: "285 700 F",
    note: "Prix de départ, à partir de. Confirmez les dates et la disponibilité auprès de l'agence.",
    message:
      "Bonjour FB Travel, je suis intéressé(e) par l'offre Bangui – Douala aller-retour avec ECAir à partir de 285 700 FCFA.",
  },
  {
    id: "rwandair",
    destination: "RwandAir",
    airline: "Promotion",
    detail: "-20 % sur tous les tarifs, quelle que soit la destination",
    price: "-20 %",
    boardPrice: "-20 %",
    note: "Réduction annoncée par l'agence sur les billets RwandAir. Conditions à confirmer au moment de la réservation.",
    message:
      "Bonjour FB Travel, je suis intéressé(e) par la promotion RwandAir -20 %. Pouvez-vous me donner les détails ?",
  },
  {
    id: "dakar",
    destination: "Dakar",
    airline: "Aller-retour",
    detail: "Bangui – Dakar",
    price: "Sur devis",
    boardPrice: "Devis",
    note: "Tarif communiqué sur demande, selon vos dates.",
    message: "Bonjour FB Travel, je souhaite un devis pour un vol Bangui – Dakar.",
  },
  {
    id: "paris",
    destination: "Paris",
    airline: "Aller-retour",
    detail: "Bangui – Paris",
    price: "Sur devis",
    boardPrice: "Devis",
    note: "Tarif communiqué sur demande, selon vos dates.",
    message: "Bonjour FB Travel, je souhaite un devis pour un vol Bangui – Paris.",
  },
] as const;

export type Destination = {
  code: string;
  city: string;
  country: string;
  region: string;
  detail: string;
  price: string;
  message: string;
  image: string;
  imageAlt: string;
};

export const destinations: Destination[] = [
  {
    code: "DLA",
    city: "Douala",
    country: "Cameroun",
    region: "Afrique centrale",
    detail: "Aller-retour avec ECAir",
    price: "dès 285 700 FCFA",
    message: "Bonjour FB Travel, je souhaite un vol Bangui – Douala.",
    image: "/images/destinations/douala.jpg",
    imageAlt: "Le pont sur le fleuve Wouri, à Douala",
  },
  {
    code: "CDG",
    city: "Paris",
    country: "France",
    region: "Europe",
    detail: "Correspondances via les hubs européens",
    price: "sur devis",
    message: "Bonjour FB Travel, je souhaite un devis pour un vol Bangui – Paris.",
    image: "/images/destinations/paris.jpg",
    imageAlt: "La tour Eiffel et la Seine, à Paris",
  },
  {
    code: "DKR",
    city: "Dakar",
    country: "Sénégal",
    region: "Afrique de l'Ouest",
    detail: "Selon vos dates",
    price: "sur devis",
    message: "Bonjour FB Travel, je souhaite un devis pour un vol Bangui – Dakar.",
    image: "/images/destinations/dakar.jpg",
    imageAlt: "Le monument de la Renaissance africaine, à Dakar",
  },
  {
    code: "CMN",
    city: "Casablanca",
    country: "Maroc",
    region: "Afrique du Nord",
    detail: "Selon vos dates",
    price: "sur devis",
    message: "Bonjour FB Travel, je souhaite un devis pour un vol Bangui – Casablanca.",
    image: "/images/destinations/casablanca.jpg",
    imageAlt: "La mosquée Hassan II, à Casablanca",
  },
  {
    code: "KGL",
    city: "Kigali",
    country: "Rwanda",
    region: "Afrique de l'Est",
    detail: "Promotion RwandAir -20 %",
    price: "sur devis",
    message: "Bonjour FB Travel, je souhaite un devis pour un vol Bangui – Kigali.",
    image: "/images/destinations/kigali.jpg",
    imageAlt: "Le Kigali Convention Centre, à Kigali",
  },
  {
    code: "IST",
    city: "Istanbul",
    country: "Turquie",
    region: "Europe / Asie",
    detail: "Selon vos dates",
    price: "sur devis",
    message: "Bonjour FB Travel, je souhaite un devis pour un vol Bangui – Istanbul.",
    image: "/images/destinations/istanbul.jpg",
    imageAlt: "Sainte-Sophie, à Istanbul",
  },
  {
    code: "DXB",
    city: "Dubaï",
    country: "Émirats arabes unis",
    region: "Moyen-Orient",
    detail: "Selon vos dates",
    price: "sur devis",
    message: "Bonjour FB Travel, je souhaite un devis pour un vol Bangui – Dubaï.",
    image: "/images/destinations/dubai.jpg",
    imageAlt: "Le Burj Khalifa, à Dubaï",
  },
  {
    code: "ADD",
    city: "Addis-Abeba",
    country: "Éthiopie",
    region: "Afrique de l'Est",
    detail: "Selon vos dates",
    price: "sur devis",
    message: "Bonjour FB Travel, je souhaite un devis pour un vol Bangui – Addis-Abeba.",
    image: "/images/destinations/addis.jpg",
    imageAlt: "La cathédrale Medhane Alem, à Addis-Abeba",
  },
  {
    code: "BRU",
    city: "Bruxelles",
    country: "Belgique",
    region: "Europe",
    detail: "Selon vos dates",
    price: "sur devis",
    message: "Bonjour FB Travel, je souhaite un devis pour un vol Bangui – Bruxelles.",
    image: "/images/destinations/bruxelles.jpg",
    imageAlt: "L'Atomium, à Bruxelles",
  },
  {
    code: "ABJ",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    region: "Afrique de l'Ouest",
    detail: "Selon vos dates",
    price: "sur devis",
    message: "Bonjour FB Travel, je souhaite un devis pour un vol Bangui – Abidjan.",
    image: "/images/destinations/abidjan.jpg",
    imageAlt: "La cathédrale Saint-Paul, à Abidjan",
  },
  {
    code: "LBV",
    city: "Libreville",
    country: "Gabon",
    region: "Afrique centrale",
    detail: "Selon vos dates",
    price: "sur devis",
    message: "Bonjour FB Travel, je souhaite un devis pour un vol Bangui – Libreville.",
    image: "/images/destinations/libreville.jpg",
    imageAlt: "La Flamme de la Paix, à Libreville",
  },
  {
    code: "NSI",
    city: "Yaoundé",
    country: "Cameroun",
    region: "Afrique centrale",
    detail: "Selon vos dates",
    price: "sur devis",
    message: "Bonjour FB Travel, je souhaite un devis pour un vol Bangui – Yaoundé.",
    image: "/images/destinations/yaounde.jpg",
    imageAlt: "Le Palais de l'Unité, à Yaoundé",
  },
];

export const hotelIdeas = [
  {
    city: "Dubaï",
    country: "Émirats arabes unis",
    image: "/images/dubai.jpg",
    headline: "Skyline et marina",
    text: "Hôtels proches des quartiers d'affaires et des centres commerciaux.",
    tag: "Moyen-Orient",
  },
  {
    city: "Paris",
    country: "France",
    image: "/images/paris.jpg",
    headline: "Au cœur de la ville",
    text: "Adresses centrales, bien desservies, pour un séjour touristique ou professionnel.",
    tag: "Europe",
  },
  {
    city: "Tokyo",
    country: "Japon",
    image: "/images/tokyo.jpg",
    headline: "Modernité et quartiers",
    text: "Du capsule hotel à l'adresse haut de gamme, selon votre budget.",
    tag: "Asie",
  },
  {
    city: "New York",
    country: "États-Unis",
    image: "/images/new-york.jpg",
    headline: "Manhattan pratique",
    text: "Hôtels bien placés pour vos rendez-vous et vos visites.",
    tag: "Amériques",
  },
  {
    city: "Bali",
    country: "Indonésie",
    image: "/images/beach.jpg",
    headline: "Resorts face à la mer",
    text: "Séjours balnéaires, villas et hôtels pour couples ou familles.",
    tag: "Asie",
  },
  {
    city: "Santorin",
    country: "Grèce",
    image: "/images/hotel-resort.jpg",
    headline: "Vue mer et calme",
    text: "Petits hôtels et resorts pour une pause hors du quotidien.",
    tag: "Europe",
  },
];

export const sightIdeas = [
  {
    city: "Rome",
    country: "Italie",
    image: "/images/rome.jpg",
    text: "Ruines antiques, musées et cuisine : la ville se visite très bien à pied.",
    tag: "Histoire",
  },
  {
    city: "Istanbul",
    country: "Turquie",
    image: "/images/istanbul.jpg",
    text: "Deux continents, des bazars, des bateaux : un city break qui change.",
    tag: "Culture",
  },
  {
    city: "Barcelone",
    country: "Espagne",
    image: "/images/barcelone.jpg",
    text: "Architecture, marchés et plage, à combiner sur un long week-end.",
    tag: "City break",
  },
  {
    city: "Paris",
    country: "France",
    image: "/images/paris.jpg",
    text: "Monuments, musées et quartiers : de quoi remplir un premier séjour.",
    tag: "City break",
  },
  {
    city: "Tokyo",
    country: "Japon",
    image: "/images/tokyo.jpg",
    text: "Quartiers animés, gastronomie et temples, pour un voyage dépaysant.",
    tag: "Culture",
  },
  {
    city: "Dubaï",
    country: "Émirats arabes unis",
    image: "/images/dubai.jpg",
    text: "Désert, marina et grands projets : une destination facile depuis l'Afrique.",
    tag: "Découverte",
  },
];

export const tours = [
  {
    id: "maroc",
    category: "Affaires",
    country: "Maroc",
    city: "Casablanca & Rabat",
    title: "Business Tour Maroc",
    text: "L'Éveil des Échanges, édition spéciale pour les femmes entrepreneures de Bangui : rencontres, visites et temps fort du programme.",
    highlights: ["Vols et hôtels groupés", "Transferts et accompagnement", "Programme de rencontres"],
    image: "/images/destinations/casablanca.jpg",
    imageAlt: "La mosquée Hassan II, à Casablanca",
  },
  {
    id: "paris",
    category: "Culture",
    country: "France",
    city: "Paris",
    title: "Paris, musées et boulevards",
    text: "Un premier séjour pensé pour ceux qui veulent voir l'essentiel sans courir : monuments, musées et quartiers vivants.",
    highlights: ["Hôtel central", "Visites guidées sur demande", "Assurance voyage"],
    image: "/images/destinations/paris.jpg",
    imageAlt: "La tour Eiffel et la Seine, à Paris",
  },
  {
    id: "douala",
    category: "Ville",
    country: "Cameroun",
    city: "Douala",
    title: "Douala en quelques jours",
    text: "La capitale économique camerounaise pour un déplacement professionnel ou une courte escapade, avec un vol direct depuis Bangui.",
    highlights: ["Aller-retour ECAir", "Hôtel selon budget", "Transfert aéroport"],
    image: "/images/destinations/douala.jpg",
    imageAlt: "Le pont sur le fleuve Wouri, à Douala",
  },
  {
    id: "dakar",
    category: "Balnéaire",
    country: "Sénégal",
    city: "Dakar",
    title: "Dakar et la côte",
    text: "Une ville ouverte sur l'Atlantique, à combiner avec les plages et les marchés de la presqu'île.",
    highlights: ["Vol avec escale", "Hôtel en ville ou en bord de mer", "Location de voiture"],
    image: "/images/destinations/dakar.jpg",
    imageAlt: "Le monument de la Renaissance africaine, à Dakar",
  },
  {
    id: "istanbul",
    category: "Culture",
    country: "Turquie",
    city: "Istanbul",
    title: "Istanbul, entre deux continents",
    text: "Un séjour court pour découvrir la vieille ville, le Bosphore et les grands bazars.",
    highlights: ["Vols avec escale", "Hôtel bien situé", "Conseils de visite"],
    image: "/images/destinations/istanbul.jpg",
    imageAlt: "Sainte-Sophie, à Istanbul",
  },
  {
    id: "kigali",
    category: "Nature",
    country: "Rwanda",
    city: "Kigali",
    title: "Kigali et les collines",
    text: "Une capitale propre et calme, point de départ pour découvrir les collines du pays.",
    highlights: ["Vol RwandAir", "Hôtel en centre-ville", "Excursion sur demande"],
    image: "/images/destinations/kigali.jpg",
    imageAlt: "Le Kigali Convention Centre, à Kigali",
  },
];

export const tourCategories = ["Tous", "Affaires", "Culture", "Ville", "Balnéaire", "Nature"] as const;

export const visaSteps = [
  {
    title: "Vous nous écrivez",
    text: "Donnez-nous votre destination, vos dates et le motif du voyage.",
  },
  {
    title: "Nous listons les pièces",
    text: "Vous savez exactement quels documents réunir, sans aller-retour inutile.",
  },
  {
    title: "Nous vérifions le dossier",
    text: "Chaque pièce est contrôlée avec vous avant le dépôt.",
  },
  {
    title: "Vous suivez la décision",
    text: "Nous restons à vos côtés jusqu'à la réponse, puis nous organisons votre vol.",
  },
];

export const visaDocuments = [
  "Passeport en cours de validité et photos d'identité récentes",
  "Formulaire de demande rempli selon le pays de destination",
  "Réservation de vol et d'hôtel quand l'ambassade les exige",
  "Attestation d'assurance voyage et justificatifs de ressources",
  "Invitation ou documents professionnels selon le motif du séjour",
];

export const trustPoints = [
  "Agence locale, à Bangui",
  "Un seul interlocuteur pour tout le voyage",
  "Réponse directe sur WhatsApp ou par téléphone",
  "Dossiers visa vérifiés avec vous avant dépôt",
];

export const faqs = [
  {
    q: "Comment réserver un billet d'avion ?",
    a: "Écrivez-nous sur WhatsApp, appelez-nous ou passez à l'agence, au Parc du Cinquantenaire. Indiquez votre destination et vos dates : nous revenons vers vous avec les options disponibles et le prix.",
  },
  {
    q: "Les prix affichés sont-ils définitifs ?",
    a: "Ce sont des prix de départ. Le tarif exact dépend de la date, de la compagnie et de la disponibilité au moment de la réservation. Demandez un devis, il est gratuit.",
  },
  {
    q: "Faites-vous l'assistance visa pour toutes les destinations ?",
    a: "Les conditions changent d'un pays à l'autre. Contactez-nous avec votre destination : nous vous indiquons les pièces à fournir et les démarches possibles.",
  },
  {
    q: "Puis-je réserver hôtel et voiture en même temps que mon vol ?",
    a: "Oui. Nous regroupons vol, hôtel, assurance et location de voiture dans une même demande, avec un seul interlocuteur.",
  },
  {
    q: "Où se trouve l'agence ?",
    a: "Parc du Cinquantenaire, à Lakouanga, face au restaurant Cafrina, à Bangui.",
  },
  {
    q: "Puis-je réserver un vol sans payer en ligne ?",
    a: "Oui. Vous validez votre devis avec l'agence, puis vous réglez selon les modalités convenues. Aucune donnée bancaire n'est demandée sur ce site.",
  },
  {
    q: "Combien de temps faut-il pour obtenir un devis ?",
    a: "Nous répondons dès que possible pendant les heures d'ouverture. Pour une demande urgente, le plus simple est de nous appeler ou d'écrire sur WhatsApp en précisant vos dates.",
  },
  {
    q: "Puis-je réserver depuis l'étranger ?",
    a: "Oui. Nous accompagnons aussi les voyageurs qui partent ou arrivent à Bangui depuis l'étranger. Tout se règle à distance, par téléphone, e-mail ou WhatsApp.",
  },
] as const;
