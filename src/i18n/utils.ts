// FR sections
import frMeta from './fr/meta.json';
import frNav from './fr/nav.json';
import frHomeHero from './fr/homeHero.json';
import frServicesHero from './fr/servicesHero.json';
import frProbleme from './fr/probleme.json';
import frMethode from './fr/methode.json';
import frFormules from './fr/formules.json';
import frParcours from './fr/parcours.json';
import frAppsHero from './fr/appsHero.json';
import frAppsServices from './fr/appsServices.json';
import frPortfolio from './fr/portfolio.json';
import frContact from './fr/contact.json';
import frFooter from './fr/footer.json';

// EN sections
import enMeta from './en/meta.json';
import enNav from './en/nav.json';
import enHomeHero from './en/homeHero.json';
import enServicesHero from './en/servicesHero.json';
import enProbleme from './en/probleme.json';
import enMethode from './en/methode.json';
import enFormules from './en/formules.json';
import enParcours from './en/parcours.json';
import enAppsHero from './en/appsHero.json';
import enAppsServices from './en/appsServices.json';
import enPortfolio from './en/portfolio.json';
import enContact from './en/contact.json';
import enFooter from './en/footer.json';

const translations: Record<string, Record<string, unknown>> = {
  fr: {
    meta: frMeta,
    nav: frNav,
    homeHero: frHomeHero,
    servicesHero: frServicesHero,
    probleme: frProbleme,
    methode: frMethode,
    formules: frFormules,
    parcours: frParcours,
    appsHero: frAppsHero,
    appsServices: frAppsServices,
    portfolio: frPortfolio,
    contact: frContact,
    footer: frFooter,
  },
  en: {
    meta: enMeta,
    nav: enNav,
    homeHero: enHomeHero,
    servicesHero: enServicesHero,
    probleme: enProbleme,
    methode: enMethode,
    formules: enFormules,
    parcours: enParcours,
    appsHero: enAppsHero,
    appsServices: enAppsServices,
    portfolio: enPortfolio,
    contact: enContact,
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
