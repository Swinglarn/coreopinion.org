const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'src/template.html');
const countriesDir = path.join(__dirname, 'src/countries');
const outputDir = __dirname;

if (!fs.existsSync(templatePath)) {
  console.error("Error: src/template.html not found.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

// Language and metadata definitions for localized portals
const langMap = {
  de: { langCode: 'de', localLang: 'Deutsch', engCountry: 'Germany', localCountry: 'Deutschland', defaultSelect: 'Auswählen...' },
  at: { langCode: 'de', localLang: 'Deutsch', engCountry: 'Austria', localCountry: 'Österreich', defaultSelect: 'Auswählen...' },
  fr: { langCode: 'fr', localLang: 'Français', engCountry: 'France', localCountry: 'France', defaultSelect: 'Sélectionner...' },
  es: { langCode: 'es', localLang: 'Español', engCountry: 'Spain', localCountry: 'España', defaultSelect: 'Seleccionar...' },
  it: { langCode: 'it', localLang: 'Italiano', engCountry: 'Italy', localCountry: 'Italia', defaultSelect: 'Seleziona...' },
  nl: { langCode: 'nl', localLang: 'Nederlands', engCountry: 'Netherlands', localCountry: 'Nederland', defaultSelect: 'Selecteer...' },
  se: { langCode: 'sv', localLang: 'Svenska', engCountry: 'Sweden', localCountry: 'Sverige', defaultSelect: 'Välj...' }
};

const nationalityMap = {
  us: "United States",
  uk: "United Kingdom",
  ca: "Canada",
  au: "Australia",
  nz: "New Zealand",
  de: "Germany",
  at: "Austria",
  fr: "France",
  es: "Spain",
  it: "Italy",
  se: "Sweden",
  ie: "Ireland",
  nl: "Netherlands"
};

const nationalitiesList = [
  "United States", "United Kingdom", "Canada", "Australia", "New Zealand",
  "Germany", "Austria", "France", "Spain", "Italy", "Sweden", "Ireland", "Netherlands", "Other"
];

function getDisplayName(val, langCode) {
  if (typeof val === 'string') return val;
  if (val && typeof val === 'object') {
    return val[langCode] || val['en'] || Object.values(val)[0];
  }
  return '';
}

// Read all configurations
const configFiles = fs.readdirSync(countriesDir).filter(f => f.endsWith('.json'));

console.log(`Found ${configFiles.length} country configurations. Starting build...`);

configFiles.forEach(file => {
  const filePath = path.join(countriesDir, file);
  const config = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const isGeneral = config.code === 'general';
  
  const outputName = isGeneral ? 'index.html' : `${config.code}.html`;
  const outputPath = path.join(outputDir, outputName);
  
  let html = template;
  
  // 1. Basic Placeholders
  html = html.replace(/\{\{TITLE\}\}/g, config.title || '');
  html = html.replace(/\{\{DESCRIPTION\}\}/g, config.desc || '');
  html = html.replace(/\{\{KEYWORDS\}\}/g, config.keywords || '');
  html = html.replace(/\{\{CANONICAL\}\}/g, config.canonical || '');
  html = html.replace(/\{\{NAME\}\}/g, config.name || '');
  html = html.replace(/\{\{FLAG\}\}/g, config.flag || '');
  html = html.replace(/\{\{LABEL\}\}/g, config.localLabel || '');
  html = html.replace(/\{\{HERO_TITLE\}\}/g, config.heroTitle || '');
  html = html.replace(/\{\{HERO_SUB\}\}/g, config.heroSub || '');
  
  // 2. Party Strip replacement (Replace the whole div to support stats-strip vs party-strip)
  html = html.replace(/<div class="party-strip">[\s\S]*?<\/div>/, config.partyStripHtml || '');
  
  // 3. Translations & Questions Injection
  html = html.replace(/\{\{LOCAL_QUESTIONS\}\}/g, JSON.stringify(config.translations || {}, null, 2));
  html = html.replace(/\{\{BANK\}\}/g, JSON.stringify(config.bank || [], null, 2));
  html = html.replace(/\{\{PARTY_META\}\}/g, JSON.stringify(config.partyMeta || {}, null, 2));
  
  // 4. Language Toggler Setup
  const langConfig = langMap[config.code];
  if (langConfig) {
    // Generate Toggle Lang Button HTML
    const buttonHtml = `<button id="lang-toggle" onclick="toggleLang()" style="background:none;border:1px solid var(--border-soft);border-radius:4px;padding:6px 12px;font-size:12px;font-family:Outfit,sans-serif;cursor:pointer;color:var(--ink-muted);font-weight:400;transition:all 0.15s">English</button>`;
    html = html.replace(/\{\{TOGGLE_LANG_BUTTON\}\}/g, buttonHtml);
    
    // Generate Toggle Script
    const script = `let currentLang = '${langConfig.langCode}';
    
function toggleLang() {
  currentLang = currentLang === 'en' ? '${langConfig.langCode}' : 'en';
  document.getElementById('lang-toggle').textContent = currentLang === 'en' ? '${langConfig.localLang}' : 'English';
  document.getElementById('lang-label').textContent = currentLang === 'en' ? '${langConfig.engCountry}' : '${langConfig.localCountry}';
  
  window.currentLang = currentLang;
  if (typeof applyLang === 'function') applyLang();
  if (document.getElementById('page-test').classList.contains('active')) renderQ();
}

function t(en, local) { return currentLang === 'en' ? en : local; }

function getQuestion(q) {
  if (currentLang === 'en') return q;
  const localQ = LOCAL_QUESTIONS[q.id];
  if (!localQ) return q;
  return {
    ...q,
    q: localQ.q || q.q,
    ctx: localQ.ctx || q.ctx,
    opts: q.opts.map((o, i) => ({
      ...o,
      t: (localQ.opts && localQ.opts[i]) ? localQ.opts[i] : o.t
    }))
  };
}

window.getQuestion = getQuestion;
window.currentLang = currentLang;`;

    html = html.replace(/\{\{TOGGLE_LANG_SCRIPT\}\}/g, script);
  } else {
    // English-only/General
    html = html.replace(/\{\{TOGGLE_LANG_BUTTON\}\}/g, '');
    
    const fallbackScript = `window.currentLang = 'en';
window.getQuestion = q => q;`;
    html = html.replace(/\{\{TOGGLE_LANG_SCRIPT\}\}/g, fallbackScript);
  }
  
  // 5. Select Dropdown Option lists
  const defaultLabel = langConfig ? langConfig.defaultSelect : 'Select...';
  
  // Region Select options
  let regionOptions = `<option value="">${defaultLabel}</option>`;
  if (config.regions && config.regions.length > 0) {
    config.regions.forEach(r => {
      regionOptions += `\n          <option>${r}</option>`;
    });
  }
  html = html.replace(/\{\{REGIONS_OPTIONS\}\}/g, regionOptions);
  
  // Party Select options
  let partyOptions = `<option value="">${defaultLabel}</option>`;
  if (config.parties && config.parties.length > 0) {
    const list = [...config.parties, 'ind'];
    list.forEach(pKey => {
      if (config.partyMeta[pKey]) {
        const name = getDisplayName(config.partyMeta[pKey].name, langConfig ? langConfig.langCode : 'en');
        partyOptions += `\n          <option>${name}</option>`;
      }
    });
  }
  html = html.replace(/\{\{PARTY_OPTIONS\}\}/g, partyOptions);
  
  // Nationality options with dynamic selection
  const selectedNat = isGeneral ? "" : (nationalityMap[config.code] || "");
  let nationalityOptions = `<option value="">${defaultLabel}</option>`;
  nationalitiesList.forEach(nat => {
    const isSelected = nat === selectedNat ? ' selected' : '';
    nationalityOptions += `\n          <option${isSelected}>${nat}</option>`;
  });
  html = html.replace(/\{\{NATIONALITY_OPTIONS\}\}/g, nationalityOptions);
  
  // Write output
  fs.writeFileSync(outputPath, html, 'utf8');
  console.log(`Generated ${outputName} (size: ${html.length} bytes)`);
});

console.log("SSG compilation completed successfully. 14 HTML portals built.");
