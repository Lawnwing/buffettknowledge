/**
 * inject_fulltexts.js
 * Inject fullText from fulltexts.ts into letters.ts (replace [[PLACEHOLDER]])
 * Usage: node inject_fulltexts.js [startYear] [endYear]
 * Example: node inject_fulltexts.js 1992 1996
 */

const fs = require('fs');
const path = require('path');

const FULLTEXTS_FILE = path.join(__dirname, 'data', 'fulltexts.ts');
const LETTERS_FILE = path.join(__dirname, 'data', 'letters.ts');

function parseFullTexts(content) {
  // Extract slug -> fullText from fulltexts.ts
  // Format: 'slug': `...`,
  const map = {};
  // Use a state machine to parse the TypeScript export
  // Simpler: extract using regex for each slug pattern
  const slugPattern = /'([0-9]{4}-[^']+)':\s*\`([\\s\\S]*?)\`\s*,/g;
  let match;
  while ((match = slugPattern.exec(content)) !== null) {
    const slug = match[1];
    const fullText = match[2];
    map[slug] = fullText;
  }
  return map;
}

function inject(lettersContent, fullTextsMap, startYear, endYear) {
  let result = lettersContent;
  let replaced = 0;
  let skipped = 0;

  for (let year = startYear; year <= endYear; year++) {
    const slug = `${year}-berkshire-letter`;
    const fullText = fullTextsMap[slug];

    if (!fullText) {
      console.log(`  SKIP: ${slug} not found in fulltexts.ts`);
      skipped++;
      continue;
    }

    // Replace [[PLACEHOLDER]] with actual fullText
    // Pattern: fullText: `[[PLACEHOLDER]]`,
    const placeholderPattern = new RegExp(
      `(slug:\\s*'${slug}'.*?fullText:\\s*)\`\\[\\[PLACEHOLDER\\]\\]\`([,\\s])`,
      's'  // dotAll flag for . to match newline
    );

    // Actually, simpler: just find and replace the placeholder for this slug
    // We need to be more targeted. Let's find the letter entry for this slug,
    // then replace the placeholder within it.

    // Find the position of this slug in the file
    const slugIndex = result.indexOf(`slug: '${slug}'`);
    if (slugIndex === -1) {
      console.log(`  SKIP: ${slug} not found in letters.ts`);
      skipped++;
      continue;
    }

    // Find the fullText placeholder after this slug
    const afterSlug = result.substring(slugIndex);
    const phIndex = afterSlug.indexOf("fullText: `[[PLACEHOLDER]]`");
    if (phIndex === -1) {
      console.log(`  SKIP: ${slug} has no PLACEHOLDER (already injected?)`);
      skipped++;
      continue;
    }

    // Replace the placeholder
    const actualIndex = slugIndex + phIndex;
    const before = result.substring(0, actualIndex);
    const after = result.substring(actualIndex + "fullText: `[[PLACEHOLDER]]`".length);

    // Build replacement with proper escaping
    // The fullText content needs to be wrapped in backticks
    // We need to escape any backticks in the content
    const escapedFullText = fullText; // fullText from fulltexts.ts is already the content between backticks

    result = before + 'fullText: `' + escapedFullText + '`' + after;
    console.log(`  OK: ${slug} (${fullText.length} chars)`);
    replaced++;
  }

  console.log(`\nDone: ${replaced} replaced, ${skipped} skipped`);
  return result;
}

function main() {
  const args = process.argv.slice(2);
  const startYear = parseInt(args[0]) || 1992;
  const endYear = parseInt(args[1]) || 1996;

  console.log(`Reading fulltexts.ts...`);
  const fulltextsContent = fs.readFileSync(FULLTEXTS_FILE, 'utf8');
  console.log(`Parsing fullText entries...`);
  const fullTextsMap = parseFullTexts(fulltextsContent);
  console.log(`Found ${Object.keys(fullTextsMap).length} entries in fulltexts.ts`);

  console.log(`Reading letters.ts...`);
  const lettersContent = fs.readFileSync(LETTERS_FILE, 'utf8');

  console.log(`Injecting ${startYear}-${endYear}...`);
  const newContent = inject(lettersContent, fullTextsMap, startYear, endYear);

  // Create backup
  const backupFile = LETTERS_FILE + '.backup_' + Date.now();
  fs.copyFileSync(LETTERS_FILE, backupFile);
  console.log(`Backup: ${backupFile}`);

  fs.writeFileSync(LETTERS_FILE, newContent, 'utf8');
  console.log(`Written to letters.ts`);
}

main();
