const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'data', 'fulltexts.ts');

function extractFullText(content, slug) {
  const startMarker = `'${slug}': `;
  const startIdx = content.indexOf(startMarker);
  if (startIdx === -1) return null;
  
  // Find opening backtick
  const tickStart = content.indexOf('`', startIdx + startMarker.length);
  if (tickStart === -1) return null;
  
  // Find matching closing backtick (not escaped)
  let i = tickStart + 1;
  const n = content.length;
  while (i < n) {
    if (content[i] === '\\') { i += 2; continue; }
    if (content[i] === '`') {
      return content.slice(tickStart + 1, i);
    }
    i++;
  }
  return null;
}

function htmlToText(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\s+/g, ' ')
    .trim();
}

const content = fs.readFileSync(FILE, 'utf8');
const years = ['1993-berkshire-letter', '1994-berkshire-letter', '1995-berkshire-letter', '1996-berkshire-letter'];

for (const slug of years) {
  const html = extractFullText(content, slug);
  if (html) {
    const plain = htmlToText(html);
    const outPath = path.join(__dirname, `temp_${slug}.txt`);
    fs.writeFileSync(outPath, plain, 'utf8');
    console.log(`✓ ${slug}: HTML ${html.length} chars → plain ${plain.length} chars → saved to temp_${slug}.txt`);
    // Also print first 1500 chars
    console.log(`  Preview: ${plain.slice(0, 1500)}\n`);
  } else {
    console.log(`✗ NOT FOUND: ${slug}`);
  }
}
