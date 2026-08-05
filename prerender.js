/**
 * CoreOpinion Prerenderer
 * =======================
 * Emits static HTML for every party, party country hub, and ideology page.
 *
 * Why this exists: party.html and ideology.html are client-rendered shells.
 * Every /party/* and /ideology/* URL used to serve the same ~86 words of
 * navigation with an identical <title> and a canonical pointing elsewhere,
 * so crawlers saw dozens of empty duplicates instead of the long-form
 * content in party-data.js and ideology-data.js. This script writes the
 * real article HTML, unique metadata, and per-page schema into the shell at
 * build time. The client scripts still run and re-render on load, so runtime
 * behaviour is unchanged.
 *
 * Templates live in src/shells/. Do not edit the generated files at
 * party/, parties/, ideology/, party.html, parties.html or ideology.html
 * directly; edit src/shells/ or the data files and rebuild.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE = 'https://coreopinion.org';

// --- Load the browser data files into Node ------------------------------

function loadGlobals(file, names) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const ret = '{' + names.map(n => `${n}: typeof ${n} !== 'undefined' ? ${n} : null`).join(', ') + '}';
  return new Function(src + ';return ' + ret + ';')();
}

const { PARTY_DATA, PARTY_COUNTRIES, PARTY_IMAGES } = loadGlobals(
  'party-data.js', ['PARTY_DATA', 'PARTY_COUNTRIES', 'PARTY_IMAGES']
);
const { IDEOLOGY_DATA } = loadGlobals('ideology-data.js', ['IDEOLOGY_DATA']);

// --- Small HTML helpers, mirroring the client renderers -----------------

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Split on blank lines the same way the client fmt() does.
function fmt(text) {
  if (!text) return '';
  return String(text).split('\n\n')
    .map(p => '<p>' + esc(p.trim()) + '</p>').join('');
}

function positionLabel(v, low, high, mid) {
  if (v <= -0.3) return low;
  if (v >= 0.3) return high;
  return mid;
}

// --- Shell injection ----------------------------------------------------

/**
 * Replace one attribute on the tag carrying the given id. Operates on the
 * single tag only, so neighbouring markup is never touched.
 */
function setAttrById(html, id, attr, value) {
  const re = new RegExp('(<[^>]*\\bid="' + id + '"[^>]*>)');
  return html.replace(re, (tag) => {
    const attrRe = new RegExp('(\\b' + attr + '=")[^"]*(")');
    if (attrRe.test(tag)) return tag.replace(attrRe, '$1' + value.replace(/\$/g, '$$$$') + '$2');
    return tag.replace(/\s*\/?>$/, ` ${attr}="${value}">`);
  });
}

function setTitle(html, title) {
  return html.replace(/<title>[\s\S]*?<\/title>/, '<title>' + esc(title) + '</title>');
}

function setSchema(html, schema) {
  const json = JSON.stringify(schema, null, 2);
  return html.replace(
    /(<script id="page-schema" type="application\/ld\+json">)[\s\S]*?(<\/script>)/,
    (_m, open, close) => open + '\n' + json + '\n' + close
  );
}

function setBreadcrumb(html, inner) {
  return html.replace(
    /(<span id="bc-current">)[\s\S]*?(<\/span>)/,
    (_m, open, close) => open + inner + close
  );
}

/** Swap the loading placeholder for real prerendered markup. */
function setArticle(html, inner) {
  const re = /<div class="ideology-loading">[\s\S]*?<\/div>/;
  if (!re.test(html)) throw new Error('Article placeholder not found in shell');
  return html.replace(re, inner);
}

/** Apply the full head metadata set shared by every generated page. */
function applyMeta(html, { title, desc, keywords, url }) {
  html = setTitle(html, title);
  html = setAttrById(html, 'page-desc', 'content', esc(desc));
  if (keywords) html = setAttrById(html, 'page-keywords', 'content', esc(keywords));
  html = setAttrById(html, 'page-canonical', 'href', url);
  html = setAttrById(html, 'og-url', 'content', url);
  html = setAttrById(html, 'og-title', 'content', esc(title));
  html = setAttrById(html, 'og-desc', 'content', esc(desc));
  html = setAttrById(html, 'tw-title', 'content', esc(title));
  html = setAttrById(html, 'tw-desc', 'content', esc(desc));
  return html;
}

const WEBSITE_NODE = {
  '@type': 'WebSite',
  '@id': SITE + '/#website',
  url: SITE + '/',
  name: 'CoreOpinion',
  publisher: { '@id': SITE + '/#organization' }
};
const ORG_NODE = {
  '@type': 'Organization',
  '@id': SITE + '/#organization',
  name: 'CoreOpinion',
  url: SITE + '/'
};

