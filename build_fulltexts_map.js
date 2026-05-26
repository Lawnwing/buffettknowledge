/**
 * build_fulltexts_map.js
 * Read fulltexts.ts, extract slug->fullText using a robust state machine.
 * Output: fulltexts_map.json
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'data', 'fulltexts.ts');

function parseFullTexts(content) {
  const map = {};
  let i = 0;
  const n = content.length;
  
  // Skip to the opening brace of the object
  const openBrace = content.indexOf('{', content.indexOf('Record'));
  if (openBrace === -1) throw new Error('Could not find opening brace');
  i = openBrace + 1;
  
  while (i < n) {
    // Skip whitespace
    while (i < n && (content[i] === ' ' || content[i] === '\t' || content[i] === '\n' || content[i] === '\r')) i++;
    if (i >= n) break;
    
    // Check for closing brace
    if (content[i] === '}') break;
    
    // Expect: 'slug': `
    if (content[i] !== "'") { i++; continue; }
    
    // Read slug
    const slugStart = i + 1;
    let slugEnd = content.indexOf("'", slugStart);
    if (slugEnd === -1) { i++; continue; }
    const slug = content.substring(slugStart, slugEnd);
    i = slugEnd + 1;
    
    // Skip to `
    while (i < n && content[i] !== '`') i++;
    if (i >= n) break;
    i++; // skip the opening backtick
    
    // Now read content until closing backtick
    const contentStart = i;
    // Find the closing backtick that is followed by , or newline
    let contentEnd = -1;
    while (i < n) {
      if (content[i] === '`') {
        // Check if this is the closing backtick
        // It should be followed by , or newline/whitespace+, 
        let j = i + 1;
        while (j < n && (content[j] === ' ' || content[j] === '\t')) j++;
        if (j < n && (content[j] === ',' || content[j] === '\n' || content[j] === '\r' || content[j] === '}')) {
          contentEnd = i;
          i = j;
          break;
        }
      }
      i++;
    }
    
    if (contentEnd === -1) {
      console.log(`  WARNING: no closing backtick for slug: ${slug}`);
      continue;
    }
    
    const fullText = content.substring(contentStart, contentEnd);
    map[slug] = fullText;
    console.log(`  Parsed: ${slug} (${fullText.length} chars)`);
  }
  
  return map;
}

function main() {
  console.log('Reading fulltexts.ts...');
  const content = fs.readFileSync(FILE, 'utf8');
  console.log(`  File size: ${content.length} chars`);
  
  console.log('Parsing...');
  const map = parseFullTexts(content);
  console.log(`  Found ${Object.keys(map).length} entries`);
  
  // Write JSON (but fullText content may have characters that don't encode well)
  // Instead, write a JS file that can be required
  const outputPath = path.join(__dirname, 'data', 'fulltexts_map.json');
  
  // JSON.stringify with max chars per entry for preview
  const preview = {};
  for (const [slug, text] of Object.entries(map)) {
    preview[slug] = text.substring(0, 100) + '...';
  }
  fs.writeFileSync(outputPath + '.preview', JSON.stringify(preview, null, 2), 'utf8');
  console.log(`  Preview written to ${outputPath}.preview`);
  
  // Write the actual map as a JS file (safer for full Unicode)
  const jsOutput = path.join(__dirname, 'data', 'fulltexts_map.js');
  let jsContent = 'module.exports = {\n';
  for (const [slug, text] of Object.entries(map)) {
    const escaped = text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r');
    jsContent += `  '${slug}': '${escaped}',\n`;
  }
  jsContent += '};\n';
  fs.writeFileSync(jsOutput, jsContent, 'utf8');
  console.log(`  JS map written to ${jsOutput}`);
  console.log(`  Total entries: ${Object.keys(map).length}`);
}

main();
