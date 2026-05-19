import zipfile
import re

def extract_paragraphs(xml_content):
    """Extract paragraphs with formatting info from docx XML"""
    para_pattern = re.compile(r'<w:p[ >].*?</w:p>', re.DOTALL)
    paras = para_pattern.findall(xml_content)

    paragraphs = []
    for para in paras:
        runs = re.findall(r'<w:r[ >].*?</w:r>', para, re.DOTALL)

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


def table_to_html(rows):
    """Convert table rows to HTML table"""
    if not rows:
        return ''

    header = rows[0] if rows else []
    body = rows[1:] if len(rows) > 1 else []

    has_header = False
    if header:
        header_text = ' '.join(header).lower()
        if any(word in header_text for word in ['year', 'result', 'fund', 'dow', 'percent', '%', 'partner', 'performance', 'quarter']):
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


def para_to_html(paras, tables):
    """Convert paragraphs to HTML with smart merging"""
    html_parts = []
    table_idx = 0

    i = 0
    while i < len(paras):
        p = paras[i]

        if p['type'] in ('table_start', 'table_row'):
            i += 1
            continue
        if p['type'] == 'table_end':
            if table_idx < len(tables):
                html_parts.append(table_to_html(tables[table_idx]))
                table_idx += 1
            i += 1
            continue

        text = p['text']
        if len(text) < 3:
            i += 1
            continue

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
            r'^(Appendix)',
        ]

        for pat in heading_patterns:
            if re.search(pat, text):
                is_heading = True
                break

        if is_heading and p['bold']:
            html_parts.append('<h2>{}</h2>'.format(text))
        elif is_heading or text.isupper():
            html_parts.append('<h3>{}</h3>'.format(text))
        elif p['bold'] and len(text) < 100:
            html_parts.append('<p><strong>{}</strong></p>'.format(text))
        else:
            html_parts.append('<p>{}</p>'.format(text))

        i += 1

    return '\n'.join(html_parts)


def process_docx(filepath):
    """Process a single docx file and return HTML"""
    with zipfile.ZipFile(filepath, 'r') as z:
        xml_content = z.read('word/document.xml').decode('utf-8')

    paras = extract_paragraphs(xml_content)
    tables = extract_tables(xml_content)

    print("Found {} paragraphs, {} tables".format(len(paras), len(tables)))
    for p in paras[:10]:
        if p['type'] == 'text':
            print("  [{}] {}".format('B' if p['bold'] else ' ', p['text'][:80]))

    html = para_to_html(paras, tables)
    return html, paras, tables


if __name__ == '__main__':
    filepath = r'C:/Users/info/Desktop/巴菲特的信/1962-3.docx'
    outpath = r'C:/Users/info/WorkBuddy/2026-05-15-task-1/buffettknowledge/output_1962_3_raw.html'
    print('Processing:', filepath)
    html, paras, tables = process_docx(filepath)

    with open(outpath, 'w', encoding='utf-8') as f:
        f.write(html)
    print('Saved to {} ({} chars)'.format(outpath, len(html)))