function writePage(relPath, html) {
  const outPath = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  return html.length;
}

// --- Party profile ------------------------------------------------------

function renderPartyArticle(data) {
  const countryHub = '/parties/' + data.country;
  const testUrl = '/' + data.country;

  const tags = (data.ideologyTags || [])
    .map(t => '<span class="party-tag">' + esc(t) + '</span>').join('');

  const img = PARTY_IMAGES ? PARTY_IMAGES[data.slug] : null;
  let portrait = '';
  if (img) {
    const creditInner = img.source
      ? '<a href="' + esc(img.source) + '" target="_blank" rel="noopener noreferrer">' + esc(img.credit) + '</a>'
      : esc(img.credit);
    const licInner = img.licenseUrl
      ? '<a href="' + esc(img.licenseUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(img.license) + '</a>'
      : esc(img.license);
    portrait = '<figure class="party-portrait">' +
      '<img src="' + esc(img.src) + '" alt="' + esc(img.alt) + '" loading="lazy" width="300" height="385">' +
      '<figcaption>' + esc(img.caption) +
        '<span class="pc-credit">Image: ' + creditInner + ' / ' + licInner + '</span>' +
      '</figcaption></figure>';
  }

  const infobox =
    '<div class="party-infobox" style="border-left:4px solid ' + esc(data.color) + '"><dl>' +
      '<div class="row"><dt>Country</dt><dd>' + esc(data.countryName) + '</dd></div>' +
      '<div class="row"><dt>Founded</dt><dd>' + esc(data.founded) + '</dd></div>' +
      '<div class="row"><dt>Position</dt><dd>' + esc(data.position) + '</dd></div>' +
      '<div class="row"><dt>Leader</dt><dd>' + esc(data.leader) + '</dd></div>' +
      '<div class="row"><dt>Headquarters</dt><dd>' + esc(data.headquarters) + '</dd></div>' +
    '</dl><div class="party-tags">' + tags + '</div></div>';

  const positions = (data.positions || []).map(p => '<li>' + esc(p) + '</li>').join('');

  const figures = (data.figures || []).map(f =>
    '<div class="party-figure">' +
      '<h3>' + esc(f.name) + '</h3>' +
      '<p class="figure-role">' + esc(f.role) + '</p>' +
      '<p class="figure-desc">' + esc(f.desc) + '</p>' +
    '</div>').join('');

  const sources = (data.sources || []).map(s => {
    let ext = '';
    try { ext = new URL(s.url).hostname.replace(/^www\./, ''); } catch (e) { /* ignore */ }
    return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.label) + '</a>' +
      (ext ? '<span class="src-ext">' + esc(ext) + '</span>' : '') + '</li>';
  }).join('');

  const econLeft = ((data.e + 1) / 2) * 100;
  const govLeft = ((data.g + 1) / 2) * 100;
  const econWord = positionLabel(data.e, 'left-leaning', 'right-leaning', 'centrist');
  const govWord = positionLabel(data.g, 'more libertarian', 'more authoritarian', 'moderate');

  let related = '';
  const ctry = PARTY_COUNTRIES[data.country];
  if (ctry) {
    ctry.order.forEach(key => {
      const d = PARTY_DATA[key];
      if (!d || d.slug === data.slug) return;
      related += '<a href="/party/' + d.slug + '" class="ideology-nav-card" style="border-left:4px solid ' + esc(d.color) + '">' +
        '<span class="ideology-nav-quad">' + esc(d.position) + '</span>' +
        '<strong>' + esc(d.name) + '</strong></a>';
    });
  }

  return '<header class="ideology-header">' +
      '<div class="ideology-icon-badge" style="background:' + esc(data.color) + '20; color:' + esc(data.color) + '">' + esc(data.position) + '</div>' +
      '<h1>' + esc(data.name) + '</h1>' +
      '<p class="ideology-subtitle">' + esc(data.metaDesc) + '</p>' +
    '</header>' +
    '<div class="ideology-layout">' +
      '<aside class="toc" id="toc">' +
        '<div class="toc-title">Contents</div>' +
        '<a href="#overview" class="toc-link">Overview</a>' +
        '<a href="#history" class="toc-link">History</a>' +
        '<a href="#economic" class="toc-link">Economic Policy</a>' +
        '<a href="#social" class="toc-link">Social Policy</a>' +
        '<a href="#foreign" class="toc-link">Foreign Policy</a>' +
        '<a href="#positions" class="toc-link">Where They Stand</a>' +
        '<a href="#compass" class="toc-link">Compass Position</a>' +
        '<a href="#figures" class="toc-link">Key Figures</a>' +
        '<a href="#sources" class="toc-link">Sources</a>' +
      '</aside>' +
      '<div class="ideology-content" style="--check-color:' + esc(data.color) + '">' +
        '<section id="overview"><h2>Overview</h2>' + portrait + infobox + fmt(data.intro) + '</section>' +
        '<section id="history"><h2>History</h2>' + fmt(data.history) + '</section>' +
        '<section id="economic"><h2>Economic Policy</h2>' + fmt(data.economic) + '</section>' +
        '<section id="social"><h2>Social Policy</h2>' + fmt(data.social) + '</section>' +
        '<section id="foreign"><h2>Foreign Policy</h2>' + fmt(data.foreign) + '</section>' +
        '<section id="positions"><h2>Where They Stand</h2><ul class="positions-list">' + positions + '</ul></section>' +
        '<section id="electoral"><h2>Electoral Record</h2>' + fmt(data.electoral) + '</section>' +
        '<section id="compass"><h2>Position on the Political Compass</h2>' +
          '<p>' + esc(data.name) + ' sits on the <strong>' + econWord + '</strong> side on economics and is <strong>' + govWord + '</strong> on questions of social freedom and authority.</p>' +
          '<div class="compass-readout">' +
            '<div class="compass-axis">' +
              '<div class="compass-axis-label"><span>Economic left</span><span>Economic right</span></div>' +
              '<div class="compass-track"><div class="compass-dot" style="left:' + econLeft + '%; background:' + esc(data.color) + '"></div></div>' +
            '</div>' +
            '<div class="compass-axis">' +
              '<div class="compass-axis-label"><span>Libertarian</span><span>Authoritarian</span></div>' +
              '<div class="compass-track"><div class="compass-dot" style="left:' + govLeft + '%; background:' + esc(data.color) + '"></div></div>' +
            '</div>' +
          '</div>' +
          '<p class="compass-caption" style="font-size:13px;color:var(--ink-faint)">These positions are approximate and meant as a guide. Take the test to see how your own views compare.</p>' +
        '</section>' +
        '<section id="figures"><h2>Key Figures</h2><div class="figures-grid">' + figures + '</div></section>' +
        '<section id="sources"><h2>Sources and Further Reading</h2><ul class="sources-list">' + sources + '</ul></section>' +
        '<div class="cta-panel"><h3>Where do you stand?</h3>' +
          '<p>Take the CoreOpinion ' + esc(data.countryName) + ' political test to see how your views compare with ' + esc(data.name) + ' and the other parties.</p>' +
          '<a href="' + testUrl + '" class="btn-primary" style="text-decoration:none">Take the ' + esc(data.countryName) + ' Test</a>' +
        '</div>' +
        (related ? '<section id="other-parties"><h2>Other ' + esc(data.countryName) + ' Parties</h2>' +
          '<div class="ideology-nav-grid">' + related + '</div></section>' : '') +
      '</div>' +
    '</div>';
}

