// inject_1993_v3.js
// Properly inject 1993 interpretation using brace-counting (not regex)

const fs = require('fs');
const path = require('path');

const INTERP_FILE = path.join(__dirname, 'interp_1993.ts');
const TARGET_FILE = path.join(__dirname, 'data', 'interpretations.ts');

const interpContent = fs.readFileSync(INTERP_FILE, 'utf8');
const targetContent = fs.readFileSync(TARGET_FILE, 'utf8');

// Step 1: Extract the object from interp_1993.ts
// Find: export const interpretation1993 = {
const startMarker = 'export const interpretation1993 = {';
const smIdx = interpContent.indexOf(startMarker);
if (smIdx === -1) {
  console.error('Could not find "export const interpretation1993 = {"');
  process.exit(1);
}

// Count braces to find the matching closing }
let braceCount = 0;
let objStart = -1;
let objEnd = -1;
let inString = false;
let stringChar = '';
let inTemplate = false;
let escaped = false;

for (let i = smIdx; i < interpContent.length; i++) {
  const ch = interpContent[i];
  
  if (escaped) { escaped = false; continue; }
  if (ch === '\\') { escaped = true; continue; }
  
  if (inString) {
    if (ch === stringChar) inString = false;
    continue;
  }
  
  if (inTemplate) {
    if (ch === '`') inTemplate = false;
    continue;
  }
  
  if (ch === "'" || ch === '"') { inString = true; stringChar = ch; continue; }
  if (ch === '`') { inTemplate = true; continue; }
  
  if (ch === '{') {
    if (braceCount === 0) objStart = i;
    braceCount++;
  } else if (ch === '}') {
    braceCount--;
    if (braceCount === 0) { objEnd = i; break; }
  }
}

if (objStart === -1 || objEnd === -1) {
  console.error('Could not extract object (brace counting failed)');
  console.error('objStart:', objStart, 'objEnd:', objEnd);
  process.exit(1);
}

const objContent = interpContent.slice(objStart, objEnd + 1);
console.log('Extracted object length:', objContent.length);
console.log('First 80 chars:', JSON.stringify(objContent.slice(0, 80)));
console.log('Last 80 chars:', JSON.stringify(objContent.slice(-80)));

// Step 2: Add indentation (4 spaces) and the key
const lines = objContent.split('\n');
const indentedLines = lines.map((line, idx) => {
  if (idx === 0) return `    '1993-berkshire-letter': ${line}`;
  return '    ' + line;
});
const indentedObject = indentedLines.join('\n');

// Step 3: Find insertion point in interpretations.ts
// Look for: "  },\n\n  '1994-berkshire-letter': {"
const after1992Pattern = "  },\n\n  '1994-berkshire-letter': {";
const pIdx = targetContent.indexOf(after1992Pattern);
if (pIdx === -1) {
  console.error('Could not find insertion point (after 1992, before 1994)');
  // Try alternative patterns
  const alt1 = targetContent.indexOf("},\n\n  '1994");
  console.error('Alternative 1 found:', alt1);
  process.exit(1);
}

// The insertion point is AFTER after1992Pattern
const insertPos = pIdx + after1992Pattern.length;
console.log('Insert position:', insertPos);
console.log('Context:', JSON.stringify(targetContent.slice(insertPos - 50, insertPos + 50)));

// Step 4: Build new content
// We want: ...1992 entry },  + \n\n + 1993 entry + ,\n\n  + 1994 entry...
// Actually, the after1992Pattern ENDS WITH the 1994 entry start.
// We want to insert the 1993 entry BEFORE the 1994 entry start.
// So: before = targetContent.slice(0, pIdx + "  },\n\n".length)
//       after = "  '1994-berkshire-letter': ..." (the rest)

const before = targetContent.slice(0, pIdx + "  },\n\n".length);
const after = targetContent.slice(pIdx + "  },\n\n".length);
const newContent = before + "  '1993-berkshire-letter': " + objContent.slice(1, -1) + ',\n\n  ' + after;

// Wait, this is getting confusing. Let me re-think.

// The file structure is:
//   '1992-berkshire-letter': {
//     ...
//   },
//
//   '1994-berkshire-letter': {
//
// I want to insert 1993 BETWEEN them:
//   '1992-berkshire-letter': {
//     ...
//   },
//
//   '1993-berkshire-letter': {
//     ...
//   },
//
//   '1994-berkshire-letter': {
//

// So the insertion point is after: "  },\n\n  "
// And before: "'1994-berkshire-letter': {"

// Let me find: "  },\n\n  '1994-"
const marker = "  },\n\n  '1994-berkshire-letter': {";
const mIdx = targetContent.indexOf(marker);
if (mIdx === -1) {
  console.error('Marker not found');
  process.exit(1);
}

// Insert after mIdx + "  },\n\n".length (i.e., before "'1994-...")
const insertAfter = mIdx + "  },\n\n".length;
const b = targetContent.slice(0, insertAfter);
const a = targetContent.slice(insertAfter);
const nc = b + "  '1993-berkshire-letter': {\n" + objContent.slice(1, -1) + '\n  },\n\n  ' + a;

// Write backup
const backupPath = TARGET_FILE + '.backup_' + Date.now();
fs.copyFileSync(TARGET_FILE, backupPath);
console.log('Backup created:', backupPath);

// Write new content
fs.writeFileSync(TARGET_FILE, nc, 'utf8');
console.log('1993 interpretation injected successfully!');
console.log('Backup at:', backupPath);
