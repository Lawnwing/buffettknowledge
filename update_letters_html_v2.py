import json

# Read extracted content
with open(r'C:\Users\info\WorkBuddy\2026-05-15-task-1\buffettknowledge\docx_extracted.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Read letters.ts
with open(r'C:\Users\info\WorkBuddy\2026-05-15-task-1\buffettknowledge\data\letters.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def merge_broken_paragraphs(html):
    """Merge paragraphs that were split by soft line breaks in the original docx"""
    import re
    paragraphs = re.findall(r'<p>(.*?)</p>', html, re.DOTALL)
    merged = []
    current = ""
    
    for p in paragraphs:
        p = p.strip()
        if not p:
            continue
        if not current:
            current = p
            continue
        ends_with_sentence = bool(re.search(r'[.!?"\']\s*$', current))
        if len(current) < 80 or not ends_with_sentence:
            current = current + " " + p
        else:
            merged.append(current)
            current = p
    
    if current:
        merged.append(current)
    
    result = []
    for para in merged:
        para = re.sub(r'\s+', ' ', para).strip()
        if para:
            result.append(f'<p>{para}</p>')
    return '\n\n'.join(result)

# Simple string-based replacement
for year in ['1957', '1958', '1959']:
    html = data[year]
    fixed_html = merge_broken_paragraphs(html)
    
    # Find the letter block
    slug_marker = f"slug: '{year}-partnership-letter'"
    slug_idx = content.find(slug_marker)
    if slug_idx == -1:
        print(f"FAILED: could not find slug for {year}")
        continue
    
    # Find fullText within this block (before next slug or end of array)
    ft_marker = "fullText: `"
    ft_idx = content.find(ft_marker, slug_idx)
    if ft_idx == -1:
        print(f"FAILED: could not find fullText for {year}")
        continue
    
    # Find the closing backtick - need to find the backtick that is followed by newline and concepts:
    # Start searching after the opening backtick
    search_start = ft_idx + len(ft_marker)
    
    # Find next occurrence of `,\n\n    concepts:
    end_marker = "`,\n\n    concepts:"
    end_idx = content.find(end_marker, search_start)
    if end_idx == -1:
        print(f"FAILED: could not find end marker for {year}")
        continue
    
    # Extract old content for debugging
    old_content = content[search_start:end_idx]
    print(f"Year {year}: found block, old content length = {len(old_content)}")
    
    # Replace
    new_content = content[:search_start] + fixed_html + content[end_idx:]
    content = new_content
    print(f"Year {year}: replaced with {len(fixed_html)} chars")

# Write back
with open(r'C:\Users\info\WorkBuddy\2026-05-15-task-1\buffettknowledge\data\letters.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nDone! letters.ts updated.")
