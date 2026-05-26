/**
 * inject_1992.js
 * Inject 1992 interpretation into interpretations.ts
 * Handles \n and \r\n line endings
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const INTERP_FILE = path.join(ROOT, 'data', 'interpretations.ts');
const ENTRY_FILE = path.join(ROOT, 'interp_1992.ts');

function main() {
  let content = fs.readFileSync(INTERP_FILE, 'utf8');
  let entry = fs.readFileSync(ENTRY_FILE, 'utf8');
  entry = entry.trim();

  // The file ends with: "  }\n}" or "  }\r\n}"
  // We need to insert the new entry BEFORE the closing "}"
  // Strategy: find the last "}" that closes the interpretations object

  // Find: "  }\n}" pattern (last entry closing + object closing)
  // Try \n first, then \r\n
  let target = null;
  const candidates = ['\n  }\n}', '\r\n  }\r\n}', '\n}\n', '\r\n}\r\n'];
  for (const c of candidates) {
    if (content.includes(c)) {
      target = c;
      break;
    }
  }

  if (!target) {
    // Fallback: find last "}" with whitespace before it
    const match = content.match(/(\s{2}}\s*})$/);
    if (match) {
      target = match[1];
    }
  }

  if (!target) {
    console.error('ERROR: Could not find ending pattern in interpretations.ts');
    console.error('Last 200 chars:', JSON.stringify(content.slice(-200)));
    process.exit(1);
  }

  console.log(`Found target pattern: ${JSON.stringify(target)}`);

  const targetIdx = content.lastIndexOf(target);
  const before = content.substring(0, targetIdx);
  // afterTarget = the target string (which includes the closing "}")
  // We want to replace: target with: "  },\n\n" + entry + "\n}"
  // But target ends with "}". We need to preserve that "}" at the very end.

  // Actually: target = "  }\n}" (or similar)
  // - "  }" = closing of last entry
  // - "\n" = newline
  // - "}" = closing of interpretations object
  // We want: "  },\n\n" + entry + "\n}"
  // = add comma to last entry, add newline + entry, then add "}"

  const newContent = before + '  },\n\n' + entry + '\n}';

  // Backup
  const backup = INTERP_FILE + '.backup_' + Date.now();
  fs.copyFileSync(INTERP_FILE, backup);
  console.log(`Backup: ${backup}`);

  fs.writeFileSync(INTERP_FILE, newContent, 'utf8');
  console.log('1992 interpretation injected!');

  // Verify: check build
  console.log('\nRunning tsc --noEmit to verify...');
}

main();
