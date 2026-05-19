# -*- coding: utf-8 -*-
with open('data/letters.ts', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
out = []
i = 0
while i < len(lines):
    line = lines[i]
    # 如果这行是 `[[PLACEHOLDER]]` 或 `[[PLACEHOLDER]]`, 结尾，检查下一行是否是 slug
    stripped = line.strip()
    if stripped == 'fullText: `[[PLACEHOLDER]]`,' or stripped == 'fullText: `[[PLACEHOLDER]]`':
        out.append('fullText: `[[PLACEHOLDER]]`,')
        i += 1
        # 找下一行
        while i < len(lines) and lines[i].strip() == '':
            out.append(lines[i])
            i += 1
        # 如果下一行是 slug，继续
        if i < len(lines) and lines[i].strip().startswith("slug:"):
            out.append(lines[i])
            i += 1
            # 现在跳过所有不是空行且不是 '},' 且不以 '  ' 开头的行（即 orphaned HTML）
            while i < len(lines):
                cur = lines[i]
                cur_stripped = cur.strip()
                # 如果是空行，保留
                if cur_stripped == '':
                    out.append(cur)
                    i += 1
                    continue
                # 如果是 }; 结束符，保留
                if cur_stripped == '},':
                    out.append(cur)
                    i += 1
                    break
                # 如果以两个空格开头（正常缩进的对象内容），保留
                if cur.startswith('  ') and not cur_stripped.startswith('<'):
                    out.append(cur)
                    i += 1
                    continue
                # 否则是 orphaned HTML，跳过
                i += 1
            continue
    out.append(line)
    i += 1

result = '\n'.join(out)
with open('data/letters.ts', 'w', encoding='utf-8') as f:
    f.write(result)

print('Done')
