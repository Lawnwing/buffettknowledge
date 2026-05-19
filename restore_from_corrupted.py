# -*- coding: utf-8 -*-
"""
从 corrupted 文件恢复：
1. 保留所有信件结构和元数据
2. 将所有 fullText 替换为占位符
3. 添加 allLetters 和 stats 导出
4. 修复 specialLetters
"""
import re

with open('data/letters.ts.corrupted', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
out = []
i = 0

while i < len(lines):
    line = lines[i]

    # 检测 fullText 字段开始
    m = re.match(r'(\s*)fullText:\s*`', line)
    if m:
        indent = m.group(1)
        # 跳过原 fullText 内容直到结束反引号
        i += 1
        while i < len(lines):
            stripped = lines[i].rstrip()
            if '`' in stripped and re.search(r'`[\s,]*$', stripped):
                i += 1
                break
            i += 1
        out.append(f'{indent}fullText: `[[PLACEHOLDER]]`,')
    else:
        out.append(line)
        i += 1

result = '\n'.join(out)

# 在文件末尾添加 allLetters 和 stats
# 先移除末尾可能存在的多余空行和注释
result = result.rstrip()

# 确保末尾是 berkshireLetters 数组的闭合
if not result.endswith('];'):
    # 如果末尾不是 ];，可能是其他问题
    pass

# 在最后一个 ]; 之后添加导出
appendix = '''

// ============================================================
// Special Milestone Letters
// ============================================================

export const specialLetters: Letter[] = [
];

// ============================================================
// All letters combined
// ============================================================

export const allLetters: Letter[] = [
  ...partnershipLetters,
  ...berkshireLetters,
];

// ============================================================
// Statistics
// ============================================================

export const stats = {
  totalLetters: allLetters.length,
  yearsCovered: 70,
};
'''

result = result + appendix

with open('data/letters.ts', 'w', encoding='utf-8') as f:
    f.write(result)

print(f'Done. Total lines: {len(result.split(chr(10)))}')
