// FR sections
import frMeta from './fr/meta.json';
import frNav from './fr/nav.json';
import frHomeHero from './fr/homeHero.json';
import frServicesHero from './fr/servicesHero.json';
import frProbleme from './fr/probleme.json';
import frProblemeApps from './fr/problemeApps.json';
import frMethode from './fr/methode.json';
import frMethodeApps from './fr/methodeApps.json';
import frFormules from './fr/formules.json';
import frParcoursServices from './fr/parcoursServices.json';
import frParcoursApps from './fr/parcoursApps.json';
import frAppsHero from './fr/appsHero.json';
import frAppsServices from './fr/appsServices.json';
import frPortfolio from './fr/portfolio.json';
import frContact from './fr/contact.json';
import frContactServices from './fr/contactServices.json';
import frContactApps from './fr/contactApps.json';
import frFooter from './fr/footer.json';

// EN sections
import enMeta from './en/meta.json';
import enNav from './en/nav.json';
import enHomeHero from './en/homeHero.json';
import enServicesHero from './en/servicesHero.json';
import enProbleme from './en/probleme.json';
import enProblemeApps from './en/problemeApps.json';
import enMethode from './en/methode.json';
import enMethodeApps from './en/methodeApps.json';
import enFormules from './en/formules.json';
import enParcoursServices from './en/parcoursServices.json';
import enParcoursApps from './en/parcoursApps.json';
import enAppsHero from './en/appsHero.json';
import enAppsServices from './en/appsServices.json';
import enPortfolio from './en/portfolio.json';
import enContact from './en/contact.json';
import enContactServices from './en/contactServices.json';
import enContactApps from './en/contactApps.json';
import enFooter from './en/footer.json';

const translations: Record<string, Record<string, unknown>> = {
  fr: {
    meta: frMeta,
    nav: frNav,
    homeHero: frHomeHero,
    servicesHero: frServicesHero,
    probleme: frProbleme,
    problemeApps: frProblemeApps,
    methode: frMethode,
    methodeApps: frMethodeApps,
    formules: frFormules,
    parcoursServices: frParcoursServices,
    parcoursApps: frParcoursApps,
    appsHero: frAppsHero,
    appsServices: frAppsServices,
    portfolio: frPortfolio,
    contact: frContact,
    contactServices: frContactServices,
    contactApps: frContactApps,
    footer: frFooter,
  },
  en: {
    meta: enMeta,
    nav: enNav,
    homeHero: enHomeHero,
    servicesHero: enServicesHero,
    probleme: enProbleme,
    problemeApps: enProblemeApps,
    methode: enMethode,
    methodeApps: enMethodeApps,
    formules: enFormules,
    parcoursServices: enParcoursServices,
    parcoursApps: enParcoursApps,
    appsHero: enAppsHero,
    appsServices: enAppsServices,
    portfolio: enPortfolio,
    contact: enContact,
    contactServices: enContactServices,
    contactApps: enContactApps,
    footer: enFooter,
  },
};

export type Locale = 'fr' | 'en';

export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: unknown = translations[locale];
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof value === 'string' ? value : key;
}

export function tArray(locale: Locale, key: string): string[] {
  const keys = key.split('.');
  let value: unknown = translations[locale];
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = (value as Record<string, unknown>)[k];
    } else {
      return [];
    }
  }
  return Array.isArray(value) ? value : [];
}

export function tObj<T = unknown>(locale: Locale, key: string): T {
  const keys = key.split('.');
  let value: unknown = translations[locale];
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = (value as Record<string, unknown>)[k];
    } else {
      return {} as T;
    }
  }
  return value as T;
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split('/');
  if (locale === 'en') return 'en';
  return 'fr';
}

export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === 'fr') return path;
  return `/en${path}`;
}
