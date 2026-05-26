#!/usr/bin/env python3
"""
inject_fulltexts_batch.py
Parse fulltexts.ts -> build slug->fullText map
Inject into letters.ts: replace [[PLACEHOLDER]] with real content
Usage: python3 inject_fulltexts_batch.py [start_year] [end_year]
"""

import re
import sys
import os

def parse_fulltexts(filepath):
    """Parse fulltexts.ts, return dict slug->fullText content (without outer backticks)."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove the header comment and export line
    # Format: 'slug': `...`,
    # We need to extract content between the backticks
    
    entries = {}
    
    # Strategy: find each 'slug': `<TAB>content...</TAB>`,
    # Use a state machine approach
    
    i = 0
    n = len(content)
    
    while i < n:
        # Look for pattern: 'slug': `
        if content[i] == "'" or (i+1 < n and content[i:i+2] == "  '"):
            # Try to match start of an entry
            # Find: 'slug': `
            idx = content.find(": `", i)
            if idx == -1:
                break
            
            # Get the slug (between the first ' and the next ' before : `)
            slug_start = content.rfind("'", i, idx)
            if slug_start == -1:
                i = idx + 1
                continue
            slug_end = content.find("'", slug_start + 1)
            if slug_end == -1 or slug_end > idx:
                i = idx + 1
                continue
            slug = content[slug_start + 1:slug_end]
            
            # Now find the closing backtick
            # The content between ` and ` may span multiple lines
            # We need to find the closing ` that is followed by `,\n` or `,\r\n`
            content_start = idx + 3  # after ": `"
            
            # Find closing backtick
            # Strategy: look for `\n` or `,\r\n` pattern
            # But content may contain ` characters... 
            # HTML content shouldn't contain backticks, so we look for `\n` or `,\r\n`
            
            j = content_start
            found_end = False
            while j < n:
                if content[j] == '`':
                    # Check if this is the closing backtick (followed by comma and newline)
                    rest = content[j:]
                    if rest.startswith("`,\n") or rest.startswith("`,\r\n") or rest.startswith("`,"):
                        full_text = content[content_start:j]
                        entries[slug] = full_text
                        found_end = True
                        i = j + len("`,\n")
                        break
                j += 1
            
            if not found_end:
                print(f"  WARNING: Could not find closing backtick for slug: {slug}")
                i = idx + 1
        else:
            i += 1
    
    return entries

def inject(fulltexts_map, letters_path, start_year, end_year):
    """Inject fullTexts into letters.ts for given year range."""
    with open(letters_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    replaced = 0
    skipped = 0
    
    for year in range(start_year, end_year + 1):
        slug = f"{year}-berkshire-letter"
        if slug not in fulltexts_map:
            print(f"  SKIP {year}: slug not in fulltexts.ts")
            skipped += 1
            continue
        
        full_text = fulltexts_map[slug]
        
        # Find the placeholder in letters.ts
        # Pattern: slug: '...' ... fullText: `[[PLACEHOLDER]]`,
        # We need to find this specific slug's fullText placeholder
        
        # Find the letter entry for this slug
        slug_pattern = f"slug: '{slug}'"
        slug_idx = content.find(slug_pattern)
        if slug_idx == -1:
            print(f"  SKIP {year}: slug not found in letters.ts")
            skipped += 1
            continue
        
        # Search for fullText placeholder after this slug
        after_slug = content[slug_idx:]
        ph_pattern = "fullText: `[[PLACEHOLDER]]`"
        ph_idx = after_slug.find(ph_pattern)
        if ph_idx == -1:
            print(f"  SKIP {year}: no PLACEHOLDER found (already injected?)")
            skipped += 1
            continue
        
        # Calculate absolute position
        abs_ph_idx = slug_idx + ph_idx
        
        # Replace the placeholder
        # The replacement is: fullText: ` + full_text + `,
        before = content[:abs_ph_idx]
        after = content[abs_ph_idx + len(ph_pattern):]
        
        # Need to add back the `,  that was part of the placeholder
        # Actually ph_pattern ends with `, so after starts after `
        # Let me re-check: ph_pattern = "fullText: `[[PLACEHOLDER]]`"
        # The actual text in the file is: fullText: `[[PLACEHOLDER]]`,
        # So ph_pattern should be "fullText: `[[PLACEHOLDER]]`"
        # and after the replacement we need: fullText: `content...`,
        
        new_fulltext = f"fullText: `{full_text}`"
        
        content = before + new_fulltext + after
        
        print(f"  OK {year}: injected {len(full_text)} chars")
        replaced += 1
    
    print(f"\nSummary: {replaced} replaced, {skipped} skipped")
    return content

def main():
    start_year = int(sys.argv[1]) if len(sys.argv) > 1 else 1992
    end_year = int(sys.argv[2]) if len(sys.argv) > 2 else 1996
    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    fulltexts_path = os.path.join(script_dir, 'data', 'fulltexts.ts')
    letters_path = os.path.join(script_dir, 'data', 'letters.ts')
    
    print(f"Parsing fulltexts.ts ({start_year}-{end_year})...")
    fulltexts_map = parse_fulltexts(fulltexts_path)
    print(f"  Found {len(fulltexts_map)} entries total")
    
    # Check which slugs we need
    needed = [f"{y}-berkshire-letter" for y in range(start_year, end_year+1)]
    available = [s for s in needed if s in fulltexts_map]
    missing = [s for s in needed if s not in fulltexts_map]
    print(f"  Available: {len(available)}, Missing: {len(missing)}")
    if missing:
        print(f"  Missing slugs: {missing}")
    
    print(f"\nInjecting into letters.ts...")
    new_content = inject(fulltexts_map, letters_path, start_year, end_year)
    
    # Backup
    backup_path = letters_path + f".backup_{start_year}_{end_year}"
    print(f"\nBackup: {backup_path}")
    with open(backup_path, 'w', encoding='utf-8') as f:
        with open(letters_path, 'r', encoding='utf-8') as orig:
            f.write(orig.read())
    
    print(f"Writing letters.ts...")
    with open(letters_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Done!")

if __name__ == '__main__':
    main()
