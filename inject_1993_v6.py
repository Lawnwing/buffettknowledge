#!/usr/bin/env python3
# inject_1993_v6.py - 可靠行级插入 1993 条目

import os

base = os.path.dirname(os.path.abspath(__file__))
interp_path = os.path.join(base, 'interp_1993.ts')
target_path = os.path.join(base, 'data', 'interpretations.ts')

# 1. 读取 interpretations.ts
with open(target_path, 'r', encoding='utf-8') as f:
    target_lines = f.readlines()

print(f'interpretations.ts: {len(target_lines)} 行')

# 2. 找 1994 条目的起始行号
insert_line = None
for i, line in enumerate(target_lines):
    if "'1994-berkshire-letter':" in line:
        insert_line = i
        break

if insert_line is None:
    raise ValueError("找不到 '1994-berkshire-letter' 行")

print(f'插入位置：第 {insert_line} 行（0-based）')
print(f'上下文：{repr(target_lines[insert_line-2:insert_line+2])}')

# 3. 读取 interp_1993.ts 并提取对象内容
with open(interp_path, 'r', encoding='utf-8') as f:
    interp_lines = f.readlines()

# 找对象起始行（包含 export const interpretation1993 = {）
obj_start = None
for i, line in enumerate(interp_lines):
    if 'export const interpretation1993 = {' in line or 'export const interpretation1993 = {'  in line.replace(' ', ''):
        obj_start = i
        break
    # 更灵活的匹配
    if 'export const interpretation1993' in line and '{' in line:
        obj_start = i
        break

if obj_start is None:
    # 找包含 { 的那行
    for i, line in enumerate(interp_lines):
        if 'interpretation1993' in line:
            obj_start = i
            break

print(f'interp_1993.ts 对象起始行：{obj_start}')
print(f'该行内容：{repr(interp_lines[obj_start])}')

# 从 obj_start 开始，找匹配的大括号结尾
brace_count = 0
found_open = False
obj_end = None

for i in range(obj_start, len(interp_lines)):
    line = interp_lines[i]
    for ch in line:
        if ch == '{':
            brace_count += 1
            found_open = True
        elif ch == '}':
            brace_count -= 1
            if found_open and brace_count == 0:
                obj_end = i
                break
    if obj_end is not None:
        break

if obj_end is None:
    raise ValueError(f"找不到对象结尾，brace_count={brace_count}")

print(f'对象结束行：{obj_end}')
print(f'该行内容：{repr(interp_lines[obj_end])}')

# 提取对象内容（含外层 {}）
obj_lines = interp_lines[obj_start:obj_end+1]

# 移除 export const ... =  前缀（第一行）
first_line = obj_lines[0]
# 找 { 的位置
brace_pos = first_line.index('{')
# 保留从 { 开始的内容
new_first_line = '    ' + first_line[brace_pos:]  # 添加4空格缩进
obj_lines[0] = new_first_line

# 最后一行的 } 已经包含正确缩进（它来自原文件）
# 但我们需要给它加 4 空格缩进
last_line = obj_lines[-1]
if last_line.strip() == '}':
    obj_lines[-1] = '    ' + last_line.lstrip()

# 给中间行加 4 空格缩进
for j in range(1, len(obj_lines)-1):
    obj_lines[j] = '    ' + obj_lines[j]

# 第一行现在应该是：    '1993-berkshire-letter': {
# 但原第一行是：export const interpretation1993 = {
# 我们需要替换第一行为正确的键名
obj_lines[0] = "    '1993-berkshire-letter': {" 

print(f'处理后的对象第一行：{repr(obj_lines[0])}')
print(f'处理后的对象最后一行：{repr(obj_lines[-1])}')
print(f'对象共 {len(obj_lines)} 行')

# 4. 构建新文件行列表
# 在 insert_line 之前插入 1993 条目
# 需要在 1993 条目结束后加一个逗号行

new_lines = target_lines[:insert_line]

# 添加 1993 条目
new_lines.extend(obj_lines)
new_lines.append('  },\n')  # 关闭 1993 条目并加逗号

# 添加空行
new_lines.append('\n')

# 添加原来的 1994+ 内容
new_lines.extend(target_lines[insert_line:])

# 5. 备份并写入
import shutil, time
backup = target_path + '.backup_' + str(int(time.time()))
shutil.copy2(target_path, backup)
print(f'备份：{backup}')

with open(target_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f'注入完成！')
print(f'原行数：{len(target_lines)}')
print(f'新行数：{len(new_lines)}')
print(f'增加了 {len(new_lines) - len(target_lines)} 行')
