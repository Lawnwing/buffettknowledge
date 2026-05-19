import json
import re

# Read extracted content
with open(r'C:\Users\info\WorkBuddy\2026-05-15-task-1\buffettknowledge\docx_extracted.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Read letters.ts
with open(r'C:\Users\info\WorkBuddy\2026-05-15-task-1\buffettknowledge\data\letters.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def smart_format_html(html):
    """Keep h2 headings separate, merge broken p paragraphs"""
    # Split into tags
    parts = re.split(r'(</?h2>|</?p>)', html)
    
    result = []
    current_para = ""
    in_p = False
    in_h2 = False
    
    for part in parts:
        if part == '<p>':
            in_p = True
            current_para = ""
        elif part == '</p>':
            in_p = False
            if current_para.strip():
                # Check if we should merge with previous p
                if result and result[-1].startswith('<p>'):
                    prev_text = result[-1][3:-4]  # strip <p> and </p>
                    ends_with_sentence = bool(re.search(r'[.!?"\']\s*$', prev_text))
                    if len(prev_text) < 80 or not ends_with_sentence:
                        # Merge
                        merged = prev_text + " " + current_para.strip()
                        merged = re.sub(r'\s+', ' ', merged).strip()
                        result[-1] = f'<p>{merged}</p>'
                    else:
                        result.append(f'<p>{current_para.strip()}</p>')
                else:
                    result.append(f'<p>{current_para.strip()}</p>')
            current_para = ""
        elif part == '<h2>':
            in_h2 = True
            # Flush any pending p first
            if current_para.strip() and in_p:
                if result and result[-1].startswith('<p>'):
                    prev_text = result[-1][3:-4]
                    ends_with_sentence = bool(re.search(r'[.!?"\']\s*$', prev_text))
                    if len(prev_text) < 80 or not ends_with_sentence:
                        merged = prev_text + " " + current_para.strip()
                        merged = re.sub(r'\s+', ' ', merged).strip()
                        result[-1] = f'<p>{merged}</p>'
                    else:
                        result.append(f'<p>{current_para.strip()}</p>')
                else:
                    result.append(f'<p>{current_para.strip()}</p>')
            current_para = ""
        elif part == '</h2>':
            in_h2 = False
            if current_para.strip():
                result.append(f'<h2>{current_para.strip()}</h2>')
            current_para = ""
        elif in_p or in_h2:
            current_para += part
    
    return '\n\n'.join(result)

# Simple string-based replacement
for year in ['1957', '1958', '1959']:
    html = data[year]
    fixed_html = smart_format_html(html)
    
    # Find the letter block
    slug_marker = f"slug: '{year}-partnership-letter'"
    slug_idx = content.find(slug_marker)
    if slug_idx == -1:
        print(f"FAILED: could not find slug for {year}")
        continue
    
    ft_marker = "fullText: `"
    ft_idx = content.find(ft_marker, slug_idx)
    if ft_idx == -1:
        print(f"FAILED: could not find fullText for {year}")
        continue
    
    search_start = ft_idx + len(ft_marker)
    end_marker = "`,\n\n    concepts:"
    end_idx = content.find(end_marker, search_start)
    if end_idx == -1:
        print(f"FAILED: could not find end marker for {year}")
        continue
    
    old_content = content[search_start:end_idx]
    print(f"Year {year}: found block, old content length = {len(old_content)}")
    
    new_content = content[:search_start] + fixed_html + content[end_idx:]
    content = new_content
    print(f"Year {year}: replaced with {len(fixed_html)} chars")

# Write back
with open(r'C:\Users\info\WorkBuddy\2026-05-15-task-1\buffettknowledge\data\letters.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nDone! letters.ts updated with headings preserved.")
