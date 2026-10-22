export type PhotoCredit = {
  landmark: string;
  author: string;
  license: string;
  licenseUrl?: string;
  page: string;
};

// Photographies de Wikimedia Commons, utilisées sous leur licence respective.
// Chaque entrée est affichée sur /credits-photos.
export const photoCredits: PhotoCredit[] = [
  {
    landmark: "Douala — pont sur le Wouri",
    author: "Steve Mvondo",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    page: "https://commons.wikimedia.org/wiki/File%3APont_Wouri_1.jpg",
  },
  {
    landmark: "Paris — tour Eiffel et pont Alexandre III",
    author: "Getfunky Paris",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    page: "https://commons.wikimedia.org/wiki/File%3AEiffel_Tower_and_Pont_Alexandre_III_at_night.jpg",
  },
  {
    landmark: "Dakar — monument de la Renaissance africaine",
    author: "Richard N Horne",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    page: "https://commons.wikimedia.org/wiki/File%3AThe_African_Renaissance_Monument.jpg",
  },
  {
    landmark: "Casablanca — mosquée Hassan II",
    author: "OussamaHamama",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    page: "https://commons.wikimedia.org/wiki/File%3AWhispers_of_Gold_-_Hassan_II_Mosque_at_Dusk.jpg",
  },
  {
    landmark: "Kigali — Kigali Convention Centre",
    author: "IGANZE",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    page: "https://commons.wikimedia.org/wiki/File%3AKigali_Convention_Center.jpg",
  },
  {
    landmark: "Istanbul — Sainte-Sophie",
    author: "Adli Wahid",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    page: "https://commons.wikimedia.org/wiki/File%3AHagia_Sophia_%28228968325%29.jpeg",
  },
  {
    landmark: "Dubaï — Burj Khalifa",
    author: "ECWiki1",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    page: "https://commons.wikimedia.org/wiki/File%3ABurj_Khalifa_Dubai%2C_UAE_at_Sunset_001_by_Eric_Chamchoum.jpg",
  },
  {
    landmark: "Addis-Abeba — cathédrale Medhane Alem",
    author: "Radosław Botev",
    license: "CC BY 3.0 pl",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/pl/deed.en",
    page: "https://commons.wikimedia.org/wiki/File%3AMedhane_Alem_Cathedral_Addis_Ababa_%281%29.jpg",
  },
  {
    landmark: "Bruxelles — Atomium",
    author: "Diego Delso",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    page: "https://commons.wikimedia.org/wiki/File%3AAtomium%2C_Bruselas%2C_B%C3%A9lgica%2C_2021-12-15%2C_DD_148-150_HDR.jpg",
  },
  {
    landmark: "Abidjan — cathédrale Saint-Paul",
    author: "Edison McCullen",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    page: "https://commons.wikimedia.org/wiki/File%3ACath%C3%A9drale_Saint-Paul_d%27Abidjan_en_vue_panoramique.jpg",
  },
  {
    landmark: "Libreville — Flamme de la Paix",
    author: "Daniel Beloumou / Union européenne, 2023",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    page: "https://commons.wikimedia.org/wiki/File%3AThe_Flame_of_Peace_sculpture_on_the_Omar_Bongo_Triumphal_Boulevard_-_2023.jpg",
  },
  {
    landmark: "Yaoundé — Palais de l'Unité",
    author: "Fotsingboris",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    page: "https://commons.wikimedia.org/wiki/File%3APalais_pr%C3%A9sidentiel_du_Cameroun.jpg",
  },
];
