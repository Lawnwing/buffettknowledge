#!/usr/bin/env python3
# inject_1993_v5.py - 可靠注入 1993 条目

import re

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    import shutil, time
    backup = path + '.backup_' + str(int(time.time()))
    shutil.copy2(path, backup)
    print(f'Backup: {backup}')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Written: {path}')

def extract_1993_object(interp_content):
    """从 interp_1993.ts 提取对象内容（不含 export const ... =）"""
    # 找到 export const interpretation1993 = { 的位置
    marker = "export const interpretation1993 = {"
    idx = interp_content.find(marker)
    if idx == -1:
        raise ValueError("找不到 'export const interpretation1993 = {'")
    
    # 从 { 开始，用大括号计数找到匹配的 }
    start = idx + len(marker) - 1  # 指向第一个 {
    brace_count = 1
    i = start + 1
    
    while i < len(interp_content) and brace_count > 0:
        ch = interp_content[i]
        if ch == '\\':
            i += 2
            continue
        if ch == "'" or ch == '"':
            # 跳过字符串
            quote_char = ch
            i += 1
            while i < len(interp_content) and interp_content[i] != quote_char:
                if interp_content[i] == '\\':
                    i += 2
                else:
                    i += 1
            i += 1
            continue
        if ch == '`':
            # 跳过模板字符串
            i += 1
            while i < len(interp_content) and interp_content[i] != '`':
                if interp_content[i] == '\\':
                    i += 2
                else:
                    i += 1
            i += 1
            continue
        if ch == '{':
            brace_count += 1
        elif ch == '}':
            brace_count -= 1
            if brace_count == 0:
                end = i
                return interp_content[start+1:end]  # 不含外层 {}
        i += 1
    
    raise ValueError(f"找不到匹配的大括号，brace_count={brace_count}")

def main():
    import os
    base = os.path.dirname(os.path.abspath(__file__))
    interp_path = os.path.join(base, 'interp_1993.ts')
    target_path = os.path.join(base, 'data', 'interpretations.ts')
    
    print('读取 interp_1993.ts...')
    interp_content = read_file(interp_path)
    
    print('提取 1993 对象...')
    obj = extract_1993_object(interp_content)
    print(f'对象长度: {len(obj)} 字符')
    
    # 添加缩进和键名
    lines = obj.split('\n')
    indented_lines = []
    for j, line in enumerate(lines):
        if j == 0:
            indented_lines.append("    '1993-berkshire-letter': {" + line)
        else:
            indented_lines.append('    ' + line)
    indented = '\n'.join(indented_lines)
    
    print('读取 interpretations.ts...')
    target = read_file(target_path)
    
    # 找插入点：1992 条目结束后、1994 条目开始前
    # 格式：1992 条目以 `  },\n\n  '1994-berkshire-letter': {` 结束
    # 我们要在 `  },\n\n` 和 `'1994-...'` 之间插入
    
    # 找 1994 条目的起始位置
    p1994 = target.find("  '1994-berkshire-letter': {")
    if p1994 == -1:
        raise ValueError("找不到 1994 条目起始位置")
    
    print(f'1994 条目起始位置: {p1994}')
    
    # 向前找 1992 条目的结束 `  },\n`
    # 找最后一个 `  },\n` 在 p1994 之前
    last_brace = target.rfind("  },\n", 0, p1994)
    if last_brace == -1:
        raise ValueError("找不到 1992 条目结束位置")
    
    print(f'1992 条目结束位置: {last_brace}')
    print(f'上下文: {repr(target[last_brace-20:last_brace+50])}')
    
    # 插入位置：last_brace + len("  },\n")
    insert_pos = last_brace + len("  },\n")
    
    # 构建新内容
    before = target[:insert_pos]
    after = target[insert_pos:]
    new_content = before + '\n\n' + indented + ',\n' + after
    
    print(f'插入位置: {insert_pos}')
    print(f'插入内容长度: {len(indented)} 字符')
    
    print('写入文件...')
    write_file(target_path, new_content)
    print('完成！')

if __name__ == '__main__':
    main()
