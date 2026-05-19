# -*- coding: utf-8 -*-
import re

with open('data/letters.ts.backup_before_fix', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find all fullText start lines
for i, line in enumerate(lines):
    if re.match(r'^\s+fullText:\s*`', line):
        slug = None
        for j in range(i-1, max(0, i-20), -1):
            m = re.search(r"slug:\s*'([^']+)'", lines[j])
            if m:
                slug = m.group(1)
                break
        ends_with_tick = line.rstrip().endswith('`')
        print('L{0} slug={1} ends_with_tick={2} line_len={3}'.format(i+1, slug, ends_with_tick, len(line)))
