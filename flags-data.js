/**
 * CoreOpinion Flag Recommendations Data
 * =====================================
 * Each flag has an `id`, `name`, `code` (matches the image file
 * /images/flags/<code>.webp), a `description`, and a `links` object mapping
 * region codes to Amazon affiliate short links.
 *
 * TO ADD A NEW FLAG:
 *   Copy any flag object below, change the fields, and paste your Amazon
 *   Associates short link (amzn.to/xxxxx) into `links`. Flag images already
 *   exist for these codes:
 *     us, uk, ca, au, nz, se, dk, no, fi, de, at, fr, es, it, ie, nl
 *   The page picks up new entries automatically.
 *
 * REGION FALLBACK:
 *   If a flag has no link for the visitor's chosen Amazon store, the page
 *   falls back to the `us` link, then to a search on the local store.
 */

const FLAGS_DATA = [
  {
    id: "us-flag",
    name: "United States Flag",
    code: "us",
    description: "The Stars and Stripes. Fifty stars for the fifty states, thirteen stripes for the original thirteen colonies - the national flag of the United States.",
    links: {
      us: "https://amzn.to/4fBgTN9"
    }
  }
];

/**
 * Region configuration - maps region codes to display info and Amazon domains.
 * Used to build fallback URLs when a flag has no link for the chosen store.
 */
const FLAG_REGIONS = {
  us: { label: "United States", flag: "🇺🇸", domain: "amazon.com" },
  uk: { label: "United Kingdom", flag: "🇬🇧", domain: "amazon.co.uk" },
  ca: { label: "Canada", flag: "🇨🇦", domain: "amazon.ca" },
  au: { label: "Australia", flag: "🇦🇺", domain: "amazon.com.au" },
  nz: { label: "New Zealand", flag: "🇳🇿", domain: "amazon.com.au" },
  se: { label: "Sweden", flag: "🇸🇪", domain: "amazon.se" },
  dk: { label: "Denmark", flag: "🇩🇰", domain: "amazon.de" },
  no: { label: "Norway", flag: "🇳🇴", domain: "amazon.de" },
  fi: { label: "Finland", flag: "🇫🇮", domain: "amazon.de" },
  de: { label: "Germany", flag: "🇩🇪", domain: "amazon.de" },
  at: { label: "Austria", flag: "🇦🇹", domain: "amazon.de" },
  fr: { label: "France", flag: "🇫🇷", domain: "amazon.fr" },
  es: { label: "Spain", flag: "🇪🇸", domain: "amazon.es" },
  it: { label: "Italy", flag: "🇮🇹", domain: "amazon.it" },
  ie: { label: "Ireland", flag: "🇮🇪", domain: "amazon.co.uk" },
  nl: { label: "Netherlands", flag: "🇳🇱", domain: "amazon.nl" }
};
