const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const engineJsPath = path.join(rootDir, 'engine.js');
const engineScript = fs.readFileSync(engineJsPath, 'utf8');

const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log(`Checking ${htmlFiles.length} HTML files...`);

const createMockOption = (text, val = '') => {
  const opt = {
    textContent: text,
    value: val || text,
    getAttribute: (name) => opt[name] || '',
    setAttribute: (name, value) => { opt[name] = value; }
  };
  return opt;
};

const createMockElement = (tag) => {
  return {
    tagName: tag.toUpperCase(),
    className: '',
    textContent: '',
    innerHTML: '',
    onclick: null,
    style: {},
    dataset: {},
    children: [],
    appendChild: (child) => {},
    classList: {
      add: (cls) => {},
      remove: (cls) => {},
      contains: (cls) => false
    },
    setAttribute: (name, value) => {},
    getAttribute: (name) => ''
  };
};

// Set up mock window and document objects
const mockDocument = {
  createElement: createMockElement,
  getElementById: (id) => {
    if (id === 'd-age') {
      return {
        options: [
          createMockOption('Select...'),
          createMockOption('Under 18'),
          createMockOption('18 to 24'),
          createMockOption('25 to 34')
        ]
      };
    }
    if (id === 'd-gender') {
      return {
        options: [
          createMockOption('Select...'),
          createMockOption('Male'),
          createMockOption('Female')
        ]
      };
    }
    if (id === 'd-party') {
      return {
        options: [
          createMockOption('Select...'),
          createMockOption('Party1'),
          createMockOption('Independent')
        ]
      };
    }
    if (id === 'd-nationality') {
      return {
        options: [
          createMockOption('Select...'),
          createMockOption('Sweden'),
          createMockOption('Other')
        ]
      };
    }
    if (id === 'd-country' || id === 'd-county') {
      return {
        options: [
          createMockOption('Select...'),
          createMockOption('Region1'),
          createMockOption('Region2')
        ]
      };
    }
    return createMockElement('div');
  },
  querySelector: (sel) => {
    return createMockElement('div');
  },
  querySelectorAll: (sel) => {
    return [];
  },
  scrollTo: (x, y) => {}
};

const mockWindow = {
  scrollTo: (x, y) => {},
  document: mockDocument
};

// Bind to global
global.window = mockWindow;
global.document = mockDocument;

function runScript(code) {
  const indirectEval = eval;
  indirectEval(code);
}

let hasErrors = false;

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  const html = fs.readFileSync(filePath, 'utf8');

  // Extract script block content
  const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
  if (!scriptMatch) {
    console.log(`[INFO] No inline script block found in ${file}`);
    return;
  }

  let inlineScript = scriptMatch[1];
  
  // Replace const/let with global assignments to bind them to the node global context
  inlineScript = inlineScript.replace(/const LOCAL_QUESTIONS\s*=/g, 'global.LOCAL_QUESTIONS =');
  inlineScript = inlineScript.replace(/const BANK\s*=/g, 'global.BANK =');
  inlineScript = inlineScript.replace(/const PARTY_META\s*=/g, 'global.PARTY_META =');
  inlineScript = inlineScript.replace(/let currentLang\s*=/g, 'global.currentLang =');
  inlineScript = inlineScript.replace(/const engCountryName\s*=/g, 'global.engCountryName =');
  inlineScript = inlineScript.replace(/const localCountryName\s*=/g, 'global.localCountryName =');
  
  try {
    // Reset global state
    global.LOCAL_QUESTIONS = {};
    global.BANK = [];
    global.PARTY_META = {};
    global.currentLang = 'en';
    
    // Run modified inline script
    runScript(inlineScript);

    // Bind other variables to window object
    global.window.currentLang = global.currentLang;
    global.window.getQuestion = global.getQuestion;

    // Run engine script
    runScript(engineScript);

    // Call startTest
    global.window.startTest();
    console.log(`[PASS] ${file} loaded and startTest() executed successfully with ${global.BANK.length} questions.`);
  } catch (e) {
    console.error(`[FAIL] ${file} threw error:`, e.stack || e);
    hasErrors = true;
  }
});

if (hasErrors) {
  process.exit(1);
} else {
  console.log("All portals checked and verified successfully!");
}
