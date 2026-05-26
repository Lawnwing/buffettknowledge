// remove_1993.js
// Safely remove 1993 entry from interpretations.ts

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'data', 'interpretations.ts');
const content = fs.readFileSync(FILE, 'utf8');

// Find 1993 entry start
const startMarker = "'1993-berkshire-letter': {";
const startIdx = content.indexOf(startMarker);
if (startIdx === -1) { console.error('1993 entry not found'); process.exit(1); }

// Find the CLOSING '  },' that corresponds to this entry
// Strategy: count braces from startIdx
let braceCount = 0;
let inString = false;
let inTemplate = false;
let escaped = false;
let endIdx = -1;

for (let i = startIdx + startMarker.length; i < content.length; i++) {
  const ch = content[i];
  
  if (escaped) { escaped = false; continue; }
  if (ch === '\\') { escaped = true; continue; }
  
  if (!inString && !inTemplate) {
    if (ch === '{') braceCount++;
    else if (ch === '}') {
      braceCount--;
      if (braceCount === 0) {
        // Found the closing brace of the 1993 entry
        // Now find the '  },' (with comma) or '  }' (last entry)
        // Actually, we need to include the '  },' that closes this entry
        // The entry closing is `  },\n\n  '1994...` or `  }\n}`
        // Let me find the `  },` pattern
        const afterBrace = content.slice(i + 1).match(/^\s*,/);
        if (afterBrace) {
          endIdx = i + 1 + afterBrace[0].length;
        } else {
          endIdx = i;
        }
        break;
      }
    }
    else if (ch === "'") inString = 'single';
    else if (ch === '"') inString = 'double';
    else if (ch === '`') inTemplate = true;
  } else if (inString === 'single' && ch === "'") {
    inString = false;
  } else if (inString === 'double' && ch === '"') {
    inString = false;
  } else if (inTemplate && ch === '`') {
    inTemplate = false;
  }
}

if (endIdx === -1) { console.error('Could not find end of 1993 entry'); process.exit(1); }

console.log('1993 entry: startIdx=' + startIdx + ', endIdx=' + endIdx);
console.log('Entry length:', endIdx - startIdx);

// Now we need to REMOVE from the START of the 1993 entry to endIdx
// But we also need to handle the preceding '  },\n\n  ' marker
// Actually, let me just remove from startIdx to endIdx and also handle whitespace

// Find the PREVIOUS entry's closing '  },' before this entry
const before = content.slice(0, startIdx);
const lastBrace = before.lastIndexOf('  },');
if (lastBrace === -1) { console.error('Could not find previous entry close'); process.exit(1); }

// Keep everything up to and including '  },\n\n'
// Actually, let me keep everything BEFORE the '  \n  ' + startMarker
// The pattern is: `  },\n\n  '1993-...`
// I want to remove from the `\n\n  '1993-...'` part

// Let me find the \n\n before startMarker
const wl = before.lastIndexOf('\n\n  ' + startMarker.trim());
if (wl === -1) {
  console.log('Could not find whitespace before 1993 entry, using startIdx');
  // Just remove from startIdx to endIdx
  const newContent = content.slice(0, startIdx) + content.slice(endIdx + 1);
  fs.writeFileSync(FILE + '.removed', newContent, 'utf8');
  console.log('Written to', FILE + '.removed');
} else {
  // Remove from wl to endIdx
  const newContent = content.slice(0, wl) + content.slice(endIdx + 1);
  
  // Write backup
  const backup = FILE + '.backup_' + Date.now();
  fs.copyFileSync(FILE, backup);
  console.log('Backup:', backup);
  
  fs.writeFileSync(FILE, newContent, 'utf8');
  console.log('1993 entry REMOVED.');
  console.log('New file size:', newContent.length);
}
