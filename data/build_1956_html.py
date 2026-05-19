import zipfile
import xml.etree.ElementTree as ET

with zipfile.ZipFile('C:/Users/info/Desktop/1956.docx', 'r') as z:
    xml = z.read('word/document.xml').decode('utf-8')
    tree = ET.fromstring(xml)
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    texts = []
    for p in tree.findall('.//w:p', ns):
        ptext = ''
        for t in p.findall('.//w:t', ns):
            if t.text:
                ptext += t.text
        texts.append(ptext)

html = '''<h1>CERTIFICATE OF LIMITED PARTNERSHIP</h1>

<p>The undersigned hereby certify that they have this day entered into a limited partnership, and that:</p>

<h2>I. Partnership Name</h2>
<p>The name of the partnership is: <strong>BUFFETT ASSOCIATES, LTD.</strong></p>

<h2>II. Business Character</h2>
<p>The character of the business to be carried on shall consist of the buying and selling, for the account of the partnership, of stocks, bonds, securities, commodities, and other investment assets.</p>

<h2>III. Principal Place of Business</h2>
<p>The location of the principal place of business shall be <strong>Omaha, Douglas County, Nebraska</strong>.</p>

<h2>IV. General Partner</h2>
<p>The General Partner is:</p>
<p><strong>Warren E. Buffett</strong><br>Omaha, Nebraska</p>

<h2>V. Limited Partners</h2>
<p>The Limited Partners are:</p>
<table>
<thead>
<tr><th>Limited Partner</th><th>Contributed Capital</th><th>Profit Share</th></tr>
</thead>
<tbody>
<tr><td>Charles E. Peterson, Jr.</td><td>$5,000.00</td><td>1/42</td></tr>
<tr><td>Elisabeth B. Peterson</td><td>$25,000.00</td><td>5/42</td></tr>
<tr><td>Doris B. Wood</td><td>$5,000.00</td><td>1/42</td></tr>
<tr><td>Truman S. Wood</td><td>$5,000.00</td><td>1/42</td></tr>
<tr><td>Daniel J. Monen, Jr.</td><td>$5,000.00</td><td>1/42</td></tr>
<tr><td>William H. Thompson</td><td>$25,000.00</td><td>5/42</td></tr>
<tr><td>Alice R. Buffett</td><td>$35,000.00</td><td>7/42</td></tr>
</tbody>
</table>

<p><strong>Total Capital Contributed: $105,000.00</strong></p>

<h2>VI. No Additional Contributions</h2>
<p>The limited partners have not agreed to make any additional contributions.</p>

<h2>VII. No Demand for Return of Contribution</h2>
<p>No time has been agreed upon, short of the terminating date of the partnership or the withdrawal of a limited partner from the partnership, when the contribution of a limited partner is to be returned to him.</p>

<h2>VIII. Profit Distribution</h2>
<p>The share of the profits or other compensation by way of income which each limited partner shall receive by reason of his contribution is set forth above in Article V.</p>

<h2>IX. No Substitution of Assignees</h2>
<p>A limited partner has no right to substitute an assignee as contributor in his place.</p>

<h2>X. No Additional Limited Partners</h2>
<p>No right is given the partners to admit additional limited partners.</p>

<h2>XI. No Priority Among Limited Partners</h2>
<p>There is no priority among limited partners.</p>

<h2>XII. No Right to Continue on Death or Retirement</h2>
<p>No right is given the remaining partners to continue the partnership business on the death, retirement or insanity of the general partner.</p>

<h2>XIII. Return in Cash Only</h2>
<p>No right is given a limited partner to demand and receive property other than cash in return for his contribution.</p>

<h2>XIV. Execution</h2>
<p>Dated this <strong>1st day of May, 1956</strong>.</p>

<h3>Signatories</h3>
<table>
<thead>
<tr><th>Signatory</th><th>Role</th></tr>
</thead>
<tbody>
<tr><td>Warren E. Buffett</td><td>General Partner</td></tr>
<tr><td>Charles E. Peterson, Jr.</td><td>Limited Partner</td></tr>
<tr><td>Elisabeth B. Peterson</td><td>Limited Partner</td></tr>
<tr><td>Doris B. Wood</td><td>Limited Partner</td></tr>
<tr><td>Truman S. Wood</td><td>Limited Partner</td></tr>
<tr><td>Daniel J. Monen, Jr.</td><td>Limited Partner</td></tr>
<tr><td>William H. Thompson</td><td>Limited Partner</td></tr>
<tr><td>Alice R. Buffett</td><td>Limited Partner</td></tr>
</tbody>
</table>

<hr>

<h3>About the Partners</h3>
<p>The following provides context on the relationships between Warren Buffett and the limited partners of Buffett Associates, Ltd.:</p>

<ul>
<li><strong>Charles E. Peterson, Jr.</strong> &mdash; Warren Buffett's roommate at the Wharton School of the University of Pennsylvania, and also his neighbor in Omaha.</li>
<li><strong>Elisabeth B. Peterson</strong> &mdash; Mother of Charles E. Peterson, Jr.</li>
<li><strong>Doris B. Wood</strong> &mdash; Warren Buffett's older sister.</li>
<li><strong>Truman S. Wood</strong> &mdash; Warren Buffett's brother-in-law (husband of Doris Wood).</li>
<li><strong>Daniel J. Monen, Jr.</strong> &mdash; Warren Buffett's childhood friend; an attorney by profession.</li>
<li><strong>William H. Thompson</strong> &mdash; Warren Buffett's father-in-law.</li>
<li><strong>Alice R. Buffett</strong> &mdash; Warren Buffett's paternal aunt.</li>
</ul>

<blockquote>
<p>This partnership agreement established the foundation for what would become one of the most successful investment partnerships in history. Over the next thirteen years, Buffett Associates, Ltd. would achieve extraordinary returns, laying the groundwork for the eventual formation of Berkshire Hathaway.</p>
</blockquote>
'''

with open('1956_fulltext.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Done:', len(html), 'chars')
