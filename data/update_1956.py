import re

with open('letters.ts', 'r', encoding='utf-8') as f:
    content = f.read()

with open('1956_fulltext.html', 'r', encoding='utf-8') as f:
    new_html = f.read()

# Find and replace the 1956 fullText
# Pattern: fullText: `...`, after the 1956 slug
pattern = r"(slug: '1956-partnership-letter'.*?fullText: `)(.+?)(`,\s*\n\s*concepts:)"

def replacer(m):
    return m.group(1) + new_html + m.group(3)

new_content = re.sub(pattern, replacer, content, count=1, flags=re.DOTALL)

if new_content == content:
    print('ERROR: Pattern not found')
else:
    with open('letters.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Done: 1956 fullText updated')