function buildPartyPage(shell, data) {
  const url = SITE + '/party/' + data.slug;
  const title = data.title + ' | CoreOpinion';
  const countryHub = '/parties/' + data.country;
  const img = PARTY_IMAGES ? PARTY_IMAGES[data.slug] : null;

  let html = applyMeta(shell, { title, desc: data.metaDesc, keywords: data.keywords, url });
  html = setSchema(html, {
    '@context': 'https://schema.org',
    '@graph': [
      WEBSITE_NODE, ORG_NODE,
      {
        '@type': 'Article',
        '@id': url + '#article',
        headline: data.title,
        description: data.metaDesc,
        url,
        image: SITE + (img ? img.src : '/og-image.svg'),
        about: { '@type': 'PoliticalParty', name: data.name },
        author: { '@id': SITE + '/#organization' },
        publisher: { '@id': SITE + '/#organization' },
        keywords: data.keywords,
        articleSection: 'Political Parties',
        inLanguage: 'en',
        datePublished: '2026-07-01T00:00:00+00:00',
        dateModified: '2026-07-14T00:00:00+00:00'
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: data.countryName + ' Parties', item: SITE + countryHub },
          { '@type': 'ListItem', position: 3, name: data.name, item: url }
        ]
      }
    ]
  });
  html = setBreadcrumb(html,
    '<a href="' + countryHub + '">' + esc(data.countryName) + ' Parties</a> <span class="bc-sep">/</span> ' + esc(data.name));
  return setArticle(html, renderPartyArticle(data));
}

