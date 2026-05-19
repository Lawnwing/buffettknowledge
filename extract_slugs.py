import re, json

with open('data/letters.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all slug entries at the start of object properties (preceded by newline + indentation)
# This avoids matching slug: inside fullText HTML strings
pattern = re.compile(r'\n\s{4}slug:\s*[\'"]([^\'"]+)[\'"]')
matches = pattern.finditer(content)
slugs = []
for m in matches:
    slug = m.group(1)
    pos = m.end()
    ctx = content[pos:pos+800]
    year_m = re.search(r'\byear:\s*(\d+)', ctx)
    type_m = re.search(r'\btype:\s*[\'"]([^\'"]+)[\'"]', ctx)
    slugs.append({
        'slug': slug,
        'year': int(year_m.group(1)) if year_m else 0,
        'type': type_m.group(1) if type_m else ''
    })

print(f'Found {len(slugs)} slugs')
for s in slugs[:5]:
    print(f"  {s['slug']} ({s['year']}) [{s['type']}]")
print("  ...")
for s in slugs[-3:]:
    print(f"  {s['slug']} ({s['year']}) [{s['type']}]")

with open('data/letters-slugs.json', 'w') as f:
    json.dump(slugs, f, indent=2)
print('Written to data/letters-slugs.json')
