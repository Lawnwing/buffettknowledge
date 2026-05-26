#!/usr/bin/env python3
# inject_1993_v4.py
# Properly inject 1993 entry into interpretations.ts using brace-counting

import re

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    backup = path + '.backup_' + __import__('time').strftime('%Y%m%d%H%M%S')
    import shutil
    shutil.copy2(path, backup)
    print(f'Backup created: {backup}')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'File written: {path}')

def extract_object_from_file(content):
    """Extract the object from: export const interpretation1993 = { ... }
    Uses brace counting, not regex."""
    marker = "export const interpretation1993 = {"
    idx = content.find(marker)
    if idx == -1:
        raise ValueError("Could not find 'export const interpretation1993 = {'")
    
    # Start after the marker
    start = idx + len(marker) - 1  # -1 to include the opening {
    brace_count = 1
    i = start + 1  # skip the opening {
    
    while i < len(content) and brace_count > 0:
        ch = content[i]
        if ch == '{':
            brace_count += 1
        elif ch == '}':
            brace_count -= 1
            if brace_count == 0:
                # Found the matching closing brace
                return content[start:i+1]  # includes outer {}
        i += 1
    
    raise ValueError(f"Could not find matching closing brace. brace_count={brace_count}, i={i}")

def find_insertion_point(content):
    """Find the point between 1992 and 1994 entries.
    Returns: index where 1993 entry should be inserted."""
    # Find the end of 1992 entry: look for "  },\n\n  '1994-berkshire-letter'"
    # The pattern is: end of 1992 entry followed by 1994 start
    pattern = "  },\n\n  '1994-berkshire-letter': {"
    idx = content.find(pattern)
    if idx == -1:
        # Try alternative: maybe no blank line
        pattern2 = "  },\n  '1994-berkshire-letter': {"
        idx = content.find(pattern2)
        if idx == -1:
            raise ValueError("Could not find insertion point (between 1992 and 1994)")
        # Insert after "  },\n  "
        # Actually, we want to insert BEFORE '1994-...'
        # So find: "  },\n  '1994..."
        # And insert after "  },\n\n  " (the \n\n before 1994)
        # Let me just use a simpler approach
        pass
    
    # Insert AFTER the pattern (which ends with "{")
    # Actually, we want to insert BETWEEN 1992's closing } and 1994's opening
    # The pattern ends with "': {". We want to insert after the \n following "{"
    # This is getting complicated. Let me use line-based approach.
    
    raise ValueError("Please use line-based approach")

def find_insertion_line(lines):
    """Find the line index where 1993 entry should be inserted.
    Returns: line index (0-based) where 1993 entry should start."""
    in_1992 = False
    brace_count = 0
    for i, line in enumerate(lines):
        if "'1992-berkshire-letter': {" in line or "'1992-berkshire-letter':" in line:
            in_1992 = True
            brace_count = 1
            continue
        if in_1992:
            brace_count += line.count('{') - line.count('}')  # Simplified
            # Actually this doesn't work for strings...
            
    # Simpler: just find the line with "'1994-berkshire-letter': {"
    for i, line in enumerate(lines):
        if "'1994-berkshire-letter':" in line:
            return i
    raise ValueError("Could not find '1994-berkshire-letter' line")

def main():
    import os
    base_dir = os.path.dirname(os.path.abspath(__file__))
    interp_file = os.path.join(base_dir, 'interp_1993.ts')
    target_file = os.path.join(base_dir, 'data', 'interpretations.ts')
    
    print(f'Reading {interp_file}...')
    interp_content = read_file(interp_file)
    
    print('Extracting 1993 object (brace counting)...')
    obj = extract_object_from_file(interp_content)
    print(f'Extracted object length: {len(obj)}')
    print(f'First 80 chars: {repr(obj[:80])}')
    print(f'Last 80 chars: {repr(obj[-80:])}')
    
    # Add indentation (4 spaces) and the key
    lines = obj.split('\n')
    indented_lines = []
    for j, line in enumerate(lines):
        if j == 0:
            indented_lines.append("    '1993-berkshire-letter': " + line)
        else:
            indented_lines.append('    ' + line)
    indented = '\n'.join(indented_lines)
    
    print(f'\nReading {target_file}...')
    target_content = read_file(target_file)
    target_lines = target_content.split('\n')
    
    print('Finding insertion point...')
    insert_line = find_insertion_line(target_lines)
    print(f'Insertion line (0-based): {insert_line}')
    print(f'Line content: {repr(target_lines[insert_line])}')
    
    # Insert BEFORE insert_line
    # The indented content needs a trailing ,\n\n after it
    new_target_lines = target_lines[:insert_line] + [indented + ',', ''] + target_lines[insert_line:]
    
    new_content = '\n'.join(new_target_lines)
    
    print(f'\nWriting {target_file}...')
    write_file(target_file, new_content)
    print('Done!')

if __name__ == '__main__':
    main()