// --- Party country hub --------------------------------------------------

function buildCountryHub(shell, ctry) {
  const url = SITE + '/parties/' + ctry.code;
  const title = ctry.title + ' | CoreOpinion';
  const otherCode = ctry.code === 'us' ? 'uk' : 'us';
  const otherName = PARTY_COUNTRIES[otherCode].name;

  const cards = ctry.order.map(key => {
    const d = PARTY_DATA[key];
    const img = PARTY_IMAGES ? PARTY_IMAGES[key] : null;
    const thumb = img ? '<img class="ph-thumb" src="' + esc(img.src) + '" alt="' + esc(img.alt) + '" loading="lazy">' : '';
    return '<a href="/party/' + d.slug + '" class="party-hub-card" style="border-left-color:' + esc(d.color) + '">' +
      thumb +
      '<p class="ph-name">' + esc(d.name) + '</p>' +
      '<p class="ph-pos">' + esc(d.position) + ' &middot; Founded ' + esc(d.founded) + '</p>' +
      '<p class="ph-sum">' + esc(d.summary) + '</p>' +
      '<span class="ph-link">Read full profile &rarr;</span></a>';
  }).join('');

  const article = '<header class="ideology-header">' +
      '<div class="ideology-icon-badge">' + ctry.flag + ' ' + esc(ctry.name) + '</div>' +
      '<h1>' + esc(ctry.name) + ' Political Parties</h1>' +
      '<p class="ideology-subtitle">' + esc(ctry.metaDesc) + '</p>' +
    '</header>' +
    '<div class="ideology-content" style="max-width:820px;margin:0 auto">' +
      fmt(ctry.intro) +
      '<div class="party-hub-grid">' + cards + '</div>' +
      '<div class="cta-panel" style="margin-top:36px"><h3>Where do you stand?</h3>' +
        '<p>Take the CoreOpinion ' + esc(ctry.name) + ' political test to see how your views compare with these parties.</p>' +
        '<a href="/' + ctry.code + '" class="btn-primary" style="text-decoration:none">Take the ' + esc(ctry.name) + ' Test</a>' +
      '</div>' +
      '<p style="margin-top:28px;font-size:15px"><a href="/parties/' + otherCode + '" class="cta-link">Explore ' + esc(otherName) + ' parties &rarr;</a></p>' +
    '</div>';

  let html = applyMeta(shell, { title, desc: ctry.metaDesc, keywords: ctry.keywords, url });
  html = setSchema(html, {
    '@context': 'https://schema.org',
    '@graph': [
      WEBSITE_NODE, ORG_NODE,
      { '@type': 'CollectionPage', '@id': url + '#page', url, name: ctry.title, description: ctry.metaDesc },
      {
        '@type': 'ItemList',
        itemListElement: ctry.order.map((key, i) => ({
          '@type': 'ListItem', position: i + 1,
          name: PARTY_DATA[key].name,
          item: SITE + '/party/' + PARTY_DATA[key].slug
        }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'Parties', item: SITE + '/parties' },
          { '@type': 'ListItem', position: 3, name: ctry.name + ' Parties', item: url }
        ]
      }
    ]
  });
  html = setBreadcrumb(html, '<a href="/parties">Parties</a> <span class="bc-sep">/</span> ' + esc(ctry.name));
  return setArticle(html, article);
}

// --- Party index --------------------------------------------------------

