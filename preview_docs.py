import zipfile
import os
import re

files = [
    'C:/Users/info/Desktop/巴菲特的信/1961.docx',
    'C:/Users/info/Desktop/巴菲特的信/1962.docx',
    'C:/Users/info/Desktop/巴菲特的信/1962-2.docx'
]

for f in files:
    name = os.path.basename(f).replace('.docx', '')
    with zipfile.ZipFile(f, 'r') as z:
        content = z.read('word/document.xml').decode('utf-8')
        print('=== ' + name + '.docx ===')
        print('Size: ' + str(len(content)) + ' bytes')
        texts = re.findall('<w:t[^>]*>([^<]+)</w:t>', content[:8000])
        preview = ' | '.join(texts[:25])
        print('Preview: ' + preview)
        print()
