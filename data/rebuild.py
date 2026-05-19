# -*- coding: utf-8 -*-
import re

with open('data/letters.ts.backup_before_fix', 'r', encoding='utf-8') as f:
    lines = f.readlines()

out = []
current_slug = None

for raw in lines:
    m = re.search(r"slug:\s*'([^']+)'", raw)
    if m:
        current_slug = m.group(1)

    m = re.match(r'^(\s+)(fullText:\s*`)(.*)$', raw)
    if m:
        indent = m.group(1)
        if current_slug == '1956-partnership-letter':
            out.append(raw)
        else:
            out.append(indent + 'fullText: `[[PLACEHOLDER]]`,\n')
    else:
        out.append(raw)

result = ''.join(out)

# Fix structural: replace "  ];\n\n// === All letters" with "  },\n];\n\n// === All letters"
# Find the line after berkshireLetters array end (line 2325 in original)
lines_result = result.split('\n')
for idx, line in enumerate(lines_result):
    if re.match(r'^\s+\]\s*;\s*$', line) and idx + 2 < len(lines_result):
        next_line = lines_result[idx + 1].strip()
        if 'All letters combined' in next_line or 'Special Milestone' in next_line:
            lines_result[idx] = line.replace('];', '},')
            lines_result[idx] = lines_result[idx].rstrip()

result = '\n'.join(lines_result)

# Fix garbled character
result = result.replace('\u7f36\ufffd61 letters', '- 61 letters')

# Add missing exports
if 'export const allLetters' not in result:
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

print('Done.')
