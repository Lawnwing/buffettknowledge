import zipfile
import re
import os

def extract_paragraphs(xml_content):
    """Extract paragraphs with formatting info from docx XML"""
    # Split into paragraphs
    para_pattern = re.compile(r'<w:p[ >].*?</w:p>', re.DOTALL)
    paras = para_pattern.findall(xml_content)

    paragraphs = []
    for para in paras:
        # Extract all text runs with their formatting
        runs = re.findall(r'<w:r[ >].*?</w:r>', para, re.DOTALL)

        # Check for table rows (skip them, we'll handle separately)
        if re.search(r'<w:tbl', para):
            paragraphs.append({'type': 'table_start'})
            continue
        if re.search(r'<w:tr[ >]', para):
            paragraphs.append({'type': 'table_row'})
            continue
        if re.search(r'</w:tbl>', para):
            paragraphs.append({'type': 'table_end'})
            continue

        if not runs:
            continue

        # Extract text and bold info
        full_text = ''
        is_bold = False
        is_italic = False

        for run in runs:
            # Check for formatting
            if re.search(r'<w:b[ />]', run):
                is_bold = True
            if re.search(r'<w:i[ />]', run):
                is_italic = True

            # Extract text
            texts = re.findall(r'<w:t[^>]*>([^<]*)</w:t>', run)
            for t in texts:
                full_text += t

        # Clean up whitespace
        full_text = re.sub(r'\s+', ' ', full_text).strip()

        if full_text:
            paragraphs.append({
                'type': 'text',
                'text': full_text,
                'bold': is_bold,
                'italic': is_italic
            })

    return paragraphs


def extract_tables(xml_content):
    """Extract tables from docx XML"""
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

    return tables


def para_to_html(paras, tables):
    """Convert paragraphs to HTML with smart merging"""
    html_parts = []
    table_idx = 0

    i = 0
    while i < len(paras):
        p = paras[i]

        if p['type'] == 'table_start':
            i += 1
            continue
        if p['type'] == 'table_row':
            i += 1
            continue
        if p['type'] == 'table_end':
            # Insert table
            if table_idx < len(tables):
                html_parts.append(table_to_html(tables[table_idx]))
                table_idx += 1
            i += 1
            continue

        text = p['text']

        # Skip very short paragraphs that are likely just whitespace artifacts
        if len(text) < 3:
            i += 1
            continue

        # Check if it's a heading
        is_heading = False
        heading_patterns = [
            r'^(THE PARTNERSHIP)',
            r'^(BUFFETT PARTNERSHIP)',
            r'^(810 KIEWIT PLAZA)',
            r'^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d+,\s*\d{4}',
            r'^(To|TO)\s+(My|my)\s+(Partners|PARTNERS)',
            r'^\d{4}\s+(LETTER|Letter)',
            r'^(Our Performance)',
            r'^(The General Stock Market)',
            r'^(Results of)',
            r'^(Three Categories)',
            r'^(How to)',
            r'^(Some Thoughts)',
            r'^(The Year)',
            r'^(Investment)',
            r'^(Performance)',
        ]

        for pat in heading_patterns:
            if re.search(pat, text):
                is_heading = True
                break

        # Make section headers bold uppercase
        if is_heading and p['bold']:
            html_parts.append(f'<h2>{text}</h2>')
        elif is_heading or text.isupper():
            html_parts.append(f'<h3>{text}</h3>')
        elif p['bold'] and len(text) < 100:
            html_parts.append(f'<p><strong>{text}</strong></p>')
        else:
            html_parts.append(f'<p>{text}</p>')

        i += 1

    return '\n'.join(html_parts)


def table_to_html(rows):
    """Convert table rows to HTML table"""
    if not rows:
        return ''

    # Skip header row if it looks like a table header
    header = rows[0] if rows else []
    body = rows[1:] if len(rows) > 1 else []

    # Detect header: first row has fewer or shorter cells, or contains typical headers
    has_header = False
    if header:
        header_text = ' '.join(header).lower()
        if any(word in header_text for word in ['year', 'result', 'fund', 'dow', 'percent', '%', 'partner', 'performance']):
            has_header = True

    html = '<table>'

    if has_header:
        html += '<thead><tr>'
        for cell in header:
            html += f'<th>{cell}</th>'
        html += '</tr></thead>'

    html += '<tbody>'
    for row in (body if has_header else rows):
        html += '<tr>'
        for cell in row:
            html += f'<td>{cell}</td>'
        html += '</tr>'
    html += '</tbody></table>'

    return html


def process_docx(filepath):
    """Process a single docx file and return HTML"""
    with zipfile.ZipFile(filepath, 'r') as z:
        xml_content = z.read('word/document.xml').decode('utf-8')

    paras = extract_paragraphs(xml_content)
    tables = extract_tables(xml_content)

    # Print first few paragraphs for debugging
    print(f"Found {len(paras)} paragraphs, {len(tables)} tables")
    for p in paras[:5]:
        if p['type'] == 'text':
            print(f"  [{'B' if p['bold'] else ' '}] {p['text'][:80]}")

    html = para_to_html(paras, tables)
    return html, paras, tables


def process_and_save():
    base = 'C:/Users/info/WorkBuddy/2026-05-15-task-1/buffettknowledge'
    docs = [
        ('C:/Users/info/Desktop/巴菲特的信/1961.docx', base + '/output_1961.html'),
        ('C:/Users/info/Desktop/巴菲特的信/1962.docx', base + '/output_1962_midyear.html'),
        ('C:/Users/info/Desktop/巴菲特的信/1962-2.docx', base + '/output_1962.html'),
    ]

    for doc, outfile in docs:
        filepath = doc
        print(f'\n=== Processing {doc} ===')
        html, paras, tables = process_docx(filepath)

        with open(outfile, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f'Saved to {outfile} ({len(html)} chars)')


if __name__ == '__main__':
    process_and_save()
