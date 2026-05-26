#!/usr/bin/env python3
"""
parse_fulltexts.py - Extract slug->fullText from fulltexts.ts
Writes to fulltexts_map.json for use by injection script.
"""

import re
import json
import sys
import os

def parse_fulltexts(filepath):
    """
    Parse fulltexts.ts by finding each 'slug': `...` block.
    Since HTML content does not contain backticks, we can find
    the closing backtick reliably.
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    entries = {}

    # Find all slug positions
    # Pattern:   'slug': `  (with possible spaces before)
    # We'll find all occurrences of ': `' and work backwards to get the slug
    
    pos = 0
    while True:
        # Find next ': `'
        colon_backtick = content.find(": `", pos)
        if colon_backtick == -1:
            break
        
        # The slug is the quoted string before ": `"
        # Walk backwards to find the opening quote
        slug_start = None
        i = colon_backtick - 1
        while i >= 0:
            if content[i] == "'":
                slug_start = i
                break
            i -= 1
        
        if slug_start is None:
            pos = colon_backtick + 1
            continue
        
        slug = content[slug_start + 1:colon_backtick].strip()
        
        # Now find the CLOSING backtick
        # Search from after ": `" for a '`' that is followed by '`,' or '`\n'
        content_start = colon_backtick + 3  # after ": `"
        
        # Find closing backtick - it should be on its own line (preceded by newline)
        # Actually, let's find the NEXT '`' that is at the start of a line (with leading whitespace)
        # Pattern: newline + whitespace + '`'
        close_pattern = "\n" + " "*0 + "`"
        
        # Search for '`' followed by ',' (the end of the entry)
        # The closing is: `,\n or `,\r\n
        j = content_start
        found_close = False
        while j < len(content):
            if content[j] == '`':
                # Check if this is the closing backtick (followed by ',' or end of entry)
                after = content[j:]
                if after.startswith("`,\n") or after.startswith("`,\r\n") or after.startswith("`,"):
                    full_text = content[content_start:j]
                    entries[slug] = full_text
                    found_close = True
                    pos = j + len("`,\n")  # skip past
                    break
            j += 1
        
        if not found_close:
            print(f"  WARNING: Could not find closing backtick for slug: {slug}")
            pos = colon_backtick + 1
    
    return entries

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    fulltexts_path = os.path.join(script_dir, 'data', 'fulltexts.ts')
    
    print(f"Parsing {fulltexts_path}...")
    entries = parse_fulltexts(fulltexts_path)
    print(f"  Found {len(entries)} entries")
    
    if len(entries) == 0:
        print("  ERROR: No entries found! Check file format.")
        # Debug: show first 500 chars
        with open(fulltexts_path, 'r', encoding='utf-8') as f:
            sample = f.read(500)
        print(f"  File starts with:\n{sample}")
        sys.exit(1)
    
    # Show some sample slugs
    sample_slugs = list(entries.keys())[:5]
    print(f"  Sample slugs: {sample_slugs}")
    
    # Write to JSON for debugging
    output_path = os.path.join(script_dir, 'fulltexts_map.json')
    # JSON can't handle all Unicode, so we write carefully
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump({k: v[:100] + "..." for k, v in entries.items()}, f, ensure_ascii=False, indent=2)
    print(f"  Preview written to {output_path}")
    
    # Actually write the full map
    # But JSON might be too large. Let's just return the map.
    # For now, write a pickle-like file or just use the map directly.
    
    # Actually, let's just print stats
    total_chars = sum(len(v) for v in entries.values())
    print(f"  Total fullText characters: {total_chars:,}")
    
    # Return entries for use by injection
    return entries

if __name__ == '__main__':
    main()
