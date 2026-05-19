# -*- coding: utf-8 -*-
import re

with open('data/letters.ts.backup_before_fix', 'rb') as f:
    raw = f.read()

out = []
i = 0
current_slug = None

while i < len(raw):
    # Detect slug
    if raw[i:i+6] == b'slug: ':
        m = re.search(rb"slug:\s*'([^']+)'", raw[i:i+200])
        if m:
            current_slug = m.group(1).decode('utf-8', errors='replace')
    
    # Detect fullText: `
    if raw[i:i+12] == b'fullText: `':
        start = i
        i += 12
        
        if current_slug == '1956-partnership-letter':
            # Keep: find closing backtick
            close = raw.find(b'`', i)
            while close > 0:
                nc = raw[close+1:close+3]
                if nc in (b',',) and raw[close+3:close+4] in (b'\n', b'\r'):
                    break
                close = raw.find(b'`', close + 1)
            if close > 0:
                out.append(raw[start:close+3])
                i = close + 3
            else:
                out.append(raw[start:start+1])
                i = start + 1
        else:
            # Replace: find the comma before the next field
            # Strategy: search for `,\r\n    ` pattern which indicates end of fullText
            search = raw[i:i+5000000]
            
            # Find next field pattern: ,\r\n    concepts: (or other known fields)
            m = re.search(rb',(\r\n    )(concepts:|companies:|people:|crossReferences:|keyQuotes:|featured:|sourceUrl:|readingTimeMinutes:)', search)
            if m:
                # The comma is at m.start(), closing at m.start()
                close = i + m.start()  # position of comma
                bol = raw.rfind(b'\n', 0, start) + 1
                ws = raw[bol:start]
                out.append(ws + b'fullText: `[[PLACEHOLDER]]`,\r\n')
                i = close + 1  # skip the comma
            else:
                # Fallback: use regex to find next field
                m2 = re.search(rb'\n    \w+:', search)
                if m2:
                    close = i + m2.start()
                    bol = raw.rfind(b'\n', 0, start) + 1
                    ws = raw[bol:start]
                    out.append(ws + b'fullText: `[[PLACEHOLDER]]`,\r\n')
                    i = close
                else:
                    out.append(raw[start:start+1])
                    i = start + 1
        continue
    
    out.append(raw[i:i+1])
    i += 1

result = b''.join(out)

# Fix structural
result = result.replace(
    b'  ];\r\n\r\n// ============================================================\r\n// Berkshire Hathaway Annual Letters',
    b'  },\r\n];\r\n\r\n// ============================================================\r\n// Berkshire Hathaway Annual Letters'
)

# Fix em-dash
result = result.replace(b'\xe2\x80\x94', b'-')

# Add exports
appendix = (
    b'\r\n'
    b'// ============================================================\r\n'
    b'// All letters combined\r\n'
    b'// ============================================================\r\n'
    b'\r\n'
    b'export const allLetters: Letter[] = [\r\n'
    b'  ...partnershipLetters,\r\n'
    b'  ...berkshireLetters,\r\n'
    b'  ...specialLetters,\r\n'
    b'];\r\n'
    b'\r\n'
    b'// ============================================================\r\n'
    b'// Statistics\r\n'
    b'// ============================================================\r\n'
    b'\r\n'
    b'export const stats = {\r\n'
    b'  totalLetters: allLetters.length,\r\n'
    b'  yearsCovered: new Set(allLetters.map((l) => l.year)).size,\r\n'
    b'  partnershipLetters: partnershipLetters.length,\r\n'
    b'  berkshireLetters: berkshireLetters.length,\r\n'
    b'  specialLetters: specialLetters.length,\r\n'
    b'};\r\n'
    b'\r\n'
    b'// ============================================================\r\n'
    b'// Helpers\r\n'
    b'// ============================================================\r\n'
    b'\r\n'
    b'export function getLetterBySlug(slug: string): Letter | undefined {\r\n'
    b"  return allLetters.find((l) => l.slug === slug);\r\n"
    b'}\r\n'
)

if b'export const allLetters' not in result:
    result = result + appendix

with open('data/letters.ts', 'wb') as f:
    f.write(result)

print('Done. Size: {0} bytes'.format(len(result)))
