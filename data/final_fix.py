# -*- coding: utf-8 -*-
import re

with open('data/letters.ts.backup_before_fix', 'r', encoding='utf-8') as f:
    raw = f.read()

lines = raw.split('\n')
out = []
current_slug = None

for line in lines:
    m = re.search(r"slug:\s*'([^']+)'", line)
    if m:
        current_slug = m.group(1)

    m = re.match(r'^(\s+)(fullText:\s*`)(.*)$', line)
    if m:
        indent = m.group(1)
        if current_slug == '1956-partnership-letter':
            out.append(line + '\n')
        else:
            out.append(indent + 'fullText: `[[PLACEHOLDER]]`,\n')
    else:
        out.append(line + '\n')

result = ''.join(out)

# Fix the ] ;  -> },  pattern for partnershipLetters array end
result = result.replace('  ];\n\n// ============================================================\n// Berkshire Hathaway Annual Letters',
                        '  },\n];\n\n// ============================================================\n// Berkshire Hathaway Annual Letters')

# Fix garbled em-dash
result = result.replace('\u2014', '-')

# Add exports
result = result + '''

// ============================================================
// All letters combined
// ============================================================

export const allLetters: Letter[] = [
  ...partnershipLetters,
  ...berkshireLetters,
  ...specialLetters,
];

// ============================================================
// Statistics
// ============================================================

export const stats = {
  totalLetters: allLetters.length,
  yearsCovered: new Set(allLetters.map((l) => l.year)).size,
  partnershipLetters: partnershipLetters.length,
  berkshireLetters: berkshireLetters.length,
  specialLetters: specialLetters.length,
};

// ============================================================
// Helpers
// ============================================================

export function getLetterBySlug(slug: string): Letter | undefined {
  return allLetters.find((l) => l.slug === slug);
}
'''

with open('data/letters.ts', 'w', encoding='utf-8') as f:
    f.write(result)

print('Done. Lines:', result.count('\n'))
