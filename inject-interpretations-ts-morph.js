/**
 * inject-interpretations-ts-morph.js
 * Correctly inject interpretations into letters.ts using ts-morph.
 * 
 * Usage: node inject-interpretations-ts-morph.js
 */
const fs = require('fs');
const path = require('path');
const { Project } = require('ts-morph');

const LETTERS_PATH = 'C:/Users/info/WorkBuddy/2026-05-15-task-1/buffettknowledge/data/letters.ts';
const INTERP_JSON = 'C:/Users/info/WorkBuddy/2026-05-15-task-1/interpretations_1971_1972.json';

function buildInterpTsString(interp) {
  /**
   * Build a valid TypeScript object literal string for the interpretation.
   * Matches the format in letters.ts exactly.
   */
  const lines = [];
  lines.push('  interpretation: {');
  
  // overview
  lines.push('    overview:');
  lines.push(`      "${esc(interp.overview)}",`);
  
  // keyTakeaways
  lines.push('    keyTakeaways: [');
  for (const kt of interp.keyTakeaways) {
    lines.push(`      "${esc(kt)}",`);
  }
  // Remove trailing comma from last keyTakeaway
  if (interp.keyTakeaways.length > 0) {
    const lastIdx = lines.length - 1;
    lines[lastIdx] = lines[lastIdx].replace(/,$/, '');
  }
  lines.push('    ],');
  
  // sections
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
    const lastIdx = lines.length - 1;
    lines[lastIdx] = lines[lastIdx].replace(/},$/, '}');
  }
  lines.push('      }');
  lines.push('    ],');
  
  // relatedConcepts
  if (interp.relatedConcepts && interp.relatedConcepts.length > 0) {
    lines.push('    relatedConcepts: [');
    for (const c of interp.relatedConcepts) {
      lines.push(`      "${c}",`);
    }
    lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
    lines.push('    ],');
  }
  
  // relatedCompanies
  if (interp.relatedCompanies && interp.relatedCompanies.length > 0) {
    lines.push('    relatedCompanies: [');
    for (const c of interp.relatedCompanies) {
      lines.push(`      "${c}",`);
    }
    lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
    lines.push('    ],');
  }
  
  // relatedPeople
  if (interp.relatedPeople && interp.relatedPeople.length > 0) {
    lines.push('    relatedPeople: [');
    for (const p of interp.relatedPeople) {
      lines.push(`      "${p}",`);
    }
    lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
    lines.push('    ],');
  }
  
  // marketContext
  if (interp.marketContext) {
    const mc = interp.marketContext;
    lines.push('    marketContext: {');
    lines.push(`      description: "${esc(mc.description)}",`);
    if (mc.sp500Return) lines.push(`      sp500Return: "${mc.sp500Return}",`);
    if (mc.fedFundsRate) lines.push(`      fedFundsRate: "${mc.fedFundsRate}",`);
    if (mc.inflation) lines.push(`      inflation: "${mc.inflation}",`);
    if (mc.marketPhase) lines.push(`      marketPhase: "${mc.marketPhase}",`);
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
  
  // Remove trailing comma from last property
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
  console.log('Loading interpretations...');
  const raw = fs.readFileSync(INTERP_JSON, 'utf-8');
  const interpretations = JSON.parse(raw);
  const slugs = Object.keys(interpretations);
  console.log(`Loaded interpretations for: ${slugs.join(', ')}`);
  
  console.log('Creating ts-morph project...');
  const project = new Project({
    tsConfigFilePath: undefined,
    useInMemoryFileSystem: false,
    skipAddingFilesFromTsConfig: true,
  });
  
  console.log(`Adding source file: ${LETTERS_PATH}`);
  const sourceFile = project.addSourceFileAtPath(LETTERS_PATH);
  
  if (!sourceFile) {
    console.error('Could not load letters.ts!');
    process.exit(1);
  }
  
  // Find the 'letters' variable declaration
  const varDecl = sourceFile.getVariableDeclaration('letters');
  if (!varDecl) {
    console.error('Could not find "letters" variable!');
    process.exit(1);
  }
  
  const init = varDecl.getInitializer();
  if (!init || !init.isArrayLiteral()) {
    console.error('"letters" is not an array literal!');
    process.exit(1);
  }
  
  const arr = init;
  const elements = arr.getElements();
  console.log(`Found ${elements.length} letter objects in letters array`);
  
  let injected = 0;
  
  for (const elem of elements) {
    if (!elem.isKind(183)) continue; // not an object literal
    const obj = elem;
    
    const slugProp = obj.getProperty('slug');
    if (!slugProp) continue;
    const slugAssign = slugProp.getInitializer();
    if (!slugAssign || !slugAssign.isKind(88)) continue; // not string literal
    const slugValue = slugAssign.getLiteralText().replace(/^['"]|['"]$/g, '');
    
    if (interpretations[slugValue]) {
      // Check if interpretation already exists
      const existing = obj.getProperty('interpretation');
      if (existing) {
        console.log(`  SKIP (already has interpretation): ${slugValue}`);
        continue;
      }
      
      console.log(`  Injecting interpretation for: ${slugValue}`);
      const interp = interpretations[slugValue];
      const interpStr = buildInterpTsString(interp);
      
      // Use ts-morph to add the interpretation property
      // The initializer needs to be a valid TS expression
      // We create a temp source file to parse the object literal
      const tempFile = project.createSourceFile('temp_interp.ts', `const interp = ${interpStr};`);
      const tempVar = tempFile.getVariableDeclaration('interp');
      if (!tempVar) {
        console.error(`  ERROR: could not parse interpretation for ${slugValue}`);
        project.removeSourceFile(tempFile);
        continue;
      }
      const interpInitializer = tempVar.getInitializer();
      
      obj.addPropertyAssignment({
        name: 'interpretation',
        initializer: interpInitializer.getText(),
      });
      
      project.removeSourceFile(tempFile);
      injected++;
      console.log(`  INJECTED: ${slugValue}`);
    }
  }
  
  if (injected > 0) {
    // Create backup
    const backupPath = LETTERS_PATH + '.backup_tsmorph_' + new Date().toISOString().replace(/[:.]/g, '-');
    fs.copyFileSync(LETTERS_PATH, backupPath);
    console.log(`Backup: ${backupPath}`);
    
    // Save
    sourceFile.saveSync();
    console.log(`\nDone! Injected ${injected} interpretations.`);
    console.log('Next: cd buffettknowledge && npm run build');
  } else {
    console.log('\nNo interpretations injected (all may already exist).');
  }
}

main();
