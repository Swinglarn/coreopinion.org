/**
 * CoreOpinion Book Recommendations Data
 * ======================================
 * Each book has an `id`, `title`, `author`, `year`, `category`, `description`,
 * `isbn` (for cover images), and `links` object mapping region codes to
 * Amazon affiliate short links.
 *
 * TO UPDATE LINKS:
 *   Replace the placeholder "https://www.amazon.com/dp/ASIN?tag=YOUR_TAG"
 *   URLs with your real Amazon Associates short links (amzn.to/xxxxx).
 *
 * TO ADD A NEW BOOK:
 *   Copy any book object below, change the fields, and add your affiliate
 *   links. The page will automatically pick it up.
 *
 * SUPPORTED REGIONS:
 *   us, uk, ca, au, nz, se, de, at, fr, es, it, ie, nl, dk, no, fi
 *   If a region has no link, the page falls back to the `us` link.
 */

const BOOKS_DATA = [
  {
    id: "the-prince",
    title: "The Prince",
    author: "Niccolò Machiavelli",
    year: 1532,
    category: "Political Strategy",
    description: "The original handbook on political power. Machiavelli's unflinching analysis of leadership, pragmatism, and the tension between morality and effective governance remains endlessly debated — and disturbingly relevant.",
    isbn: "9781954839144",
    links: {
      us: "https://amzn.to/441JjuH"
    }
  },
  {
    id: "nineteen-eighty-four",
    title: "Nineteen Eighty-Four",
    author: "George Orwell",
    year: 1949,
    category: "Political Fiction",
    description: "The defining dystopian novel on totalitarianism, surveillance, and the manipulation of truth. Orwell's vision of Oceania — with its Thought Police, Newspeak, and perpetual war — remains disturbingly relevant to modern political debates.",
    isbn: "9781840228229",
    links: {
      us: "https://amzn.to/4oZOB3x"
    }
  },
  {
    id: "republic",
    title: "Republic",
    author: "Plato",
    year: -375,
    category: "Philosophy",
    description: "The foundational text of Western political philosophy. Through Socratic dialogue, Plato explores justice, the ideal state, the nature of the soul, and why philosophers should rule — arguments that still shape how we think about governance.",
    isbn: "9780140455113",
    links: {
      us: "https://amzn.to/4wp8Fih"
    }
  },
  {
    id: "leviathan",
    title: "Leviathan",
    author: "Thomas Hobbes",
    year: 1651,
    category: "Political Philosophy",
    description: "Hobbes argues that without a powerful sovereign, human life would be 'solitary, poor, nasty, brutish, and short.' His social contract theory — trading freedom for security — remains the bedrock of modern state legitimacy debates.",
    isbn: "9780140431957",
    links: {
      us: "https://amzn.to/4wns4QE"
    }
  },
  {
    id: "social-contract",
    title: "Of the Social Contract",
    author: "Jean-Jacques Rousseau",
    year: 1762,
    category: "Political Philosophy",
    description: "\"Man is born free, and everywhere he is in chains.\" Rousseau's radical vision of popular sovereignty and the general will directly inspired the French Revolution and continues to underpin democratic theory worldwide.",
    isbn: "9780140442014",
    links: {
      us: "https://amzn.to/4wiqgrQ"
    }
  },
  {
    id: "road-to-serfdom",
    title: "The Road to Serfdom",
    author: "Friedrich Hayek",
    year: 1944,
    category: "Economics",
    description: "Hayek's landmark argument against central planning: how even well-intentioned government control can erode individual freedom. A cornerstone text for classical liberal and libertarian thought that reshaped 20th-century politics.",
    isbn: "9780226320557",
    links: {
      us: "https://amzn.to/4vG77Ac"
    }
  },
  {
    id: "origins-of-totalitarianism",
    title: "The Origins of Totalitarianism",
    author: "Hannah Arendt",
    year: 1951,
    category: "Political History",
    description: "Arendt traces how antisemitism, imperialism, and the collapse of the nation-state gave rise to totalitarian movements. Her analysis of propaganda, loneliness, and the mechanics of mass control is chillingly prescient.",
    isbn: "9780156701532",
    links: {
      us: "https://amzn.to/3StPZ2b"
    }
  },
  {
    id: "federalist-papers",
    title: "The Federalist Papers",
    author: "Alexander Hamilton, James Madison & John Jay",
    year: 1788,
    category: "Constitutional Theory",
    description: "The 85 essays that argued for ratification of the U.S. Constitution. A masterclass in republican government design — separation of powers, federalism, checks and balances — that shaped the world's most influential democracy.",
    isbn: "9780451528810",
    links: {
      us: "https://amzn.to/4oVPIBd"
    }
  },
  {
    id: "communist-manifesto",
    title: "The Communist Manifesto",
    author: "Karl Marx & Friedrich Engels",
    year: 1848,
    category: "Political Economy",
    description: "The pamphlet that shook the world. Marx and Engels' call to class consciousness, critique of capitalism, and vision of a classless society has shaped revolutions, governments, and political debate for nearly two centuries.",
    isbn: "9780717802418",
    links: {
      us: "https://amzn.to/4oZjRiY"
    }
  },
  {
    id: "dictators-handbook",
    title: "The Dictator's Handbook",
    author: "Bruce Bueno de Mesquita & Alastair Smith",
    year: 2011,
    category: "Political Science",
    description: "Why bad behavior is almost always good politics. A provocative, data-driven framework explaining why leaders — from dictators to democrats — act the way they do. It's not about ideology; it's about staying in power.",
    isbn: "9781610390446",
    links: {
      us: "https://amzn.to/4ggB2dx"
    }
  }
];

/**
 * Region configuration — maps region codes to display info and Amazon domains.
 * Used by the books page to build the region selector and construct fallback URLs.
 */
const REGIONS = {
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
