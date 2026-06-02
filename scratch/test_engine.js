const fs = require('fs');
const path = require('path');

const seHtmlPath = path.join(__dirname, '..', 'se.html');
const engineJsPath = path.join(__dirname, '..', 'engine.js');

if (!fs.existsSync(seHtmlPath)) {
  console.error("se.html not found at:", seHtmlPath);
  process.exit(1);
}

const html = fs.readFileSync(seHtmlPath, 'utf8');

// Extract script block content
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) {
  console.error("No inline script block found in se.html");
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

// Set up mock window and document objects
const mockDocument = {
  getElementById: (id) => {
    // console.log(`mockDocument.getElementById(${id}) called`);
    if (id === 'd-age') {
      return {
        options: [
          createMockOption('Select...'),
          createMockOption('Under 18'),
          createMockOption('18 to 24'),
          createMockOption('25 to 34'),
          createMockOption('35 to 44'),
          createMockOption('45 to 54'),
          createMockOption('55 to 64'),
          createMockOption('65 or older')
        ]
      };
    }
    if (id === 'd-gender') {
      return {
        options: [
          createMockOption('Select...'),
          createMockOption('Male'),
          createMockOption('Female'),
          createMockOption('Other'),
          createMockOption('Prefer not to say')
        ]
      };
    }
    if (id === 'd-party') {
      return {
        options: [
          createMockOption('Select...'),
          createMockOption('Socialdemokraterna'),
          createMockOption('Moderaterna'),
          createMockOption('Independent')
        ]
      };
    }
    if (id === 'd-nationality') {
      return {
        options: [
          createMockOption('Select...'),
          createMockOption('United States'),
          createMockOption('United Kingdom'),
          createMockOption('Sweden')
        ]
      };
    }
    return {
      textContent: '',
      value: '',
      options: [createMockOption('Default')],
      classList: {
        contains: (cls) => false,
        remove: (cls) => {},
        add: (cls) => {}
      },
      style: { display: '' }
    };
  },
  querySelector: (sel) => {
    // console.log(`mockDocument.querySelector(${sel}) called`);
    return {
      textContent: '',
      innerHTML: '',
      style: {},
      options: [createMockOption('QuerySelect')],
      getAttribute: (attr) => '',
      setAttribute: (attr, val) => {},
      classList: {
        contains: (cls) => false,
        remove: (cls) => {},
        add: (cls) => {}
      }
    };
  },
  querySelectorAll: (sel) => {
    // console.log(`mockDocument.querySelectorAll(${sel}) called`);
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
  // Run inline script
  console.log("Running inline script...");
  runScript(inlineScript);
  console.log("Inline script completed successfully.");

  // Run engine script
  console.log("Running engine script...");
  runScript(engineScript);
  console.log("Engine script completed successfully.");

  // Call startTest
  console.log("Calling startTest()...");
  global.window.startTest();
  console.log("startTest() completed successfully.");
} catch (e) {
  console.error("Error during execution:", e.stack || e);
}
