export type Locale = 'nl' | 'en'

export const ui = {
  nav: {
    discover:   { nl: 'Ontdek',      en: 'Discover' },
    rental:     { nl: 'Verhuur',     en: 'Rental' },
    rules:      { nl: 'Speelregels', en: 'Rules' },
    contact:    { nl: 'Contact',     en: 'Contact' },
    login:      { nl: 'Inloggen',    en: 'Log in' },
    logout:     { nl: 'Uitloggen',   en: 'Log out' },
    buyTicket:  { nl: 'Koop een kaartje', en: 'Buy a ticket' },
    closeMenu:  { nl: 'Menu sluiten', en: 'Close menu' },
    openMenu:   { nl: 'Menu openen',  en: 'Open menu' },
  },
  page: {
    rulesTitle:    { nl: 'Speelregels',           en: 'Rules' },
    rentalTitle:   { nl: 'Verhuur',               en: 'Rental' },
    contactTitle:  { nl: 'Contact',               en: 'Contact' },
    homeTitle:     { nl: 'Speeltuin Burcht ter Cleeff — Haarlem', en: 'Playground Burcht ter Cleeff — Haarlem' },
  },
}

export function t(key: { nl: string; en: string }, locale: Locale): string {
  return key[locale]
}
