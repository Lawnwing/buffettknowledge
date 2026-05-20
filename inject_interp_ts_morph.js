/**
 * inject-interpretations.js
 * Use ts-morph to inject interpretations into letters.ts.
 * ts-morph handles all TypeScript syntax correctly.
 */
const fs = require('fs');
const path = require('path');
const { Project } = require('ts-morph');

const LETTERS_PATH = 'C:/Users/info/WorkBuddy/2026-05-15-task-1/buffettknowledge/data/letters.ts';
const INTERP_JSON = 'C:/Users/info/WorkBuddy/2026-05-15-task-1/interpretations_1971_1972.json';

// Interpretation data (will be loaded from JSON)
let interpretations = {};

function interpToTsObject(interp) {
  // Build the TypeScript object literal string
  // ts-morph will parse it correctly
  const lines = [];
  lines.push('  interpretation: {');
  lines.push(`    overview:`);
  lines.push(`      "${esc(interp.overview)}",`);
  lines.push('    keyTakeaways: [');
  for (const kt of interp.keyTakeaways) {
    lines.push(`      "${esc(kt)}",`);
  }
  // Remove trailing comma from last keyTakeaway
  if (interp.keyTakeaways.length > 0) {
    const lastIdx = lines.lastIndexOf(lines[lines.length - 1]);
    lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
  }
  lines.push('    ],');
  lines.push('    sections: [');
  for (const sec of interp.sections) {
    lines.push('      {');
    lines.push(`        title: "${esc(sec.title)}",`);
    lines.push(`        type: "${sec.type}",`);
    lines.push(`        content:`);
    lines.push(`          "${esc(sec.content)}"`);
    lines.push('      },');
  }
  if (interp.sections.length > 0) {
    lines[lines.length - 1] = lines[lines.length - 1].replace(/},$/, '}');
  }
  lines.push('    ],');
  // relatedConcepts
  lines.push('    relatedConcepts: [');
  for (const c of (interp.relatedConcepts || [])) {
    lines.push(`      "${c}",`);
  }
  if ((interp.relatedConcepts || []).length > 0) {
    lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
  }
  lines.push('    ],');
  // relatedCompanies
  lines.push('    relatedCompanies: [');
  for (const c of (interp.relatedCompanies || [])) {
    lines.push(`      "${c}",`);
  }
  if ((interp.relatedCompanies || []).length > 0) {
    lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
  }
  lines.push('    ],');
  // relatedPeople
  lines.push('    relatedPeople: [');
  for (const p of (interp.relatedPeople || [])) {
    lines.push(`      "${p}",`);
  }
  if ((interp.relatedPeople || []).length > 0) {
    lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
  }
  lines.push('    ],');
  // marketContext
  if (interp.marketContext) {
    const mc = interp.marketContext;
    lines.push('    marketContext: {');
    lines.push(`      description: "${esc(mc.description)}",`);
    if (mc.sp500Return) lines.push(`      sp500Return: "${mc.sp500Return}",`);
    if (mc.fedFundsRate) lines.push(`      fedFundsRate: "${mc.fedFundsRate}",`);
    if (mc.inflation) lines.push(`      inflation: "${mc.inflation}",`);
    if (mc.marketPhase) lines.push(`      marketPhase: "${mc.marketPhase}",`);
    // Remove trailing comma
    lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
    lines.push('    },');
  }
  // keyNumbers
  if (interp.keyNumbers && interp.keyNumbers.length > 0) {
    lines.push('    keyNumbers: [');
    for (const k of interp.keyNumbers) {
      lines.push('      {');
      lines.push(`        label: "${esc(k.label)}",`);
      lines.push(`        value: "${esc(k.value)}",`);
      if (k.unit) lines.push(`        unit: "${esc(k.unit)}",`);
      if (k.context) lines.push(`        context: "${esc(k.context)}",`);
      // Remove trailing comma
      lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
      lines.push('      },');
    }
    lines[lines.length - 1] = lines[lines.length - 1].replace(/},$/, '}');
    lines.push('    ],');
  }
  // thenVsNow
  if (interp.thenVsNow) {
    lines.push('    thenVsNow: {');
    lines.push(`      then: "${esc(interp.thenVsNow.then)}",`);
    lines.push(`      now: "${esc(interp.thenVsNow.now)}"`);
    lines.push('    },');
  }
  // Remove trailing comma from last item
  if (lines[lines.length - 1].endsWith(',')) {
    lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
  }
  lines.push('  }');
  return lines.join('\n');
}

function esc(s) {
  if (typeof s !== 'string') s = String(s);
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}

function main() {
  // Load interpretations
  const raw = fs.readFileSync(INTERP_JSON, 'utf-8');
  interpretations = JSON.parse(raw);
  const slugs = Object.keys(interpretations);
  console.log(`Loaded interpretations for: ${slugs.join(', ')}`);

  // Create ts-morph project
  const project = new Project({
    tsConfigFilePath: undefined,
  });
  
  // Add source file
  const sourceFile = project.addSourceFileAtPath(LETTERS_PATH);
  
  // Find the 'letters' variable (export const letters: Letter[] = [...])
  const varDecl = sourceFile.getVariableDeclaration('letters');
  if (!varDecl) {
    console.error('Could not find "letters" variable declaration');
    process.exit(1);
  }
  
  const init = varDecl.getInitializer();
  if (!init || !init.isArrayLiteral()) {
    console.error('"letters" is not an array literal');
    process.exit(1);
  }
  
  const arr = init;
  const elements = arr.getElements();
  
  console.log(`Found ${elements.length} letter objects in letters.ts`);
  
  let injected = 0;
  
  for (const elem of elements) {
    if (!elem.isKind(183)) continue; // not an object literal
    const obj = elem;
    // Find the 'slug' property
    const slugProp = obj.getProperty('slug');
    if (!slugProp) continue;
    const slugAssign = slugProp.getInitializer();
    if (!slugAssign || !slugAssign.isKind(88)) continue; // not a string literal
    const slugValue = slugAssign.getLiteralText();
    // Remove quotes
    const slug = slugValue.replace(/^['"]|['"]$/g, '');
    
    if (interpretations[slug]) {
      // Check if interpretation already exists
      const existing = obj.getProperty('interpretation');
      if (existing) {
        console.log(`  SKIP (already has interpretation): ${slug}`);
        continue;
      }
      
      // Build the interpretation object string
      const interpStr = interpToTsObject(interpretations[slug]);
      
      // Add interpretation property to the object
      // We need to insert it before the closing '}' of the object
      // Simplest: append as a new property
      obj.addPropertyAssignment({
        name: 'interpretation',
        initializer: interpStr,
      });
      
      console.log(`  INJECTED: ${slug}`);
      injected++;
    }
  }
  
  // Save
  if (injected > 0) {
    // Create backup
    const backupPath = LETTERS_PATH + '.backup_ts_morph_' + new Date().toISOString().replace(/[:.]/g, '-');
    fs.copyFileSync(LETTERS_PATH, backupPath);
    console.log(`Backup: ${backupPath}`);
    
    // Save
    sourceFile.saveSync();
    console.log(`\nDone! Injected ${injected} interpretations into letters.ts`);
    console.log(`Run: cd buffettknowledge && npm run build`);
  } else {
    console.log('\nNo interpretations injected (all may already exist).');
  }
}

main();
