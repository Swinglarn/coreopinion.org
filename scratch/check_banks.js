const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  const html = fs.readFileSync(filePath, 'utf8');

  // Extract BANK from html
  const bankMatch = html.match(/const BANK = (\[[\s\S]*?\]);/);
  if (!bankMatch) {
    console.error(`[FAIL] Could not find const BANK in ${file}`);
    return;
  }

  try {
    const bank = JSON.parse(bankMatch[1]);
    console.log(`[OK] ${file}: BANK has ${bank.length} items.`);
    if (bank.length === 0) {
      console.error(`[WARNING] BANK is empty in ${file}!`);
    }
  } catch (e) {
    console.error(`[FAIL] Could not parse BANK in ${file}:`, e.message);
  }
});