function buildPartyIndex(shell) {
  const url = SITE + '/parties';
  const title = 'Political Parties Explained | CoreOpinion';
  const desc = 'Clear, up-to-date guides to the major political parties: their history, ideology, and where they stand on the economy, social issues, and foreign policy.';

  const cards = Object.keys(PARTY_COUNTRIES).map(code => {
    const c = PARTY_COUNTRIES[code];
    const names = c.order.map(k => PARTY_DATA[k].shortName).join(', ');
    return '<a href="/parties/' + c.code + '" class="party-hub-card">' +
      '<p class="ph-name">' + c.flag + ' ' + esc(c.name) + '</p>' +
      '<p class="ph-sum">' + esc(names) + '</p>' +
      '<span class="ph-link">Explore ' + esc(c.name) + ' parties &rarr;</span></a>';
  }).join('');

  const article = '<header class="ideology-header">' +
      '<div class="ideology-icon-badge">Reference</div>' +
      '<h1>Political Parties Explained</h1>' +
      '<p class="ideology-subtitle">' + esc(desc) + '</p>' +
    '</header>' +
    '<div class="ideology-content" style="max-width:820px;margin:0 auto">' +
      '<p>Choose a country below to explore its political parties. Each guide explains a party in plain language and links out to primary sources so you can go deeper.</p>' +
      '<div class="country-cards" style="margin-top:20px">' + cards + '</div>' +
      '<h2>What each guide covers</h2>' +
      '<p>Every profile follows the same structure, so you can compare parties across countries without re-learning the format. We open with the essentials in a fact box: when the party was founded, who currently leads it, where it is headquartered, and where it sits on the left-right spectrum.</p>' +
      '<p>From there the guide walks through the party&#39;s history, its economic policy, its social policy, and its foreign policy, then summarises the concrete positions it currently campaigns on. A compass section places the party on the same two axes the CoreOpinion test uses, so you can see directly how your own result compares. Each profile closes with its most consequential figures and a list of sources.</p>' +
      '<h2>How we decide what goes in</h2>' +
      '<p>We describe what a party believes and how it argues for itself. We do not rate parties, rank them, or tell you which one to support.</p>' +
      '<p>Positions are drawn from the party&#39;s published platform, its recent voting record where it holds seats, and its leadership&#39;s stated priorities. Where a party is genuinely divided internally, we say so rather than flattening it into a single line, because the split is often the most useful thing to understand about it. Compass placements are our editorial judgement and are deliberately presented as approximate.</p>' +
      '<h2>Why parties resist easy labels</h2>' +
      '<p>Labels travel badly. A party called liberal means something close to centre-left in Canada and something closer to centre-right in Australia. Green parties are consistently left on economics in some countries and much closer to the centre in others. A party can be economically interventionist and socially permissive at the same time, which a single left-to-right line cannot represent at all.</p>' +
      '<p>That is why each guide gives you both a written explanation and a two-axis position rather than one label. It is also why the country tests are built separately: the meaningful political questions in Sweden are not the meaningful political questions in the United States, and a test that pretends otherwise gives you a worse answer.</p>' +
      '<h2>Keeping these current</h2>' +
      '<p>Party politics moves. Leaders are replaced, parties merge and split, and platforms are rewritten between elections. We review these guides regularly and date each profile&#39;s last revision. If you spot something out of date or wrong, tell us on the <a href="/contact">contact page</a> with a source and we will correct it.</p>' +
    '</div>';

  let html = applyMeta(shell, { title, desc, url });
  html = setSchema(html, {
    '@context': 'https://schema.org',
    '@graph': [
      WEBSITE_NODE, ORG_NODE,
      { '@type': 'CollectionPage', '@id': url + '#page', url, name: title, description: desc },
      {
        '@type': 'ItemList',
        itemListElement: Object.keys(PARTY_COUNTRIES).map((code, i) => ({
          '@type': 'ListItem', position: i + 1,
          name: PARTY_COUNTRIES[code].name + ' Parties',
          item: SITE + '/parties/' + code
        }))
      }
    ]
  });
  html = setBreadcrumb(html, 'Parties');
  return setArticle(html, article);
}

// --- Ideology profile ---------------------------------------------------

