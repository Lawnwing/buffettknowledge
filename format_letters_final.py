import json
import re

with open(r'C:\Users\info\WorkBuddy\2026-05-15-task-1\buffettknowledge\docx_extracted.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open(r'C:\Users\info\WorkBuddy\2026-05-15-task-1\buffettknowledge\data\letters.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Heading detection patterns
HEADING_PATTERNS = [
    r'^The General Stock Market (?:Picture|View|in)\s+\d{4}$',
    r'^Our Activities (?:in|for)\s+\d{4}$',
    r'^Results (?:in|for)\s+\d{4}$',
    r'^Review of Partners and Capital$',
    r'^Portfolio Activity$',
    r'^Market Performance$',
    r'^Investment Activity$',
    r'^The Year \w+$',
    r'^\d{4}\s+Letter$',
]

def is_heading(text):
    """Check if a paragraph is a section heading"""
    t = text.strip()
    # All caps short text
    if t.isupper() and len(t) < 100:
        return True
    # Title case with year reference
    if re.search(r'\b(?:in|for)\s+\d{4}$', t) and len(t) < 80:
        return True
    # Match specific patterns
    for pat in HEADING_PATTERNS:
        if re.match(pat, t, re.IGNORECASE):
            return True
    return False

def is_blockquote(text):
    """Check if paragraph is a standalone quote"""
    t = text.strip()
    starts = t.startswith('"') or t.startswith('"') or t.startswith("'") or t.startswith('\u201c')
    ends = t.endswith('"') or t.endswith('"') or t.endswith("'") or t.endswith('\u201d') or t.endswith('".')
    return starts and ends and len(t) > 20

def is_leadin(text):
    """Check if paragraph is a lead-in like 'I said the following:'"""
    t = text.strip().lower()
    patterns = [
        r'said the following',
        r'wrote the following',
        r'wrote:$',
        r'wrote :$',
        r'said:$',
        r'as follows',
    ]
    for pat in patterns:
        if re.search(pat, t):
            return True
    return False

def clean_text(text):
    """Clean up whitespace artifacts from docx extraction"""
    # Fix broken words: "work- outs" → "work-outs"
    text = re.sub(r'(\w)-\s+(\w)', r'\1-\2', text)
    # Fix multiple spaces
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def format_paragraphs(html):
    """Smart paragraph formatting preserving structure"""
    # Extract all paragraphs and headings from original HTML
    parts = re.split(r'(</?(?:h[12]|p)>)', html)
    
    result = []
    current_tag = None
    current_text = ""
    
    for part in parts:
        if part in ('<p>', '<h2>', '<h1>'):
            current_tag = part
            current_text = ""
        elif part == '</p>':
            current_tag = None
            text = clean_text(current_text)
            if not text:
                continue
            # Check what kind of block this is
            if is_heading(text):
                result.append(f'<h2>{text}</h2>')
            elif is_blockquote(text):
                result.append(f'<blockquote>{text}</blockquote>')
            else:
                result.append(f'<p>{text}</p>')
            current_text = ""
        elif part == '</h2>' or part == '</h1>':
            current_tag = None
            text = clean_text(current_text)
            if text:
                result.append(f'<h2>{text}</h2>')
            current_text = ""
        else:
            current_text += part
    
    return '\n\n'.join(result)

def merge_only_broken_lines(html):
    """
    First pass: merge only paragraphs that are clearly broken by soft line breaks.
    A paragraph is broken if it's very short (< 30 chars) OR 
    doesn't end with sentence-ending punctuation.
    But NEVER merge if the next paragraph looks like a heading or lead-in.
    """
    # Parse into blocks
    parts = re.split(r'(</?(?:h[12]|p)>)', html)
    
    blocks = []  # list of (tag, text)
    current_tag = None
    current_text = ""
    
    for part in parts:
        if part in ('<p>', '<h2>', '<h1>'):
            current_tag = part
            current_text = ""
        elif part in ('</p>', '</h2>', '</h1>'):
            if current_text.strip():
                blocks.append((current_tag, clean_text(current_text)))
            current_tag = None
            current_text = ""
        else:
            current_text += part
    
    # Now merge only truly broken paragraphs
    merged = []
    i = 0
    while i < len(blocks):
        tag, text = blocks[i]
        if tag != '<p>':
            merged.append((tag, text))
            i += 1
            continue
        
        # Start a new merged paragraph
        merged_text = text
        
        # Check if we should merge with next paragraph(s)
        while i + 1 < len(blocks):
            next_tag, next_text = blocks[i + 1]
            
            # Never merge headings
            if next_tag != '<p>':
                break
            
            # Never merge if next looks like a heading or lead-in
            if is_heading(next_text) or is_leadin(next_text):
                break
            
            # Never merge if next is a blockquote
            if is_blockquote(next_text):
                break
            
            # Check if current text ends with sentence-ending punctuation
            ends_sentence = bool(re.search(r'[.!?"\'\u201d\u2019]\.?$', merged_text))
            
            # If current is short OR doesn't end with sentence ending, merge
            if len(merged_text) < 50 or not ends_sentence:
                merged_text = merged_text + " " + next_text
                i += 1
            else:
                break
        
        merged.append(('<p>', merged_text))
        i += 1
    
    # Convert back to HTML with heading/blockquote detection
    result = []
    for tag, text in merged:
        if tag != '<p>':
            result.append(f'<h2>{text}</h2>' if tag == '<h2>' else f'<h1>{text}</h1>')
            continue
        
        if is_heading(text):
            result.append(f'<h2>{text}</h2>')
        elif is_blockquote(text):
            result.append(f'<blockquote>{text}</blockquote>')
        else:
            result.append(f'<p>{text}</p>')
    
    return '\n\n'.join(result)

# Process each year
for year in ['1957', '1958', '1959']:
    html = data[year]
    fixed_html = merge_only_broken_lines(html)
    
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
    print(f"Year {year}: old={len(old_content)} → new={len(fixed_html)} chars")
    
    new_content = content[:search_start] + fixed_html + content[end_idx:]
    content = new_content

with open(r'C:\Users\info\WorkBuddy\2026-05-15-task-1\buffettknowledge\data\letters.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nDone! Updated with headings, lead-ins, and blockquotes preserved.")
