/**
 * inject_interp.js
 * Inject interp_YYYY.ts entries into interpretations.ts
 * Usage: node inject_interp.js [year]
 * Example: node inject_interp.js 1992
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const INTERP_FILE = path.join(ROOT, 'data', 'interpretations.ts');

function inject(year) {
  const slug = `${year}-berkshire-letter`;
  const entryFile = path.join(ROOT, `interp_${year}.ts`);
  
  if (!fs.existsSync(entryFile)) {
    console.error(`ERROR: ${entryFile} not found`);
    process.exit(1);
  }
  
  console.log(`Reading ${entryFile}...`);
  const entryContent = fs.readFileSync(entryFile, 'utf8');
  
  console.log(`Reading ${INTERP_FILE}...`);
  let content = fs.readFileSync(INTERP_FILE, 'utf8');
  
  // Check if slug already exists
  if (content.includes(`'${slug}':`)) {
    console.log(`WARNING: ${slug} already exists in interpretations.ts`);
    console.log('Skipping injection. Delete the existing entry first if you want to replace it.');
    return;
  }
  
  // Find the closing `};`
  const closingIdx = content.lastIndexOf('};');
  if (closingIdx === -1) {
    console.error('ERROR: Could not find closing `};` in interpretations.ts');
    process.exit(1);
  }
  
  // Insert before `};`
  // Format: add comma to the previous line, then add the new entry, then `};`
  const before = content.substring(0, closingIdx).trimEnd();
  const after = content.substring(closingIdx);
  
  // Build new content
  // Add newline + the new entry + newline + `};`
  const newContent = before + '\n' + entryContent.trim() + '\n' + after;
  
  // Backup
  const backup = INTERP_FILE + `.backup_${Date.now()}`;
  fs.copyFileSync(INTERP_FILE, backup);
  console.log(`Backup: ${backup}`);
  
  fs.writeFileSync(INTERP_FILE, newContent, 'utf8');
  console.log(`Injected ${slug} into interpretations.ts`);
  console.log(`Entry length: ${entryContent.length} chars`);
}

const year = parseInt(process.argv[2]);
if (!year) {
  console.error('Usage: node inject_interp.js [year]');
  console.error('Example: node inject_interp.js 1992');
  process.exit(1);
}

inject(year);
