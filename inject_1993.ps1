# inject_1993.ps1
# 使用 PowerShell 可靠地注入 1993 条目

$base = Get-Location -Path "."
$interpPath = Join-Path $base "interp_1993.ts"
$targetPath = Join-Path $base "data\interpretations.ts"

Write-Host "读取 interp_1993.ts ..."
$interp = Get-Content $interpPath -Raw -Encoding UTF8
Write-Host "文件长度: $($interp.Length) 字符"

Write-Host "`n读取 interpretations.ts ..."
$target = Get-Content $targetPath -Raw -Encoding UTF8
Write-Host "文件长度: $($target.Length) 字符"

# 提取对象（从 { 开始，括号计数找到匹配的 }）
Write-Host "`n提取 1993 对象 ..."
$marker = "export const interpretation1993 = {"
$smIdx = $interp.IndexOf($marker)
if ($smIdx -eq -1) {
    Write-Error "找不到 export const interpretation1993 = {"
    exit 1
}

$start = $smIdx + $marker.Length - 1  # 指向第一个 {
Write-Host "对象起始位置: $start"

# 括号计数
$braceCount = 1
$pos = $start + 1
$foundEnd = $false
while ($pos -lt $interp.Length -and -not $foundEnd) {
    $ch = $interp[$pos]
    if ($ch -eq '`' -and $pos -lt $interp.Length - 1) {
        $pos += 2
        continue
    }
    if ($ch -eq '"' -or $ch -eq "'") {
        $q = $ch
        $pos += 1
        while ($pos -lt $interp.Length -and $interp[$pos] -ne $q) {
            if ($interp[$pos] -eq '`' -and $pos -lt $interp.Length - 1) { $pos += 2 } else { $pos += 1 }
        }
        $pos += 1
        continue
    }
    if ($ch -eq '`') {
        $pos += 1
        while ($pos -lt $interp.Length -and $interp[$pos] -ne '`') {
            if ($interp[$pos] -eq '`' -and $pos -lt $interp.Length - 1) { $pos += 2 } else { $pos += 1 }
        }
        $pos += 1
        continue
    }
    if ($ch -eq '{') { $braceCount++ }
    if ($ch -eq '}') {
        $braceCount--
        if ($braceCount -eq 0) {
            $foundEnd = $true
            $endPos = $pos
        }
    }
    $pos += 1
}

if (-not $foundEnd) {
    Write-Error "找不到匹配的大括号"
    exit 1
}

$obj = $interp.Substring($start, $endPos - $start + 1)
Write-Host "提取对象长度: $($obj.Length) 字符"
Write-Host "前 80 字符: $($obj.Substring(0, [Math]::Min(80, $obj.Length)))"
Write-Host "后 80 字符: $($obj.Substring([Math]::Max(0, $obj.Length-80)))"

# 添加缩进和键名
$objLines = $obj -split "`n"
$indentedLines = @()
for ($j = 0; $j -lt $objLines.Count; $j++) {
    if ($j -eq 0) {
        $indentedLines += "    '1993-berkshire-letter': " + $objLines[$j]
    } else {
        $indentedLines += "    " + $objLines[$j]
    }
}
$indented = $indentedLines -join "`n"
Write-Host "`n缩进后长度: $($indented.Length) 字符"

# 找插入点
Write-Host "`n找插入点 ..."
$pattern = "  },`n`n  '1994-berkshire-letter': {"
$pIdx = $target.IndexOf($pattern)
if ($pIdx -eq -1) {
    Write-Error "找不到插入点（1992/1994 边界）"
    # 尝试替代格式
    $pattern2 = "  }`n`n  '1994-berkshire-letter': {"
    $pIdx = $target.IndexOf($pattern2)
    if ($pIdx -eq -1) {
        Write-Error "替代格式也找不到"
        exit 1
    }
}

$insertPos = $pIdx + $pattern.Length - "`n`n  '1994-berkshire-letter': {".Length
Write-Host "插入位置: $insertPos"

# 构建新内容
$before = $target.Substring(0, $insertPos)
$after = $target.Substring($insertPos)
$newContent = $before + "," + "`n`n" + $indented + "," + "`n`n" + $after

# 备份
$backupPath = $targetPath + ".backup_" + [DateTimeOffset]::Now.ToUnixTimeSeconds()
Copy-Item $targetPath $backupPath
Write-Host "`n备份: $backupPath"

# 写入
Write-Host "`n写入文件 ..."
Set-Content -Path $targetPath -Value $newContent -Encoding UTF8
Write-Host "完成！新文件长度: $($newContent.Length) 字符"