function renderIdeologyArticle(data, key) {
  const figures = (data.figures || []).map(f => {
    let dates = f.born < 0 ? (Math.abs(f.born) + ' BC') : f.born;
    dates += ' - ' + (f.died ? (f.died < 0 ? (Math.abs(f.died) + ' BC') : f.died) : 'present');
    return '<div class="figure-card">' +
      '<div class="figure-img-wrap">' +
        '<img src="/images/ideology/' + esc(f.slug) + '.webp" alt="' + esc(f.name) + ' portrait" loading="lazy">' +
      '</div>' +
      '<h3>' + esc(f.name) + '</h3>' +
      '<p class="figure-dates">' + esc(dates) + '</p>' +
      '<p class="figure-role">' + esc(f.role) + '</p>' +
      '<p class="figure-desc">' + esc(f.desc) + '</p>' +
    '</div>';
  }).join('');

  let bodyImages = '';
  (data.images || []).forEach(img => {
    bodyImages += '<figure class="ideology-figure">' +
      '<img src="/images/ideology/' + esc(img.file) + '" alt="' + esc(img.alt) + '" loading="lazy">' +
      '<figcaption>' + esc(img.caption) + '</figcaption></figure>';
  });

  let other = '';
  for (const k in IDEOLOGY_DATA) {
    if (k === key) continue;
    const d = IDEOLOGY_DATA[k];
    other += '<a href="/ideology/' + d.slug + '" class="ideology-nav-card" style="border-left:4px solid ' + esc(d.color) + '">' +
      '<span class="ideology-nav-icon">' + d.icon + '</span>' +
      '<div><strong>' + esc(d.name) + '</strong>' +
      '<span class="ideology-nav-quad">' + esc(d.quadrant) + '</span></div></a>';
  }

  const eWord = data.e < -0.3 ? 'left-leaning' : data.e > 0.3 ? 'right-leaning' : 'centrist';
  const gWord = data.g > 0.3 ? 'authoritarian-leaning' : data.g < -0.3 ? 'libertarian-leaning' : 'moderate';

  return '<header class="ideology-header">' +
      '<div class="ideology-icon-badge" style="background:' + esc(data.color) + '20; color:' + esc(data.color) + '">' + data.icon + ' ' + esc(data.quadrant) + '</div>' +
      '<h1>' + esc(data.name) + '</h1>' +
      '<p class="ideology-subtitle">' + esc(data.metaDesc) + '</p>' +
    '</header>' +
    '<div class="ideology-layout">' +
      '<aside class="toc" id="toc">' +
        '<div class="toc-title">Contents</div>' +
        '<a href="#overview" class="toc-link">Overview</a>' +
        '<a href="#history" class="toc-link">Historical Development</a>' +
        '<a href="#core-beliefs" class="toc-link">Core Beliefs</a>' +
        '<a href="#economic-policy" class="toc-link">Economic Policy</a>' +
        '<a href="#governance" class="toc-link">Governance and Freedom</a>' +
        '<a href="#compass" class="toc-link">Political Compass Position</a>' +
        '<a href="#notable-figures" class="toc-link">Notable Figures</a>' +
        '<a href="#reading" class="toc-link">Recommended Reading</a>' +
      '</aside>' +
      '<div class="ideology-content">' +
        '<section id="overview"><h2>Overview</h2>' + fmt(data.intro) + '</section>' +
        (data.heroImage ? '<figure class="ideology-figure ideology-hero-img"><img src="/images/ideology/' + esc(data.heroImage) + '" alt="' + esc(data.name) + ' political ideology" loading="lazy"></figure>' : '') +
        '<section id="history"><h2>Historical Development</h2>' + fmt(data.history) + '</section>' +
        '<section id="core-beliefs"><h2>Core Beliefs and Principles</h2>' + fmt(data.coreBeliefs) +
          '<blockquote class="axiom-quote"><p>"' + esc(data.axiom) + '"</p>' +
          '<cite>Core axiom of ' + esc(data.name.toLowerCase()) + '</cite></blockquote></section>' +
        '<section id="economic-policy"><h2>Economic Policy</h2>' + fmt(data.economicPolicy) +
          '<div class="policy-card"><div class="policy-card-label">Economic Position Summary</div>' +
          '<p>' + esc(data.econ) + '</p></div></section>' +
        bodyImages +
        '<section id="governance"><h2>Governance and Freedom</h2>' + fmt(data.governance) +
          '<div class="policy-card"><div class="policy-card-label">Governance Position Summary</div>' +
          '<p>' + esc(data.gov) + '</p></div></section>' +
        '<section id="compass"><h2>Position on the Political Compass</h2>' +
          '<p>' + esc(data.name) + ' sits in the <strong>' + esc(data.quadrant) + '</strong> area of the political compass, with an economic score of <strong>' +
          (data.e >= 0 ? '+' : '') + data.e + '</strong> (' + eWord + ') and a governance score of <strong>' +
          (data.g >= 0 ? '+' : '') + data.g + '</strong> (' + gWord + ').</p>' +
          '<p class="compass-caption">The highlighted dot shows where ' + esc(data.name.toLowerCase()) + ' sits relative to other major political ideologies on the two-axis compass (economic left-right, governance authoritarian-libertarian).</p>' +
        '</section>' +
        '<section id="notable-figures"><h2>Notable Figures in ' + esc(data.name) + '</h2>' +
          '<div class="figures-grid">' + figures + '</div></section>' +
        '<section id="reading"><h2>Recommended Reading</h2>' +
          '<p>To explore ' + esc(data.name.toLowerCase()) + ' further, these books provide essential perspectives on its history, economics, and philosophy.</p>' +
          '<a href="/books" class="cta-link">View all recommended books &rarr;</a></section>' +
        '<div class="cta-panel"><h3>Find out where you stand</h3>' +
          '<p>Take the CoreOpinion political compass test to see how your views compare to ' + esc(data.name.toLowerCase()) + ' and other ideologies.</p>' +
          '<a href="/" class="btn-primary" style="text-decoration:none">Take the Test</a></div>' +
        '<section id="other-ideologies"><h2>Explore Other Ideologies</h2>' +
          '<div class="ideology-nav-grid">' + other + '</div></section>' +
      '</div>' +
    '</div>';
}

