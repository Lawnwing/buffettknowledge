// check_backticks.js
// Check if 1993 entry has balanced backticks

const fs = require('fs');
const c = fs.readFileSync('data/interpretations.ts', 'utf8');

const start = c.indexOf("'1993-berkshire-letter':");
const end = c.indexOf("'1994-berkshire-letter':", start);

if (start === -1) { console.log('1993 entry not found'); process.exit(1); }
if (end === -1) { console.log('1994 entry not found'); process.exit(1); }

const entry = c.slice(start, end);
console.log('Entry length (chars):', entry.length);

// Count backticks (not preceded by backslash)
let count = 0;
let inEscape = false;
for (let i = 0; i < entry.length; i++) {
  if (entry[i] === '\\') { inEscape = !inEscape; continue; }
  if (entry[i] === '`' && !inEscape) { count++; }
  inEscape = false;
}
console.log('Total backticks (un Escaped):', count);
console.log('Expected: even number (all pairs closed)');
if (count % 2 !== 0) {
  console.log('ERROR: ODD number of backticks - unclosed template literal!');
  // Find where the unmatched backtick is
  let bc = 0;
  for (let i = 0; i < entry.length; i++) {
    if (entry[i] === '\\') { i++; continue; }
    if (entry[i] === '`') { bc++; }
    if (bc % 2 === 1 && entry[i] === '`' && entry[i-1] !== '\\') {
      // This might be the unmatched one... actually this logic is tricky
    }
  }
} else {
  console.log('Backticks are balanced - not the problem');
}
