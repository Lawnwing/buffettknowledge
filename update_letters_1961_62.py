import re

# Read the three HTML files
with open('C:/Users/info/WorkBuddy/2026-05-15-task-1/buffettknowledge/html_1961_clean.html', 'r', encoding='utf-8') as f:
    html_1961 = f.read()

with open('C:/Users/info/WorkBuddy/2026-05-15-task-1/buffettknowledge/html_1962m_clean.html', 'r', encoding='utf-8') as f:
    html_1962m = f.read()

with open('C:/Users/info/WorkBuddy/2026-05-15-task-1/buffettknowledge/html_1962_clean.html', 'r', encoding='utf-8') as f:
    html_1962 = f.read()

print("HTML lengths: 1961={}, 1962m={}, 1962={}".format(len(html_1961), len(html_1962m), len(html_1962)))

# Read letters.ts
with open('C:/Users/info/WorkBuddy/2026-05-15-task-1/buffettknowledge/data/letters.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# === 1. Update 1961-partnership-letter ===
old_1961 = """    slug: '1961-partnership-letter',
    year: 1961,
    type: 'partnership',
    title: 'The Final Full Year - 1961',
    date: '1961-01-01',
    summary:
      "Buffett's 15th year investing and 5th year for the partnership. He provided a detailed analysis of his investment approach and introduced the concept of managing expectations - distinguishing between absolute and relative performance.",
        fullText: `[[PLACEHOLDER]]`,"""

new_1961 = """    slug: '1961-partnership-letter',
    year: 1961,
    type: 'partnership',
    title: 'Our Performance in 1961',
    date: '1962-01-24',
    summary:
      "Buffett's 15th year investing and 5th year for the partnership. He provided a detailed analysis of his three investment categories: Generals (undervalued securities), Workouts (event-driven), and Control situations. The partnership achieved 45.9% vs 22.2% Dow in 1961, a 23.7 percentage point advantage.",
        fullText: `""" + html_1961 + """`,"""

if old_1961 in content:
    content = content.replace(old_1961, new_1961, 1)
    print("1. 1961-partnership-letter updated!")
else:
    print("ERROR: 1961 placeholder not found!")

# === 2. Insert 1962-mid-year-letter before 1963 entry ===
# Find the 1963 entry and insert before it
pattern_1963_start = re.compile(r"\n  \{\n    slug: '1963-partnership-letter',", re.DOTALL)
match = pattern_1963_start.search(content)
if match:
    insert_pos = match.start()
    new_1962m = """
    slug: '1962-mid-year-letter',
    year: 1962,
    type: 'partnership',
    title: 'Semi-Annual Letter — July 1962',
    date: '1962-07-06',
    summary:
      "Mid-1962 report showing the partnership's strong performance during a market decline. Dow fell 21.7% in the first half while the partnership declined only 7.5%, a 14.2 percentage point advantage. Includes reprinted 'And a Prediction' section.",
        fullText: `""" + html_1962m + """`,"""
    content = content[:insert_pos] + new_1962m + "\n  " + content[insert_pos:]
    print("2. 1962-mid-year-letter inserted!")
else:
    print("ERROR: 1963 entry not found!")

# === 3. Update 1962-partnership-letter ===
old_1962 = """    slug: '1962-partnership-letter',
    year: 1962,
    type: 'partnership',
    title: 'The Partnership\\'s Best Year - 1962',
    date: '1962-01-01',
    summary:
      "A major market crash in 1962 (Dow down 8.3%) contrasted with the partnership's best year. Buffett introduced the \\"Three Groups of Securities\\" framework: (1) General Securities, (2) Workouts, (3) Controls. He also described his investment in Berkshire Hathaway.",
        fullText: `[[PLACEHOLDER]]`,"""

new_1962 = """    slug: '1962-partnership-letter',
    year: 1962,
    type: 'partnership',
    title: 'To My Partners for 1963',
    date: '1962-11-01',
    summary:
      "Annual partnership letter for 1962. Despite a 16.8% Dow decline, the partnership achieved a 5.5% gain through controlled assets and workout situations. Dempster Mill Manufacturing Company showed major progress, with inventory falling from $4.2M to $1.9M and yearend value rising from $35 to $50/share.",
        fullText: `""" + html_1962 + """`,"""

if old_1962 in content:
    content = content.replace(old_1962, new_1962, 1)
    print("3. 1962-partnership-letter updated!")
else:
    print("ERROR: 1962 placeholder not found!")

# Save
with open('C:/Users/info/WorkBuddy/2026-05-15-task-1/buffettknowledge/data/letters.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nAll updates saved!")
print("File length: {} chars".format(len(content)))
