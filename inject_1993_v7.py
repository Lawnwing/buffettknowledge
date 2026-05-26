#!/usr/bin/env python3
# inject_1993_v7.py - 最终可靠版本

import os, shutil, time

base = os.getcwd()  # 当前目录
interp_path = os.path.join(base, 'interp_1993.ts')
target_path = os.path.join(base, 'data', 'interpretations.ts')

print('读取 interp_1993.ts ...')
with open(interp_path, 'r', encoding='utf-8') as f:
    interp = f.read()

print('读取 interpretations.ts ...')
with open(target_path, 'r', encoding='utf-8') as f:
    target = f.read()

# 提取 1993 对象
marker = "export const interpretation1993 = {"
sm = interp.find(marker)
if sm == -1:
    raise ValueError("找不到 export const interpretation1993")

# 从 { 开始，数大括号找到匹配的 }
start = sm + len(marker) - 1  # 指向第一个 {
brace = 1
pos = start + 1
while pos < len(interp) and brace > 0:
    ch = interp[pos]
    if ch == '\\':
        pos += 2
        continue
    if ch == "'" or ch == '"':
        q = ch
        pos += 1
        while pos < len(interp) and interp[pos] != q:
            if interp[pos] == '\\':
                pos += 2
            else:
                pos += 1
        pos += 1
        continue
    if ch == '`':
        pos += 1
        while pos < len(interp) and interp[pos] != '`':
            if interp[pos] == '\\':
                pos += 2
            else:
                pos += 1
        pos += 1
        continue
    if ch == '{': brace += 1
    if ch == '}': brace -= 1
    pos += 1

if brace != 0:
    raise ValueError(f"大括号不匹配: brace={brace}")

obj = interp[start:pos]  # 包含外层 {}
print(f'提取对象长度: {len(obj)}')

# 添加缩进和键名
lines = obj.split('\n')
indented = []
for j, line in enumerate(lines):
    if j == 0:
        indented.append("    '1993-berkshire-letter': " + line)
    else:
        indented.append('    ' + line)
indented_str = '\n'.join(indented)

# 找插入点：1992 结尾 } 和 1994 开头之间
# 格式：1992 结尾是 "  },\n\n  '1994-..."
p1 = target.find("  },\n\n  '1994-berkshire-letter': {")
if p1 == -1:
    # 尝试另一种格式
    p1 = target.find("  },\n  '1994-berkshire-letter': {")
    if p1 == -1:
        raise ValueError("找不到 1992/1994 边界")

insert_pos = p1 + len("  },\n")  # 在 \n\n 之后插入
print(f'插入位置: {insert_pos}')

# 构建新内容
before = target[:insert_pos]
after = target[insert_pos:]
new_content = before + '\n' + indented_str + ',\n' + after

# 备份
backup = target_path + '.backup_' + str(int(time.time()))
shutil.copy2(target_path, backup)
print(f'备份: {backup}')

# 写入
with open(target_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print('注入完成！')
print(f'文件大小: {len(new_content)} 字符')
