// inject_1993.js
// Inject 1993 interpretation between 1992 and 1994 entries in interpretations.ts

const fs = require('fs');
const path = require('path');

const INTERP_FILE = path.join(__dirname, 'interp_1993.ts');
const TARGET_FILE = path.join(__dirname, 'data', 'interpretations.ts');

// Read files
const interpContent = fs.readFileSync(INTERP_FILE, 'utf8');
const targetContent = fs.readFileSync(TARGET_FILE, 'utf8');

// Extract the interpretation object from interp_1993.ts
// Format: export const interpretation1993 = { ... }; (semicolon optional)
const match = interpContent.match(/export const interpretation1993 = (\{[\s\S]*\})/);
if (!match) {
  console.error('Could not extract interpretation object from interp_1993.ts');
  process.exit(1);
}

let interpObject = match[1]; // The { ... } object

// Add leading spaces (12 spaces for indentation to match file style)
const lines = interpObject.split('\n');
const indentedLines = lines.map((line, idx) => {
  if (idx === 0) return `    '1993-berkshire-letter': ${line}`;
  return '    ' + line;
});
const indentedObject = indentedLines.join('\n');

// Find insertion point: between 1992 and 1994 entries
// The pattern: end of 1992 entry `  },\n\n  '1994-berkshire-letter'`
const after1992Pattern = /(  \},\n\n  '1994-berkshire-letter': \{)/;
const after1992Match = targetContent.match(after1992Pattern);

if (!after1992Match) {
  console.error('Could not find insertion point (after 1992, before 1994)');
  process.exit(1);
}

const insertPos = after1992Match.index;

// Build new content: before + indented 1993 entry + ',\n\n' + after
const before = targetContent.slice(0, insertPos);
const after = targetContent.slice(insertPos);
const newContent = before + indentedObject + ',\n\n' + after;

// Write backup
const backupPath = TARGET_FILE + '.backup_' + Date.now();
fs.copyFileSync(TARGET_FILE, backupPath);
console.log('Backup created:', backupPath);

// Write new content
fs.writeFileSync(TARGET_FILE, newContent, 'utf8');
console.log('1993 interpretation injected successfully!');
console.log('1993 entry inserted between 1992 and 1994.');
