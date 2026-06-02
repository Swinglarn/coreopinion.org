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

// Set up mock window and document objects
const mockDocument = {
  getElementById: (id) => {
    return {
      textContent: '',
      value: '',
      options: [
        createMockOption('Select...'),
        createMockOption('Opt1'),
        createMockOption('Opt2'),
        createMockOption('Opt3'),
        createMockOption('Opt4'),
        createMockOption('Opt5'),
        createMockOption('Opt6'),
        createMockOption('Opt7'),
        createMockOption('Opt8')
      ],
      classList: {
        contains: (cls) => false,
        remove: (cls) => {},
        add: (cls) => {}
      },
      style: { display: '' }
    };
  },
  querySelector: (sel) => {
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

  const inlineScript = scriptMatch[1];
  
  try {
    // Reset global state
    global.LOCAL_QUESTIONS = {};
    global.BANK = [];
    global.PARTY_META = {};
    
    // Run inline script
    runScript(inlineScript);

    // Run engine script
    runScript(engineScript);

    // Call startTest
    global.window.startTest();
    console.log(`[PASS] ${file} loaded and startTest() executed successfully.`);
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
