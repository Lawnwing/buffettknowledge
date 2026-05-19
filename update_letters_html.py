import json
import re

# Read extracted content
with open(r'C:\Users\info\WorkBuddy\2026-05-15-task-1\buffettknowledge\docx_extracted.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Read letters.ts
with open(r'C:\Users\info\WorkBuddy\2026-05-15-task-1\buffettknowledge\data\letters.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Function to merge short split paragraphs into logical blocks
# DOCX sometimes has soft line breaks that create artificial short paragraphs
# We merge consecutive short paragraphs (< 60 chars) or paragraphs that don't end with sentence-ending punctuation

def merge_broken_paragraphs(html):
    """Merge paragraphs that were split by soft line breaks in the original docx"""
    paragraphs = re.findall(r'<p>(.*?)</p>', html, re.DOTALL)
    merged = []
    current = ""
    
    for p in paragraphs:
        p = p.strip()
        if not p:
            continue
            
        # If current buffer is empty, start new paragraph
        if not current:
            current = p
            continue
            
        # Check if current ends with sentence-ending punctuation
        ends_with_sentence = bool(re.search(r'[.!?"\']\s*$', current))
        
        # If current is very short OR doesn't end with sentence ending, merge
        if len(current) < 80 or not ends_with_sentence:
            current = current + " " + p
        else:
            merged.append(current)
            current = p
    
    if current:
        merged.append(current)
    
    # Rebuild HTML
    result = []
    for para in merged:
        # Clean up whitespace
        para = re.sub(r'\s+', ' ', para).strip()
        if para:
            result.append(f'<p>{para}</p>')
    
    return '\n\n'.join(result)

# Process each year
for year in ['1957', '1958', '1959']:
    html = data[year]
    # Merge broken paragraphs
    fixed_html = merge_broken_paragraphs(html)
    
    # Find and replace in letters.ts
    # Pattern: fullText: `...` (8-space indent, content on same line or multiple lines)
    # Need to match from the backtick after fullText: to the closing backtick before concepts:
    escaped_year = year
    pattern = rf"(slug: '{escaped_year}-partnership-letter',[\s\S]*?fullText: `)([\s\S]*?)(`,\s+\n        concepts:)"
    
    replacement = r"\1" + fixed_html + r"\3"
    
    new_content, count = re.subn(pattern, replacement, content)
    if count > 0:
        content = new_content
        print(f"Updated {year}: {len(fixed_html)} chars, merged paragraphs")
    else:
        print(f"FAILED to match {year}")

# Write back
with open(r'C:\Users\info\WorkBuddy\2026-05-15-task-1\buffettknowledge\data\letters.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nDone! letters.ts updated.")