function buildIdeologyPage(shell, data, key) {
  const url = SITE + '/ideology/' + data.slug;
  const title = data.title + ' | CoreOpinion';

  let html = applyMeta(shell, { title, desc: data.metaDesc, keywords: data.keywords, url });
  html = setSchema(html, {
    '@context': 'https://schema.org',
    '@graph': [
      WEBSITE_NODE, ORG_NODE,
      {
        '@type': 'Article',
        '@id': url + '#article',
        headline: data.title,
        description: data.metaDesc,
        url,
        author: { '@id': SITE + '/#organization' },
        publisher: { '@id': SITE + '/#organization' },
        keywords: data.keywords,
        articleSection: 'Political Ideologies',
        inLanguage: 'en',
        datePublished: '2026-07-01T00:00:00+00:00',
        dateModified: '2026-07-01T00:00:00+00:00'
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'Ideologies', item: SITE + '/ideology' },
          { '@type': 'ListItem', position: 3, name: data.name, item: url }
        ]
      }
    ]
  });
  html = setBreadcrumb(html, '<a href="/ideology">Ideologies</a> <span class="bc-sep">/</span> ' + esc(data.name));
  return setArticle(html, renderIdeologyArticle(data, key));
}

// --- Ideology index -----------------------------------------------------

function buildIdeologyIndex(shell) {
  const url = SITE + '/ideology';
  const title = 'Political Ideologies Explained | CoreOpinion';
  const desc = 'Explore major political ideologies: their history, core beliefs, economic policies, and where they sit on the political compass.';

  const cards = Object.keys(IDEOLOGY_DATA).map(k => {
    const d = IDEOLOGY_DATA[k];
    return '<a href="/ideology/' + d.slug + '" class="party-hub-card" style="border-left-color:' + esc(d.color) + '">' +
      '<p class="ph-name">' + d.icon + ' ' + esc(d.name) + '</p>' +
      '<p class="ph-pos">' + esc(d.quadrant) + '</p>' +
      '<p class="ph-sum">' + esc(d.axiom) + '</p>' +
      '<span class="ph-link">Read the full guide &rarr;</span></a>';
  }).join('');

  const article = '<header class="ideology-header">' +
      '<div class="ideology-icon-badge">Reference</div>' +
      '<h1>Political Ideologies Explained</h1>' +
      '<p class="ideology-subtitle">' + esc(desc) + '</p>' +
    '</header>' +
    '<div class="ideology-content" style="max-width:820px;margin:0 auto">' +
      '<p>Each guide below covers one ideology in depth: where it came from, what its supporters actually believe, how it approaches the economy and the role of the state, and where it sits on the two-axis political compass.</p>' +
      '<div class="party-hub-grid" style="margin-top:20px">' + cards + '</div>' +
    '</div>';

  let html = applyMeta(shell, { title, desc, url });
  html = setSchema(html, {
    '@context': 'https://schema.org',
    '@graph': [
      WEBSITE_NODE, ORG_NODE,
      { '@type': 'CollectionPage', '@id': url + '#page', url, name: title, description: desc },
      {
        '@type': 'ItemList',
        itemListElement: Object.keys(IDEOLOGY_DATA).map((k, i) => ({
          '@type': 'ListItem', position: i + 1,
          name: IDEOLOGY_DATA[k].name,
          item: SITE + '/ideology/' + IDEOLOGY_DATA[k].slug
        }))
      }
    ]
  });
  html = setBreadcrumb(html, 'Ideologies');
  return setArticle(html, article);
}

// --- Affiliate grids (books, flags) -------------------------------------
//
// books.html and flags.html ship an empty grid div that the client fills from
// books-data.js / flags-data.js. Left alone they are thin affiliate pages with
// roughly 140 words of real text. We seed the default (US) region server-side
// so the descriptions are in the HTML; the client still re-renders on load and
// swaps in the reader's regional store.

function fmtYear(y) { return y < 0 ? Math.abs(y) + ' BC' : String(y); }

