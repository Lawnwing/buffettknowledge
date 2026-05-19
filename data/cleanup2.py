# -*- coding: utf-8 -*-
with open('data/letters.ts', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
out = []
skip = False

for line in lines:
    stripped = line.strip()
    # 如果这行是 [[PLACEHOLDER]] 闭合的下一行开始是 HTML
    if stripped == 'fullText: `[[PLACEHOLDER]]`,' or stripped == 'fullText: `[[PLACEHOLDER]]`':
        out.append(line)
        skip = True
        continue
    if skip:
        # 跳过所有不以缩进开头（非对象字段）的行，直到遇到空行后下一个缩进行
        if stripped == '':
            out.append(line)
            continue
        if line.startswith('  ') and not stripped.startswith('<'):
            out.append(line)
            skip = False
        # 否则跳过（HTML 内容）
        continue
    out.append(line)

result = '\n'.join(out)
with open('data/letters.ts', 'w', encoding='utf-8') as f:
    f.write(result)

print('Done.')
