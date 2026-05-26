#!/usr/bin/env python3
# replace_1993.py - 用完整版替换最小版 1993 条目

import os

# 获取脚本所在目录（可靠）
base = os.path.dirname(os.path.abspath(__file__))
interp_path = os.path.join(base, 'interp_1993.ts')
target_path = os.path.join(base, 'data', 'interpretations.ts')

print('=== 第1步：从 interp_1993.ts 提取对象 ===')

with open(interp_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 找 "export const interpretation1993 = {" 的位置
marker = 'export const interpretation1993 = {'
idx = content.find(marker)
if idx == -1:
    raise ValueError("找不到 export const interpretation1993 = {")
    
# 从 { 开始，用大括号计数找到匹配的 }
obj_start = idx + len(marker) - 1  # 指向第一个 {
brace_count = 1
pos = obj_start + 1

while pos < len(content) and brace_count > 0:
    ch = content[pos]
    if ch == '\\':
        pos += 2
        continue
    if ch == "'" or ch == '"':
        q = ch
        pos += 1
        while pos < len(content) and content[pos] != q:
            if content[pos] == '\\':
                pos += 2
            else:
                pos += 1
        pos += 1  # 跳过闭合引号
        continue
    if ch == '`':
        pos += 1
        while pos < len(content) and content[pos] != '`':
            if content[pos] == '\\':
                pos += 2
            else:
                pos += 1
        pos += 1  # 跳过闭合反引号
        continue
    if ch == '{':
        brace_count += 1
    elif ch == '}':
        brace_count -= 1
        if brace_count == 0:
            obj_end = pos
            break
    pos += 1

if brace_count != 0:
    raise ValueError(f"大括号不匹配！brace_count={brace_count}")

obj_raw = content[obj_start:obj_end+1]  # 包含外层 {}
print(f'提取的对象长度：{len(obj_raw)} 字符')

# 去掉外层 {}，获取内部内容
inner = obj_raw[1:-1]  # 去掉第一个 { 和最后一个 }

# 添加缩进：第一行加 4 空格 + 键名，后续行加 4 空格
lines = inner.split('\n')
indented_lines = []
for j, line in enumerate(lines):
    if j == 0:
        indented_lines.append("    '1993-berkshire-letter': " + line)
    else:
        indented_lines.append('    ' + line)

indented_obj = '\n'.join(indented_lines)
print(f'缩进后长度：{len(indented_obj)} 字符')
print(f'前 80 字符：{repr(indented_obj[:80])}')
print(f'后 80 字符：{repr(indented_obj[-80:])}')

print()
print('=== 第2步：在 interpretations.ts 中找到最小版 1993 条目的范围 ===')

with open(target_path, 'r', encoding='utf-8') as f:
    target = f.read()

# 找 1993 条目起始位置（最小版，已插入的）
start_marker = "  '1993-berkshire-letter': {"
start_idx = target.find(start_marker)
if start_idx == -1:
    raise ValueError("找不到 1993 条目起始位置！")

print(f'1993 条目起始：{start_idx}')

# 从 start_idx 开始，用大括号计数找到条目结尾
# 注意：start_marker 已包含开头的 {，从它之后开始计数
brace_count = 1  # 已经有一个 {（在 start_marker 里）
pos = start_idx + len(start_marker)

while pos < len(target) and brace_count > 0:
    ch = target[pos]
    if ch == '\\':
        pos += 2
        continue
    if ch == "'" or ch == '"':
        q = ch
        pos += 1
        while pos < len(target) and target[pos] != q:
            if target[pos] == '\\':
                pos += 2
            else:
                pos += 1
        pos += 1
        continue
    if ch == '`':
        pos += 1
        while pos < len(target) and target[pos] != '`':
            if target[pos] == '\\':
                pos += 2
            else:
                pos += 1
        pos += 1
        continue
    if ch == '{':
        brace_count += 1
    elif ch == '}':
        brace_count -= 1
        if brace_count == 0:
            end_idx = pos
            break
    pos += 1

if brace_count != 0:
    raise ValueError(f"找不到 1993 条目结尾！brace_count={brace_count}")

print(f'1993 条目结尾：{end_idx}')
print(f'当前 1993 条目长度：{end_idx - start_idx + 1} 字符')

# 我们需要保留结尾的 },\n 或 },\n\n（用于分隔条目）
# 实际上，条目的完整范围是 start_idx 到 end_idx（含 end_idx 的 }）
# 但后面可能跟着 ,\n\n 1994...
# 我们找 end_idx 之后第一个非空白字符
look_ahead = target[end_idx+1:].lstrip()
if look_ahead.startswith(','):
    # 有逗号，说明后面还有条目，我们保留逗号
    comma_pos = target[end_idx+1:].index(',') + end_idx + 1
    entry_end = comma_pos  # 包含逗号
    print(f'条目以逗号结尾（后面还有条目），条目结束位置：{entry_end}')
else:
    entry_end = end_idx
    print(f'条目以 }} 结尾（最后一条），条目结束位置：{entry_end}')

print()
print('=== 第3步：构建新内容 ===')

# 新内容 = 缩进后的完整 1993 对象 + ,\n\n（如果需要）
new_entry = indented_obj + ',\n'

# 替换：target[start_idx : entry_end+1] = new_entry
new_target = target[:start_idx] + new_entry + target[entry_end+1:]

print(f'原文件大小：{len(target)} 字符')
print(f'新文件大小：{len(new_target)} 字符')
print(f'变化：{len(new_target) - len(target)} 字符')

print()
print('=== 第4步：备份并写入 ===')

# 备份
import shutil, time
backup_path = target_path + '.backup_' + str(int(time.time()))
shutil.copy2(target_path, backup_path)
print(f'备份已创建：{backup_path}')

# 写入
with open(target_path, 'w', encoding='utf-8') as f:
    f.write(new_target)

print(f'文件已写入！')
print()
print('=== 完成！请运行 npm run build 验证 ===')
