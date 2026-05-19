import zipfile
import re

def parse_docx(filepath):
    with zipfile.ZipFile(filepath, 'r') as z:
        xml_content = z.read('word/document.xml').decode('utf-8')

    # Extract all tables first
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

    # Remove table blocks from XML to process remaining paragraphs
    xml_no_tables = table_pattern.sub('', xml_content)

    # Extract paragraphs from non-table content
    para_pattern = re.compile(r'<w:p[ >].*?</w:p>', re.DOTALL)
    paras = para_pattern.findall(xml_no_tables)

    paragraphs = []
    for para in paras:
        runs = re.findall(r'<w:r[ >].*?</w:r>', para, re.DOTALL)
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
                'text': full_text,
                'bold': is_bold,
                'italic': is_italic
            })

    return paragraphs, tables


def table_to_html(rows):
    if not rows:
        return ''

    header = rows[0] if rows else []
    body = rows[1:] if len(rows) > 1 else []

    has_header = False
    if header:
        header_text = ' '.join(header).lower()
        if any(word in header_text for word in ['year', 'result', 'fund', 'dow', 'percent', '%', 'partner', 'performance', 'quarter', 'assets', 'book', 'liabilities']):
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


def para_to_html(paragraphs):
    html_parts = []

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
        r'^(COMPOUNDED)',
        r'^(Investment Companies)',
        r'^(The Ground Rules)',
        r'^(The Joys of Compounding)',
        r'^(Controls)',
        r'^(Generals)',
        r'^(Workouts)',
    ]

    for p in paragraphs:
        text = p['text']
        if len(text) < 3:
            continue

        is_heading = False
        for pat in heading_patterns:
            if re.search(pat, text):
                is_heading = True
                break

        if is_heading and p['bold']:
            html_parts.append('<h2>{}</h2>'.format(text))
        elif is_heading or text.isupper():
            html_parts.append('<h3>{}</h3>'.format(text))
        elif p['bold'] and len(text) < 120:
            html_parts.append('<p><strong>{}</strong></p>'.format(text))
        else:
            html_parts.append('<p>{}</p>'.format(text))

    return '\n'.join(html_parts)


def build_html(paragraphs, tables):
    """Interleave paragraphs and tables. Since we removed all tables from paragraph stream,
    we just output paragraphs and then append tables at appropriate positions.
    But we need to know WHERE tables should go.

    Simple approach: Most tables come after specific headings. We'll output paragraphs,
    and after certain heading markers, insert the next table.
    """
    # Actually let's just append tables after paragraphs for now, since the exact
    # interleaving is hard. Instead, let's identify paragraph blocks where tables
    # belong and insert them there.

    # Better approach: rebuild full HTML by walking original XML structure
    pass


if __name__ == '__main__':
    filepath = r'C:/Users/info/Desktop/巴菲特的信/1962-3.docx'
    paragraphs, tables = parse_docx(filepath)

    print('Paragraphs:', len(paragraphs))
    print('Tables:', len(tables))
    for i, t in enumerate(tables):
        print('Table {}: {} rows x {} cols'.format(i, len(t), len(t[0]) if t else 0))
        for row in t[:3]:
            print('  ', row)
        if len(t) > 3:
            print('  ...')
