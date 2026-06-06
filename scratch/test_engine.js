const fs = require('fs');
const path = require('path');

const seHtmlPath = path.join(__dirname, '..', 'se.html');
const engineJsPath = path.join(__dirname, '..', 'engine.js');

if (!fs.existsSync(seHtmlPath)) {
  console.error("se.html not found at:", seHtmlPath);
  process.exit(1);
}

const html = fs.readFileSync(seHtmlPath, 'utf8');

// Extract script block content (target the quiz data block containing LOCAL_QUESTIONS)
const scriptMatches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
const scriptMatch = scriptMatches.find(m => m[1].includes('LOCAL_QUESTIONS'));
if (!scriptMatch) {
  console.error("No inline data script block found in se.html");
  process.exit(1);
}

const inlineScript = scriptMatch[1];
const engineScript = fs.readFileSync(engineJsPath, 'utf8');

const createMockOption = (text, val = '') => {
  const opt = {
    textContent: text,
    value: val || text,
    getAttribute: (name) => opt[name] || '',
    setAttribute: (name, value) => { opt[name] = value; }
  };
  return opt;
};

const createMockElement = (id = '', tag = 'div') => {
  const el = {
    id,
    tagName: tag.toUpperCase(),
    className: '',
    textContent: '',
    value: '',
    innerHTML: '',
    style: { display: '' },
    children: [],
    appendChild: (child) => {
      el.children.push(child);
      return child;
    },
    getAttribute: (name) => el[name] || '',
    setAttribute: (name, value) => { el[name] = value; },
    classList: {
      add: (cls) => {
        if (!el.classList.contains(cls)) {
          el.className += (el.className ? ' ' : '') + cls;
        }
      },
      remove: (cls) => {
        el.className = el.className.split(' ').filter(c => c !== cls).join(' ');
      },
      contains: (cls) => {
        return el.className.split(' ').includes(cls);
      }
    },
    options: [],
    onclick: null,
    disabled: false
  };
  return el;
};

const mockElements = {};
const getOrCreateElement = (id, tag = 'div') => {
  if (!mockElements[id]) {
    mockElements[id] = createMockElement(id, tag);
  }
  return mockElements[id];
};

// Prepopulate selectors
const ageEl = getOrCreateElement('d-age', 'select');
ageEl.options = [
  createMockOption('Select...'),
  createMockOption('Under 18'),
  createMockOption('18 to 24'),
  createMockOption('25 to 34'),
  createMockOption('35 to 44'),
  createMockOption('45 to 54'),
  createMockOption('55 to 64'),
  createMockOption('65 or older')
];

const genderEl = getOrCreateElement('d-gender', 'select');
genderEl.options = [
  createMockOption('Select...'),
  createMockOption('Male'),
  createMockOption('Female'),
  createMockOption('Other'),
  createMockOption('Prefer not to say')
];

const partyEl = getOrCreateElement('d-party', 'select');
partyEl.options = [
  createMockOption('Select...'),
  createMockOption('Socialdemokraterna'),
  createMockOption('Moderaterna'),
  createMockOption('Independent')
];

const natEl = getOrCreateElement('d-nationality', 'select');
natEl.options = [
  createMockOption('Select...'),
  createMockOption('United States'),
  createMockOption('United Kingdom'),
  createMockOption('Sweden')
];

const countryEl = getOrCreateElement('d-country', 'select');
countryEl.options = [
  createMockOption('Select...')
];

const countyEl = getOrCreateElement('d-county', 'select');
countyEl.options = [
  createMockOption('Select...')
];

// Set up mock window and document objects
const mockDocument = {
  getElementById: (id) => getOrCreateElement(id),
  querySelector: (sel) => {
    if (sel.startsWith('#')) {
      return getOrCreateElement(sel.slice(1));
    }
    return getOrCreateElement('query-' + sel);
  },
  querySelectorAll: (sel) => {
    return [];
  },
  createElement: (tag) => createMockElement('', tag),
  scrollTo: (x, y) => {}
};

const mockWindow = {
  scrollTo: (x, y) => {},
  document: mockDocument
};

// Bind to global
global.window = mockWindow;
global.document = mockDocument;

// Create globals so variables like LOCAL_QUESTIONS, etc. are accessible
global.LOCAL_QUESTIONS = {};
global.BANK = [];
global.PARTY_META = {};

function runScript(code) {
  // Use function wrapper to isolate local scopes, but bind to global/globalThis
  // We can evaluate in global scope by using indirect eval
  const indirectEval = eval;
  indirectEval(code);
}

try {
  // Run inline script and engine script combined in the same scope
  console.log("Running combined scripts (inline + engine)...");
  runScript(inlineScript + "\n" + engineScript);
  console.log("Combined script completed successfully.");

  // Call startTest
  console.log("Calling startTest()...");
  global.window.startTest();
  console.log("startTest() completed successfully.");
} catch (e) {
  console.error("Error during execution:", e.stack || e);
}
