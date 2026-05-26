// inject_1993_v2.js
// Carefully inject 1993 interpretation into interpretations.ts
// Key: extract the object from interp_1993.ts and insert between 1992 and 1994

const fs = require('fs');
const path = require('path');

const INTERP_FILE = path.join(__dirname, 'interp_1993.ts');
const TARGET_FILE = path.join(__dirname, 'data', 'interpretations.ts');

// Read files
const interpContent = fs.readFileSync(INTERP_FILE, 'utf8');
const targetContent = fs.readFileSync(TARGET_FILE, 'utf8');

// Extract object from interp_1993.ts
// Format: export const interpretation1993 = { ... };
const match = interpContent.match(/export const interpretation1993 = ([\s\S]*)/);
if (!match) {
  console.error('Could not extract from interp_1993.ts');
  process.exit(1);
}

// The match[1] is everything after '= '
// We need to find the balanced closing '}' for the object
let braceCount = 0;
let foundStart = false;
let objStr = '';
const s = match[1];

for (let i = 0; i < s.length; i++) {
  const ch = s[i];
  
  if (ch === '{' && !foundStart) { foundStart = true; braceCount = 1; objStr += ch; continue; }
  if (!foundStart) continue;
  
  if (ch === '{') braceCount++;
  if (ch === '}') { braceCount--; }
  objStr += ch;
  if (braceCount === 0) break;
}

console.log('Extracted object length:', objStr.length);
console.log('First 100 chars:', objStr.slice(0, 100));
console.log('Last 100 chars:', objStr.slice(-100));

// Now objStr is the full object including outer {}
// Add indentation (12 spaces) and the key
const lines = objStr.split('\n');
const indentedLines = lines.map((line, idx) => {
  if (idx === 0) return `    '1993-berkshire-letter': ${line}`;
  return '    ' + line;
});
const indentedObject = indentedLines.join('\n');

// Find insertion point: between 1992 and 1994
// Pattern: end of 1992 entry followed by 1994 entry
// The 1992 entry ends with `  },\n\n  '1994-berkshire-letter': {`
const after1992Pattern = /(  \},\n\n  '1994-berkshire-letter': \{)/;
const m = targetContent.match(after1992Pattern);
if (!m) {
  console.error('Could not find insertion point (after 1992, before 1994)');
  process.exit(1);
}

const insertPos = m.index + m[1].indexOf('  \},') + '  },'.length;
console.log('Insert position:', insertPos);
console.log('Context:', targetContent.slice(insertPos - 50, insertPos + 50));

// Build new content
const before = targetContent.slice(0, insertPos);
const after = targetContent.slice(insertPos);
const newContent = before + ',\n\n' + indentedObject + after;

// Backup
const backupPath = TARGET_FILE + '.backup_' + Date.now();
fs.copyFileSync(TARGET_FILE, backupPath);
console.log('Backup created:', backupPath);

// Write
fs.writeFileSync(TARGET_FILE, newContent, 'utf8');
console.log('1993 interpretation injected successfully!');
console.log('Backup at:', backupPath);
