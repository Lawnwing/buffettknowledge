#!/usr/bin/env python3
# inject_1993_final.py - 行级插入，绝对可靠

import os

base = os.getcwd()
interp_path = os.path.join(base, 'interp_1993.ts')
target_path = os.path.join(base, 'data', 'interpretations.ts')

# 1. 读取 interpretations.ts 为行列表
with open(target_path, 'r', encoding='utf-8') as f:
    target_lines = f.readlines()

print(f'interpretations.ts: {len(target_lines)} 行')

# 2. 找到 1994 条目的行号（1-based -> 0-based）
insert_idx = None
for i, line in enumerate(target_lines):
    if "'1994-berkshire-letter':" in line:
        insert_idx = i
        break

if insert_idx is None:
    raise ValueError("找不到 '1994-berkshire-letter' 行！")

print(f'插入位置：第 {insert_idx} 行（0-based），即 1994 条目之前')

# 3. 读取 interp_1993.ts 并提取对象内容
with open(interp_path, 'r', encoding='utf-8') as f:
    interp_content = f.read()

# 找到 export const interpretation1993 = { 的位置
marker = "export const interpretation1993 = {"
sm = interp_content.find(marker)
if sm == -1:
    raise ValueError("interp_1993.ts 中找不到 'export const interpretation1993 = {'")

# 从 { 开始，用大括号计数找到匹配的 }
obj_start = sm + len(marker) - 1  # 指向 {
brace_count = 1
pos = obj_start + 1
while pos < len(interp_content) and brace_count > 0:
    ch = interp_content[pos]
    if ch == '\\':
        pos += 2
        continue
    if ch == "'" or ch == '"':
        q = ch
        pos += 1
        while pos < len(interp_content) and interp_content[pos] != q:
            if interp_content[pos] == '\\':
                pos += 2
            else:
                pos += 1
        pos += 1
        continue
    if ch == '`':
        pos += 1
        while pos < len(interp_content) and interp_content[pos] != '`':
            if interp_content[pos] == '\\':
                pos += 2
            else:
                pos += 1
        pos += 1
        continue
    if ch == '{':
        brace_count += 1
    elif ch == '}':
        brace_count -= 1
    pos += 1

if brace_count != 0:
    raise ValueError(f"大括号不匹配！brace_count={brace_count}")

obj_end = pos - 1  # 指向匹配的 }
obj_content = interp_content[obj_start:obj_end+1]  # 包含外层 {}
print(f'提取对象长度: {len(obj_content)} 字符')

# 4. 处理缩进：把对象内容加上 4 空格缩进，并替换第一行为键名
obj_lines = obj_content.split('\n')
indented = []
for j, line in enumerate(obj_lines):
    if j == 0:
        # 第一行是 {，替换为     '1993-berkshire-letter': {
        indented.append("    '1993-berkshire-letter': {")
    else:
        indented.append('    ' + line)

print(f'缩进后: {len(indented)} 行')

# 5. 在 insert_idx 之前插入
# 需要先插入一个空行，然后插入 1993 内容，然后插入 ',\n' 和空行
new_lines = target_lines[:insert_idx]

# 添加空行（如果前一个条目结尾没有空行）
if new_lines and new_lines[-1].strip() != '':
    new_lines.append('\n')

# 添加 1993 条目
new_lines.extend(indented)
new_lines.append('  },\n')  # 关闭 1993 条目并加逗号

# 添加空行
new_lines.append('\n')

# 添加原来的 1994+ 内容
new_lines.extend(target_lines[insert_idx:])

# 6. 备份并写入
import shutil, time
backup = target_path + '.backup_' + str(int(time.time()))
shutil.copy2(target_path, backup)
print(f'备份: {backup}')

with open(target_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f'完成！新文件: {len(new_lines)} 行（原来 {len(target_lines)} 行）')
