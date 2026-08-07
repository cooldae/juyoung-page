<#
  프로젝트 사진을 웹에 올릴 수 있게 정리합니다.

    1. 폰 스크린샷 양옆(또는 위아래)의 검은 여백을 찾아서 잘라냅니다
    2. 가로 1600px 로 줄입니다
    3. JPEG 품질 84 로 다시 저장합니다
    4. public/projects/<slug>/ 에 01.jpg, 02.jpg ... 순서로 넣습니다

  사용법 — juyoung-page 폴더에서 실행

    powershell -ExecutionPolicy Bypass -File tools/optimize-images.ps1 -Source "C:\Users\HP\Downloads\사진들" -Slug "pado-art-museum"

  옵션
    -StartIndex 3    이미 01, 02 가 있을 때 03 부터 이어서 넣습니다
    -MaxWidth 1920   기본값 1600
    -Quality 90      기본값 84
    -NoCrop          검은 여백 잘라내기를 건너뜁니다
#>

param(
  [Parameter(Mandatory = $true)][string]$Source,
  [Parameter(Mandatory = $true)][string]$Slug,
  [int]$StartIndex = 1,
  [int]$MaxWidth = 1600,
  [int]$Quality = 84,
  [switch]$NoCrop
)

Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"

if (-not (Test-Path $Source)) { throw "원본 폴더가 없습니다: $Source" }

$outDir = Join-Path $PSScriptRoot "..\public\projects\$Slug"
$outDir = [System.IO.Path]::GetFullPath($outDir)
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$files = Get-ChildItem $Source -File |
         Where-Object { $_.Extension -match '^\.(jpg|jpeg|png|webp)$' } |
         Sort-Object Name

if ($files.Count -eq 0) { throw "이미지가 없습니다: $Source" }

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
         Where-Object { $_.MimeType -eq "image/jpeg" }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality, [int64]$Quality)

# 검은 여백 찾기 — 어두운 사진을 잘라내지 않도록 임계값을 낮게 잡습니다
$Threshold = 24
$Step = 4
$Sample = 12

$index = $StartIndex

foreach ($f in $files) {
  $orig = [System.Drawing.Bitmap]::FromFile($f.FullName)
  $w = $orig.Width
  $h = $orig.Height

  $cx = 0; $cy = 0; $cw = $w; $ch = $h

  if (-not $NoCrop) {
    $firstCol = -1; $lastCol = -1
    for ($x = 0; $x -lt $w; $x += $Step) {
      $mx = 0
      for ($y = 0; $y -lt $h; $y += $Sample) {
        $c = $orig.GetPixel($x, $y)
        $v = [Math]::Max([Math]::Max([int]$c.R, [int]$c.G), [int]$c.B)
        if ($v -gt $mx) { $mx = $v }
      }
      if ($mx -gt $Threshold) {
        if ($firstCol -lt 0) { $firstCol = $x }
        $lastCol = $x
      }
    }

    $firstRow = -1; $lastRow = -1
    for ($y = 0; $y -lt $h; $y += $Step) {
      $mx = 0
      for ($x = 0; $x -lt $w; $x += $Sample) {
        $c = $orig.GetPixel($x, $y)
        $v = [Math]::Max([Math]::Max([int]$c.R, [int]$c.G), [int]$c.B)
        if ($v -gt $mx) { $mx = $v }
      }
      if ($mx -gt $Threshold) {
        if ($firstRow -lt 0) { $firstRow = $y }
        $lastRow = $y
      }
    }

    if ($firstCol -ge 0 -and $firstRow -ge 0) {
      $cx = $firstCol
      $cy = $firstRow
      $cw = [Math]::Min($w - $cx, $lastCol - $firstCol + $Step)
      $ch = [Math]::Min($h - $cy, $lastRow - $firstRow + $Step)
    }
  }

  $rect = New-Object System.Drawing.Rectangle($cx, $cy, $cw, $ch)
  $cropped = $orig.Clone($rect, $orig.PixelFormat)
  $orig.Dispose()

  $scale = [Math]::Min(1.0, $MaxWidth / $cropped.Width)
  $nw = [int][Math]::Round($cropped.Width * $scale)
  $nh = [int][Math]::Round($cropped.Height * $scale)

  $dest = New-Object System.Drawing.Bitmap($nw, $nh)
  $g = [System.Drawing.Graphics]::FromImage($dest)
  $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.DrawImage($cropped, 0, 0, $nw, $nh)
  $g.Dispose()

  $name = "{0:D2}.jpg" -f $index
  $outPath = Join-Path $outDir $name
  $dest.Save($outPath, $codec, $encParams)

  $before = $f.Length
  $after = (Get-Item $outPath).Length
  $cropNote = if ($cx -gt 0 -or $cy -gt 0) { " (여백 좌${cx} 상${cy} 잘라냄)" } else { "" }

  "{0,-30} -> {1}  {2}x{3}  {4:N0}KB -> {5:N0}KB{6}" -f `
    $f.Name, $name, $nw, $nh, ($before/1KB), ($after/1KB), $cropNote

  $cropped.Dispose()
  $dest.Dispose()
  $index++
}

""
"저장 위치: $outDir"
""
"이제 src/data/projects.ts 의 `"$Slug`" 프로젝트에 아래처럼 적으세요."
$list = (($StartIndex)..($index-1) | ForEach-Object { '"{0:D2}.jpg"' -f $_ }) -join ", "
"  images: [$list],"
