/**
 * inject_batch1.js
 * Inject 1992-1996 fullText from fulltexts_map.js into letters.ts
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const MAP_FILE = path.join(ROOT, 'data', 'fulltexts_map.js');
const LETTERS_FILE = path.join(ROOT, 'data', 'letters.ts');

const years = [1992, 1993, 1994, 1995, 1996];

function main() {
  console.log('Reading fulltexts_map.js...');
  // The map file uses module.exports = {...}
  // We need to require it
  const map = require(MAP_FILE);
  console.log(`  Map has ${Object.keys(map).length} entries`);

  console.log('Reading letters.ts...');
  let content = fs.readFileSync(LETTERS_FILE, 'utf8');

  const replacements = [];

  for (const year of years) {
    const slug = `${year}-berkshire-letter`;
    const fullText = map[slug];
    if (!fullText) {
      console.log(`  SKIP ${year}: not found in map`);
      continue;
    }

    // Find the placeholder for this slug
    // Strategy: find the slug first, then find the placeholder after it
    const slugPattern = `slug: '${slug}'`;
    const slugIdx = content.indexOf(slugPattern);
    if (slugIdx === -1) {
      console.log(`  SKIP ${year}: slug not found in letters.ts`);
      continue;
    }

    // Search for placeholder after this slug
    const afterSlug = content.substring(slugIdx);
    const phPattern = "fullText: `[[PLACEHOLDER]]`";
    const phIdx = afterSlug.indexOf(phPattern);
    if (phIdx === -1) {
      console.log(`  SKIP ${year}: no placeholder found (already injected?)`);
      continue;
    }

    const absIdx = slugIdx + phIdx;
    const phLen = phPattern.length;

    // Build replacement: fullText: ` + newline + content + newline + `,
    // The content from fulltexts.ts already has proper formatting
    // We need to put it between backticks
    const replacement = "fullText: `\n" + fullText + "\n  `,";

    replacements.push({
      start: absIdx,
      end: absIdx + phLen,
      replacement: replacement,
      year: year,
      len: fullText.length
    });
    console.log(`  Queued ${year}: ${fullText.length} chars`);
  }

  if (replacements.length === 0) {
    console.log('\nNothing to inject. All done?');
    return;
  }

  // Sort by start position DESCENDING (process from bottom to avoid index shifts)
  replacements.sort((a, b) => b.start - a.start);

  console.log(`\nInjecting ${replacements.length} entries (bottom-to-top)...`);
  for (const r of replacements) {
    content = content.substring(0, r.start) + r.replacement + content.substring(r.end);
    console.log(`  OK ${r.year}: ${r.len} chars injected`);
  }

  // Backup
  const backup = LETTERS_FILE + '.backup_' + Date.now();
  fs.copyFileSync(LETTERS_FILE, backup);
  console.log(`\nBackup: ${backup}`);

  fs.writeFileSync(LETTERS_FILE, content, 'utf8');
  console.log('letters.ts updated!');

  // Verify: count remaining placeholders
  const remaining = (content.match(/\[\[PLACEHOLDER\]\]/g) || []).length;
  console.log(`Remaining [[PLACEHOLDER]]: ${remaining}`);
}

main();
