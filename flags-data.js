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
      us: "https://amzn.to/4fBgTN9",
      uk: "https://link.amazon/B0bywKyX1",
      de: "https://link.amazon/B0hnqtNuJ",
      at: "https://link.amazon/B0hnqtNuJ",
      dk: "https://link.amazon/B0hnqtNuJ",
      no: "https://link.amazon/B0hnqtNuJ",
      fi: "https://link.amazon/B0hnqtNuJ"
    }
  },
  {
    id: "uk-flag",
    name: "United Kingdom Flag",
    code: "uk",
    description: "The Union Jack. Combining the crosses of St George, St Andrew, and St Patrick - the national flag of the United Kingdom.",
    links: {
      uk: "https://link.amazon/B073VsPCJ",
      de: "https://link.amazon/B0cDXKYuw",
      at: "https://link.amazon/B0cDXKYuw",
      dk: "https://link.amazon/B0cDXKYuw",
      no: "https://link.amazon/B0cDXKYuw",
      fi: "https://link.amazon/B0cDXKYuw"
    }
  },
  {
    id: "england-flag",
    name: "England Flag",
    code: "england",
    description: "The Cross of St George. A red cross on a white field - the national flag of England.",
    links: {
      uk: "https://link.amazon/B084TWlHa",
      de: "https://link.amazon/B0hcPIxy2",
      at: "https://link.amazon/B0hcPIxy2",
      dk: "https://link.amazon/B0hcPIxy2",
      no: "https://link.amazon/B0hcPIxy2",
      fi: "https://link.amazon/B0hcPIxy2"
    }
  },
  {
    id: "ie-flag",
    name: "Ireland Flag",
    code: "ie",
    description: "The Trídhathach. Vertical bands of green, white, and orange - the national flag of Ireland.",
    links: {
      uk: "https://link.amazon/B07OMJrOC"
    }
  },
  {
    id: "fi-flag",
    name: "Finland Flag",
    code: "fi",
    description: "The Siniristilippu. A blue Nordic cross on a white field - the national flag of Finland.",
    links: {
      se: "https://amzn.to/4yOVjxE",
      uk: "https://link.amazon/B07hXbZAB",
      de: "https://link.amazon/B03lBBR3T",
      at: "https://link.amazon/B03lBBR3T",
      dk: "https://link.amazon/B03lBBR3T",
      no: "https://link.amazon/B03lBBR3T",
      fi: "https://link.amazon/B03lBBR3T"
    }
  },
  {
    id: "se-flag",
    name: "Sweden Flag",
    code: "se",
    description: "The Sveriges flagga. A yellow Nordic cross on a blue field - the national flag of Sweden.",
    links: {
      se: "https://amzn.to/4gZoyaC",
      uk: "https://link.amazon/B0fQSUqLI",
      de: "https://link.amazon/B07gEvod2",
      at: "https://link.amazon/B07gEvod2",
      dk: "https://link.amazon/B07gEvod2",
      no: "https://link.amazon/B07gEvod2",
      fi: "https://link.amazon/B07gEvod2"
    }
  },
  {
    id: "ca-flag",
    name: "Canada Flag",
    code: "ca",
    description: "The Maple Leaf. A red maple leaf on a white field, flanked by red bands - the national flag of Canada.",
    links: {
      uk: "https://link.amazon/B02UdTV14",
      de: "https://link.amazon/B0i157jPz",
      at: "https://link.amazon/B0i157jPz",
      dk: "https://link.amazon/B0i157jPz",
      no: "https://link.amazon/B0i157jPz",
      fi: "https://link.amazon/B0i157jPz"
    }
  },
  {
    id: "au-flag",
    name: "Australia Flag",
    code: "au",
    description: "The Blue Ensign. The Union Jack and Commonwealth Star alongside the Southern Cross - the national flag of Australia.",
    links: {
      uk: "https://link.amazon/B03tqFykg",
      de: "https://link.amazon/B0aVVZCGx",
      at: "https://link.amazon/B0aVVZCGx",
      dk: "https://link.amazon/B0aVVZCGx",
      no: "https://link.amazon/B0aVVZCGx",
      fi: "https://link.amazon/B0aVVZCGx"
    }
  },
  {
    id: "nz-flag",
    name: "New Zealand Flag",
    code: "nz",
    description: "The Blue Ensign. The Union Jack and the Southern Cross in red on a blue field - the national flag of New Zealand.",
    links: {
      uk: "https://link.amazon/B043mvvbn"
    }
  },
  {
    id: "de-flag",
    name: "Germany Flag",
    code: "de",
    description: "The Bundesflagge. Horizontal bands of black, red, and gold - the national flag of Germany.",
    links: {
      uk: "https://link.amazon/B07JgHMgn",
      de: "https://link.amazon/B09y8bkuO",
      at: "https://link.amazon/B09y8bkuO",
      dk: "https://link.amazon/B09y8bkuO",
      no: "https://link.amazon/B09y8bkuO",
      fi: "https://link.amazon/B09y8bkuO"
    }
  },
  {
    id: "at-flag",
    name: "Austria Flag",
    code: "at",
    description: "The Bindenschild. A red-white-red horizontal tricolour - the national flag of Austria.",
    links: {
      uk: "https://link.amazon/B0icyo4lL",
      de: "https://link.amazon/B005c72Z3",
      at: "https://link.amazon/B005c72Z3",
      dk: "https://link.amazon/B005c72Z3",
      no: "https://link.amazon/B005c72Z3",
      fi: "https://link.amazon/B005c72Z3"
    }
  },
  {
    id: "fr-flag",
    name: "France Flag",
    code: "fr",
    description: "Le Drapeau Tricolore. Vertical bands of blue, white, and red - the national flag of France.",
    links: {
      uk: "https://link.amazon/B0hkLcPkn"
    }
  },
  {
    id: "es-flag",
    name: "Spain Flag",
    code: "es",
    description: "La Rojigualda. Horizontal bands of red and yellow with the national coat of arms - the national flag of Spain.",
    links: {
      uk: "https://link.amazon/B04qmdvlK"
    }
  },
  {
    id: "it-flag",
    name: "Italy Flag",
    code: "it",
    description: "Il Tricolore. Vertical bands of green, white, and red - the national flag of Italy.",
    links: {
      uk: "https://link.amazon/B0cO1RAWf"
    }
  },
  {
    id: "nl-flag",
    name: "Netherlands Flag",
    code: "nl",
    description: "De Nederlandse driekleur. Horizontal bands of red, white, and blue - the national flag of the Netherlands.",
    links: {
      uk: "https://link.amazon/B05hGqntI",
      de: "https://link.amazon/B0hglq7vi",
      at: "https://link.amazon/B0hglq7vi",
      dk: "https://link.amazon/B0hglq7vi",
      no: "https://link.amazon/B0hglq7vi",
      fi: "https://link.amazon/B0hglq7vi"
    }
  },
  {
    id: "dk-flag",
    name: "Denmark Flag",
    code: "dk",
    description: "The Dannebrog. A white Nordic cross on a red field - the national flag of Denmark.",
    links: {
      uk: "https://link.amazon/B065m8diu",
      de: "https://link.amazon/B0c88n6Ru",
      at: "https://link.amazon/B0c88n6Ru",
      dk: "https://link.amazon/B0c88n6Ru",
      no: "https://link.amazon/B0c88n6Ru",
      fi: "https://link.amazon/B0c88n6Ru"
    }
  },
  {
    id: "no-flag",
    name: "Norway Flag",
    code: "no",
    description: "The Norwegian flag. A blue Nordic cross fimbriated in white on a red field - the national flag of Norway.",
    links: {
      uk: "https://link.amazon/B05XxAYFY",
      de: "https://link.amazon/B09JBLr6v",
      at: "https://link.amazon/B09JBLr6v",
      dk: "https://link.amazon/B09JBLr6v",
      no: "https://link.amazon/B09JBLr6v",
      fi: "https://link.amazon/B09JBLr6v"
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
