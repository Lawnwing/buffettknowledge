const fs = require('fs');
const path = require('path');

const INTERP_FILE = path.join(__dirname, 'data', 'interpretations.ts');
const YEARS = [1993, 1994, 1995, 1996];

// Read interpretations.ts
let content = fs.readFileSync(INTERP_FILE, 'utf8');

// Read each interp_YYYY.ts and extract the interpretation object
const entries = [];
for (const year of YEARS) {
  const filePath = path.join(__dirname, `interp_${year}.ts`);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${filePath} not found`);
    continue;
  }
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Extract the value part: after `'YYYY-berkshire-letter': `
  // The format is: 'YYYY-berkshire-letter': { ... },
  const slug = `${year}-berkshire-letter`;
  const marker = `'${slug}': `;
  const markerIdx = fileContent.indexOf(marker);
  if (markerIdx === -1) {
    console.log(`SKIP: ${slug} not found in ${filePath}`);
    continue;
  }
  
  // Find the opening { after the marker
  const objStart = fileContent.indexOf('{', markerIdx + marker.length);
  if (objStart === -1) {
    console.log(`SKIP: opening { not found for ${slug}`);
    continue;
  }
  
  // Find matching closing }
  let braceCount = 0;
  let i = objStart;
  let inString = false;
  let stringChar = null;
  while (i < fileContent.length) {
    const ch = fileContent[i];
    if (inString) {
      if (ch === '\\') { i += 2; continue; }
      if (ch === stringChar) { inString = false; }
      i++;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      inString = true;
      stringChar = ch;
      i++;
      continue;
    }
    if (ch === '{') braceCount++;
    if (ch === '}') {
      braceCount--;
      if (braceCount === 0) {
        // Found matching closing brace
        const entryContent = fileContent.slice(markerIdx + marker.length - (`'${slug}': `.length), i + 1);
        entries.push({ year, slug, entryContent });
        console.log(`✓ Extracted ${slug} (${i - (markerIdx + marker.length - (`'${slug}': `.length))} chars)`);
        break;
      }
    }
    i++;
  }
}

if (entries.length === 0) {
  console.log('ERROR: No entries extracted. Aborting.');
  process.exit(1);
}

// Build the injection string
// Each entry needs to be: `  'slug': { ... },`
const injection = entries.map(e => {
  // entryContent already includes the `'slug': { ... },` part
  // But we need to add proper indentation
  const lines = e.entryContent.split('\n');
  const indented = lines.map((line, idx) => {
    if (idx === 0) return `  ${line}`;
    return line;
  }).join('\n');
  return indented;
}).join('\n\n');

// Find insertion point: before the closing `}` of the Record
// The Record closes with a `}` at the end of the file
// We need to find the LAST `}` that is at the start of a line (possibly with spaces)
// Actually, safer: find the last `}` that is the Record closer
// Strategy: find the last occurrence of `\n}` (possibly with spaces before })
const lastBraceIdx = content.lastIndexOf('\n}');
if (lastBraceIdx === -1) {
  console.log('ERROR: Could not find closing } of Record');
  process.exit(1);
}

// Check if the line before lastBraceIdx is empty or a comment
// We want to insert BEFORE the closing }
// First, make sure the previous entry has a trailing comma
// Find the second-to-last `  },` pattern
const prevEntryEnd = content.lastIndexOf('  },', lastBraceIdx);
if (prevEntryEnd === -1) {
  console.log('ERROR: Could not find previous entry closing');
  process.exit(1);
}

// Insert after the previous entry's closing },
// Actually, let me just insert before the final `}`
// But we need a newline and proper formatting

// Simpler approach: insert the new entries before the final `}`
// With a blank line and proper comma handling

// Check if there's already a comma after the last entry
const beforeClosing = content.slice(prevEntryEnd, lastBraceIdx).trim();
console.log('Text before closing }:', JSON.stringify(beforeClosing.slice(-50)));

// Build the full injection
// We need: newline + newline + each entry (already has trailing ,) + newline
const fullInjection = '\n\n' + injection + '\n';

// Insert before the closing }
const newContent = content.slice(0, lastBraceIdx) + fullInjection + content.slice(lastBraceIdx);

// Write backup
const backupPath = INTERP_FILE + '.backup_' + Date.now();
fs.copyFileSync(INTERP_FILE, backupPath);
console.log(`Backup saved to: ${backupPath}`);

// Write new content
fs.writeFileSync(INTERP_FILE, newContent, 'utf8');
console.log(`✓ Injected ${entries.length} entries into interpretations.ts`);
console.log(`  File size: ${content.length} → ${newContent.length} chars`);
