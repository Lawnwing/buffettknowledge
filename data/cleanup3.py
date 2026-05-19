# -*- coding: utf-8 -*-
import re

with open('data/letters.ts', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
out = []
i = 0
while i < len(lines):
    line = lines[i]
    stripped = line.strip()

    # 匹配 [[PLACEHOLDER]] 结尾的行（需要加逗号）
    if re.match(r'^\s+fullText: `\[\[PLACEHOLDER\]\]`\s*$', stripped):
        indent = len(line) - len(line.lstrip())
        out.append(' ' * indent + 'fullText: `[[PLACEHOLDER]]`,\n')
        i += 1
        # 跳过后续的 orphaned HTML 行
        while i < len(lines):
            cur = lines[i]
            cur_stripped = cur.strip()
            if cur_stripped == '':
                out.append(cur)
                i += 1
                continue
            if cur.startswith('  ') and not cur_stripped.startswith('<'):
                # 正常对象内容，保留并停止跳过
                break
            # 跳过 HTML 行
            i += 1
        continue

    out.append(line)
    i += 1

result = ''.join(out)
with open('data/letters.ts', 'w', encoding='utf-8') as f:
    f.write(result)
print('Done.')
