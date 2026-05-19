import zipfile
import re

def process_docx(filepath):
    with zipfile.ZipFile(filepath, 'r') as z:
        xml_content = z.read('word/document.xml').decode('utf-8')

    # Extract all tables with their content
    tables = []
    table_pattern = re.compile(r'<w:tbl>.*?</w:tbl>', re.DOTALL)
    table_blocks = table_pattern.findall(xml_content)
    for block in table_blocks:
        rows = []
        row_pattern = re.compile(r'<w:tr[ >].*?</w:tr>', re.DOTALL)
        row_matches = row_pattern.findall(block)
        for row in row_matches:
            cells = []
            cell_pattern = re.compile(r'<w:tc[ >].*?</w:tc>', re.DOTALL)
            cell_matches = cell_pattern.findall(row)
            for cell in cell_matches:
                texts = re.findall(r'<w:t[^>]*>([^<]*)</w:t>', cell)
                cell_text = ' '.join(texts).strip()
                cells.append(cell_text)
            if cells:
                rows.append(cells)
        if rows:
            tables.append(rows)

    table_idx = 0
    html_parts = []

    # Split XML into top-level elements (body children)
    # The body contains w:p and w:tbl elements
    body_match = re.search(r'<w:body>(.*?)</w:body>', xml_content, re.DOTALL)
    if not body_match:
        print("No body found")
        return ""

    body_content = body_match.group(1)

    # Find all top-level paragraphs and tables in order
    # We use a combined pattern to find them in sequence
    elements = re.findall(r'(<w:tbl[ >].*?</w:tbl>|<w:p[ >].*?</w:p>)', body_content, re.DOTALL)

    heading_patterns = [
        r'^(THE PARTNERSHIP)', r'^(BUFFETT PARTNERSHIP)', r'^(810 KIEWIT PLAZA)',
        r'^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d+,\s*\d{4}',
        r'^(To|TO)\s+(My|my)\s+(Partners|PARTNERS)', r'^\d{4}\s+(LETTER|Letter)',
        r'^(Our Performance)', r'^(The General Stock Market)', r'^(Results of)',
        r'^(Three Categories)', r'^(How to)', r'^(Some Thoughts)',
        r'^(The Year)', r'^(Investment)', r'^(Performance)',
        r'^(Appendix)', r'^(COMPOUNDED)', r'^(Investment Companies)',
        r'^(The Ground Rules)', r'^(The Joys of Compounding)',
        r'^(Controls)', r'^(Generals)', r'^(Workouts)',
    ]

    for elem in elements:
        if elem.startswith('<w:tbl'):
            # Output table
            if table_idx < len(tables):
                html_parts.append(table_to_html(tables[table_idx]))
                table_idx += 1
            continue

        # It's a paragraph
        runs = re.findall(r'<w:r[ >].*?</w:r>', elem, re.DOTALL)
        if not runs:
            continue

        full_text = ''
        is_bold = False
        is_italic = False

        for run in runs:
            if re.search(r'<w:b[ />]', run):
                is_bold = True
            if re.search(r'<w:i[ />]', run):
                is_italic = True
            texts = re.findall(r'<w:t[^>]*>([^<]*)</w:t>', run)
            for t in texts:
                full_text += t

        full_text = re.sub(r'\s+', ' ', full_text).strip()
        if len(full_text) < 2:
            continue

        # Check heading
        is_heading = False
        for pat in heading_patterns:
            if re.search(pat, full_text):
                is_heading = True
                break

        if is_heading and is_bold:
            html_parts.append('<h2>{}</h2>'.format(full_text))
        elif is_heading or full_text.isupper():
            html_parts.append('<h3>{}</h3>'.format(full_text))
        elif is_bold and len(full_text) < 120:
            html_parts.append('<p><strong>{}</strong></p>'.format(full_text))
        else:
            html_parts.append('<p>{}</p>'.format(full_text))

    return '\n'.join(html_parts)


def table_to_html(rows):
    if not rows:
        return ''

    header = rows[0] if rows else []
    body = rows[1:] if len(rows) > 1 else []

    has_header = False
    if header:
        header_text = ' '.join(header).lower()
        if any(word in header_text for word in ['year', 'result', 'fund', 'dow', 'percent', '%', 'partner', 'performance', 'quarter', 'assets', 'book', 'liabilities', 'annual']):
            has_header = True

    html = '<table>'
    if has_header:
        html += '<thead><tr>'
        for cell in header:
            html += '<th>{}</th>'.format(cell)
        html += '</tr></thead>'

    html += '<tbody>'
    for row in (body if has_header else rows):
        html += '<tr>'
        for cell in row:
            html += '<td>{}</td>'.format(cell)
        html += '</tr>'
    html += '</tbody></table>'

    return html


if __name__ == '__main__':
    filepath = r'C:/Users/info/Desktop/巴菲特的信/1962-3.docx'
    outpath = r'C:/Users/info/WorkBuddy/2026-05-15-task-1/buffettknowledge/html_1962_3_clean.html'

    html = process_docx(filepath)
    print('Generated HTML: {} chars, {} lines'.format(len(html), html.count(chr(10))))

    with open(outpath, 'w', encoding='utf-8') as f:
        f.write(html)
    print('Saved to', outpath)
