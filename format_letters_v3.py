import json
import re

with open(r'C:\Users\info\WorkBuddy\2026-05-15-task-1\buffettknowledge\docx_extracted.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open(r'C:\Users\info\WorkBuddy\2026-05-15-task-1\buffettknowledge\data\letters.ts', 'r', encoding='utf-8') as f:
    content = f.read()

INLINE_HEADING_PATTERNS = [
    r'^(The General Stock Market (?:Picture|View) in \d{4}):?',
    r'^(Our Activities (?:in|for) \d{4}):?',
    r'^(Results (?:in|for) \d{4}):?',
    r'^(Review of Partners and Capital):?',
    r'^(Portfolio Activity):?',
    r'^(Market Performance):?',
    r'^(Investment Activity):?',
    r'^(The Year \w+):?',
    r'^(\d{4}\s+Letter):?',
]

def clean_text(text):
    text = re.sub(r'(\w)-\s+(\w)', r'\1-\2', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def split_inline_heading(text):
    for pat in INLINE_HEADING_PATTERNS:
        m = re.match(pat + r'\s+(.+)$', text, re.IGNORECASE)
        if m:
            heading = m.group(1).strip().rstrip(':')
            heading = heading[0].upper() + heading[1:]
            body = m.group(2).strip()
            return heading, body
    return None, text

def is_standalone_heading(text):
    t = text.strip()
    if t.isupper() and len(t) < 100:
        return True
    for pat in INLINE_HEADING_PATTERNS:
        if re.match(pat + r'$', t, re.IGNORECASE):
            return True
    return False

def is_leadin(text):
    t = text.strip().lower()
    return bool(re.search(r'(said|wrote|speech)\s+(the\s+following|as\s+follows|:)', t))

def is_quote_start(text):
    """Does this paragraph start a quote?"""
    t = text.strip()
    return t.startswith('"') or t.startswith('"') or t.startswith('\u201c')

def is_quote_end(text):
    """Does this paragraph end a quote?"""
    t = text.strip()
    return t.endswith('"') or t.endswith('"') or t.endswith('\u201d') or t.endswith('".')

def parse_and_format(html):
    parts = re.split(r'(</?(?:h[12]|p)>)', html)
    blocks = []
    cur_tag = None
    cur_text = ""
    
    for part in parts:
        if part in ('<p>', '<h2>', '<h1>'):
            cur_tag = part
            cur_text = ""
        elif part in ('</p>', '</h2>', '</h1>'):
            if cur_text.strip():
                blocks.append((cur_tag, clean_text(cur_text)))
            cur_tag = None
            cur_text = ""
        else:
            cur_text += part
    
    # Step 1: merge broken lines
    merged = []
    i = 0
    while i < len(blocks):
        tag, text = blocks[i]
        if tag != '<p>':
            merged.append((tag, text))
            i += 1
            continue
        
        merged_text = text
        while i + 1 < len(blocks):
            next_tag, next_text = blocks[i + 1]
            if next_tag != '<p>':
                break
            if is_standalone_heading(next_text):
                break
            if is_leadin(next_text):
                break
            if is_quote_start(next_text):
                break
            
            ends_sentence = bool(re.search(r'[.!?"\'\u201d\u2019]\.?$', merged_text))
            is_colon_intro = merged_text.rstrip().endswith(':') and is_leadin(merged_text)
            if is_colon_intro:
                break
            if len(merged_text) < 50 or not ends_sentence:
                merged_text = merged_text + " " + next_text
                i += 1
            else:
                break
        
        merged.append(('<p>', merged_text))
        i += 1
    
    # Step 2: merge multi-paragraph quotes
    final = []
    i = 0
    while i < len(merged):
        tag, text = merged[i]
        if tag != '<p>' or not is_quote_start(text):
            final.append((tag, text))
            i += 1
            continue
        
        # Check if previous paragraph is a lead-in (ends with colon)
        if final and final[-1][0] == '<p>' and final[-1][1].rstrip().endswith(':'):
            # Collect all consecutive quote paragraphs
            quote_text = text
            i += 1
            while i < len(merged):
                ntag, ntext = merged[i]
                if ntag != '<p>':
                    break
                if is_standalone_heading(ntext):
                    break
                if is_leadin(ntext):
                    break
                quote_text = quote_text + " " + ntext
                if is_quote_end(ntext):
                    i += 1
                    break
                i += 1
            final.append(('<blockquote>', quote_text))
        else:
            final.append((tag, text))
            i += 1
    
    # Step 3: format output
    result = []
    for tag, text in final:
        if tag != '<p>':
            result.append(f'<h2>{text}</h2>' if tag == '<h2>' else f'<h1>{text}</h1>' if tag == '<h1>' else f'<blockquote>{text}</blockquote>')
            continue
        
        heading, body = split_inline_heading(text)
        if heading:
            result.append(f'<h2>{heading}</h2>')
            if body:
                result.append(f'<p>{body}</p>')
        elif is_standalone_heading(text):
            result.append(f'<h2>{text}</h2>')
        else:
            result.append(f'<p>{text}</p>')
    
    return '\n\n'.join(result)

for year in ['1957', '1958', '1959']:
    html = data[year]
    fixed_html = parse_and_format(html)
    
    slug_marker = f"slug: '{year}-partnership-letter'"
    slug_idx = content.find(slug_marker)
    ft_idx = content.find("fullText: `", slug_idx)
    search_start = ft_idx + len("fullText: `")
    end_idx = content.find("`,\n\n    concepts:", search_start)
    
    old = content[search_start:end_idx]
    content = content[:search_start] + fixed_html + content[end_idx:]
    print(f"Year {year}: old={len(old)} -> new={len(fixed_html)}")

with open(r'C:\Users\info\WorkBuddy\2026-05-15-task-1\buffettknowledge\data\letters.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nDone!")
