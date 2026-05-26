// inject_1993_final.js
// 最可靠的行级插入脚本

const fs = require('fs');
const path = require('path');

const INTERP_FILE = path.join(__dirname, 'interp_1993.ts');
const TARGET_FILE = path.join(__dirname, 'data', 'interpretations.ts');

console.log('读取 interp_1993.ts ...');
const interpRaw = fs.readFileSync(INTERP_FILE, 'utf8');

console.log('提取 1993 对象（括号计数）...');
// 找到 export const interpretation1993 = { 的位置
const marker = 'export const interpretation1993 = {';
const smIdx = interpRaw.indexOf(marker);
if (smIdx === -1) {
  console.error('找不到 "export const interpretation1993 = {"');
  process.exit(1);
}

// 从 { 开始，数大括号找到匹配的 }
let braceCount = 1;
let objStart = smIdx + marker.length - 1; // 指向 {
let objEnd = -1;

for (let i = objStart + 1; i < interpRaw.length; i++) {
  const ch = interpRaw[i];
  
  if (ch === '\\') { i++; continue; }
  if (ch === "'" || ch === '"') {
    const q = ch;
    i++;
    while (i < interpRaw.length && interpRaw[i] !== q) {
      if (interpRaw[i] === '\\') i++;
      i++;
    }
    i++; // skip closing quote
    continue;
  }
  if (ch === '`') {
    i++;
    while (i < interpRaw.length && interpRaw[i] !== '`') {
      if (interpRaw[i] === '\\') i++;
      i++;
    }
    i++; // skip closing backtick
    continue;
  }
  if (ch === '{') braceCount++;
  if (ch === '}') {
    braceCount--;
    if (braceCount === 0) {
      objEnd = i;
      break;
    }
  }
}

if (objEnd === -1) {
  console.error('找不到匹配的大括号！braceCount=' + braceCount);
  process.exit(1);
}

const objContent = interpRaw.slice(objStart, objEnd + 1);
console.log('提取对象长度：' + objContent.length + ' 字符');

// 添加缩进（4空格）和键名
const objLines = objContent.split('\n');
const indentedLines = [];
for (let j = 0; j < objLines.length; j++) {
  if (j === 0) {
    indentedLines.push("    '1993-berkshire-letter': " + objLines[j]);
  } else {
    indentedLines.push('    ' + objLines[j]);
  }
}
const indentedBlock = indentedLines.join('\n');
console.log('缩进后长度：' + indentedBlock.length + ' 字符');

// 读取 target 文件
console.log('读取 interpretations.ts ...');
const targetRaw = fs.readFileSync(TARGET_FILE, 'utf8');
const targetLines = targetRaw.split('\n');
console.log('interpretations.ts: ' + targetLines.length + ' 行');

// 找 1994 条目的起始行号
let insertLineNum = -1;
for (let i = 0; i < targetLines.length; i++) {
  if (targetLines[i].includes("'1994-berkshire-letter':")) {
    insertLineNum = i;
    break;
  }
}

if (insertLineNum === -1) {
  console.error('找不到 1994 条目起始行！');
  process.exit(1);
}

console.log('插入位置：第 ' + (insertLineNum + 1) + ' 行（1-based）');
console.log('该行内容：' + targetLines[insertLineNum]);

// 在 insertLineNum 之前插入 1993 条目内容
// 需要先找 1992 条目的结束位置（前一个条目的 },）
// 但为了简单，直接在第 insertLineNum 行之前插入

const newLines = [
  ...targetLines.slice(0, insertLineNum),
  indentedBlock,
  '  },',
  '',
  ...targetLines.slice(insertLineNum)
];

console.log('新文件行数：' + newLines.length + '（原来 ' + targetLines.length + '）');

// 备份
const backupPath = TARGET_FILE + '.backup_' + Date.now();
fs.copyFileSync(TARGET_FILE, backupPath);
console.log('备份：' + backupPath);

// 写入
const newContent = newLines.join('\n');
fs.writeFileSync(TARGET_FILE, newContent, 'utf8');
console.log('注入完成！');
console.log('新文件大小：' + newContent.length + ' 字符');