function affiliateLink(entry, fallbackSearch) {
  const us = entry.links && entry.links.us;
  if (us && us !== '#' && us !== '#REPLACE_WITH_AFFILIATE_LINK') return us;
  return 'https://www.amazon.com/s?k=' + encodeURIComponent(fallbackSearch);
}

function seedGrid(file, gridId, cardsHtml) {
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) { console.warn(`  skipped ${file} (not built yet)`); return false; }
  const html = fs.readFileSync(p, 'utf8');
  const re = new RegExp('(<div id="' + gridId + '"[^>]*>)[\\s\\S]*?(</div>)');
  if (!re.test(html)) { console.warn(`  skipped ${file} (grid #${gridId} not found)`); return false; }
  fs.writeFileSync(p, html.replace(re, (_m, open, close) => open + cardsHtml + close), 'utf8');
  return true;
}

function prerenderBooks() {
  const { BOOKS_DATA } = loadGlobals('books-data.js', ['BOOKS_DATA']);
  if (!BOOKS_DATA) return false;
  const cards = BOOKS_DATA.map(b => {
    const link = affiliateLink(b, b.title + ' ' + b.author);
    const cover = 'https://covers.openlibrary.org/b/isbn/' + encodeURIComponent(b.isbn) + '-L.jpg';
    return '<a href="' + esc(link) + '" target="_blank" rel="noopener noreferrer sponsored" class="book-card">' +
      '<div class="book-cover-wrap"><img src="' + esc(cover) + '" alt="' + esc(b.title) + ' cover" loading="lazy"></div>' +
      '<div class="book-info">' +
        '<span class="book-category">' + esc(b.category) + '</span>' +
        '<h3 class="book-title">' + esc(b.title) + '</h3>' +
        '<p class="book-author">' + esc(b.author) + ' &middot; ' + esc(fmtYear(b.year)) + '</p>' +
        '<p class="book-desc">' + esc(b.description) + '</p>' +
        '<span class="book-cta">View on Amazon</span>' +
      '</div></a>';
  }).join('');
  return seedGrid('books.html', 'books-grid', cards);
}

function prerenderFlags() {
  const { FLAGS_DATA } = loadGlobals('flags-data.js', ['FLAGS_DATA']);
  if (!FLAGS_DATA) return false;
  const cards = FLAGS_DATA.map(f => {
    const link = affiliateLink(f, f.name);
    return '<a href="' + esc(link) + '" target="_blank" rel="noopener noreferrer sponsored" class="book-card flag-card">' +
      '<div class="flag-cover-wrap"><img src="/images/flags/' + esc(f.code) + '.webp" alt="' + esc(f.name) + '" loading="lazy"></div>' +
      '<div class="book-info">' +
        '<h3 class="book-title">' + esc(f.name) + '</h3>' +
        '<p class="book-desc">' + esc(f.description) + '</p>' +
        '<span class="book-cta">View on Amazon</span>' +
      '</div></a>';
  }).join('');
  return seedGrid('flags.html', 'flags-grid', cards);
}

// --- Run ----------------------------------------------------------------

function main() {
  const partyShell = fs.readFileSync(path.join(ROOT, 'src/shells/party.html'), 'utf8');
  const ideologyShell = fs.readFileSync(path.join(ROOT, 'src/shells/ideology.html'), 'utf8');
  let count = 0;

  Object.keys(PARTY_DATA).forEach(key => {
    const d = PARTY_DATA[key];
    writePage(path.join('party', d.slug + '.html'), buildPartyPage(partyShell, d));
    count++;
  });

  Object.keys(PARTY_COUNTRIES).forEach(code => {
    writePage(path.join('parties', code + '.html'), buildCountryHub(partyShell, PARTY_COUNTRIES[code]));
    count++;
  });

  writePage('parties.html', buildPartyIndex(partyShell));
  writePage('party.html', buildPartyIndex(partyShell));
  count += 2;

  Object.keys(IDEOLOGY_DATA).forEach(key => {
    writePage(path.join('ideology', IDEOLOGY_DATA[key].slug + '.html'), buildIdeologyPage(ideologyShell, IDEOLOGY_DATA[key], key));
    count++;
  });

  writePage('ideology.html', buildIdeologyIndex(ideologyShell));
  count++;

  if (prerenderBooks()) count++;
  if (prerenderFlags()) count++;

  console.log(`Prerendered ${count} pages (${Object.keys(PARTY_DATA).length} parties, ` +
    `${Object.keys(PARTY_COUNTRIES).length} country hubs, ${Object.keys(IDEOLOGY_DATA).length} ideologies, 3 index pages).`);
}

main();
