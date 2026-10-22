import type { Locale } from "./i18n";
import {
  destinations,
  faqs,
  heroSlides,
  hotelIdeas,
  offers,
  partners,
  services,
  sightIdeas,
  testimonials,
  tourCategories,
  tours,
  trustPoints,
  visaDocuments,
  visaSteps,
  type Content,
} from "./site";
import { en } from "./site-en";

const fr: Content = {
  services,
  offers,
  destinations,
  hotelIdeas,
  sightIdeas,
  tours,
  tourCategories,
  visaSteps,
  visaDocuments,
  heroSlides,
  testimonials,
  partners,
  trustPoints,
  faqs,
};

export function getContent(locale: Locale): Content {
  return locale === "fr" ? fr : en;
}
