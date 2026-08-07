<#
  작업 폴더를 정리하고 폴더 이름 뒤에 현재 개수를 붙입니다.

    프로젝트폴더 [업로드된 이미지 수, 업로드된 영상 수, 미업로드 영상 수]

  각 프로젝트 폴더 안 구성

    사진 업로드      사이트에 올라간 사진 (1600px 이하로 줄인 것)
    사진 미업로드    아직 안 올린 사진
    사진 원본        원본 고화질
    영상 업로드      유튜브에 올린 영상
    영상 미업로드    아직 안 올린 영상

  하는 일

    1. 폴더 최상위에 새로 넣은 파일을 알맞은 곳으로 보냅니다
       - 사진은 줄여서 [사진 업로드] 에, 원본은 [사진 원본] 에
       - 영상은 [영상 미업로드] 에
    2. project_<slug>_<번호> 형식이 아닌 파일 이름을 바꿉니다
       (이미 번호가 붙은 파일은 건드리지 않습니다 — 유튜브 링크와 어긋나면 안 되므로)
    3. [사진 업로드] 내용을 사이트 public/projects/<slug>/ 에 반영합니다
    4. 폴더 이름의 개수를 갱신합니다

  ▼ 사용법

    powershell -ExecutionPolicy Bypass -File tools/sync-folder-names.ps1

    유튜브에 영상을 올린 뒤에는 그 파일을 [영상 미업로드] 에서 [영상 업로드] 로
    옮기고 다시 실행하면 폴더 이름의 숫자가 갱신됩니다.

  ▼ 옵션
    -WhatIf   실제로 바꾸지 않고 무엇을 할지만 보여줍니다
#>

param(
  [string]$Root = "C:\Users\HP\Desktop\주영 작업",
  [string]$Site = "C:\Users\HP\Desktop\juyoung-web\juyoung-page\public\projects",
  [switch]$WhatIf
)

Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = "Stop"

# 손대지 않을 폴더
$SKIP = @("건드리지마시오", "키키키런")

# 폴더 이름(개수 표시를 뗀 것) -> 사이트 프로젝트 slug
$MAP = @{
  "파타야"                              = "pado-art-museum"
  "충남도청 AR 내비게이션"               = "chungnam-ar-navigation"
  "알파벳어드벤쳐"                       = "color2life-alphabet"
  "터치디자이너 유니티 AI 그림"           = "ai-live-drawing"
  "컬러투라이프-CES"                     = "ces-3d-livesketch"
  "AI미디어아트-CES [2]"                = "ces-ai-media-art"
  "국가유산진흥원 제주도 디지털북"        = "jeju-tablet-app"
  "국가유산진흥원 궁중음식"               = "royal-cuisine-minigame"
  "라이브스케치 3D"                      = "livesketch-tablet-3d"
  "라이브스케치 2D"                      = "livesketch-tablet-2d"
  "독도 벽면 인터렉티브 (제주)"           = "jeju-dokdo-center"
  "인터_주차센서"                        = "parking-sensor-protocol"
  "문자박물관 AR 가이드"                 = "world-script-museum-ar"
  "부평역사박물관 AR"                    = "museum-ar-content"
  "소켓 다트 게임"                       = "gangneung-dart-game"
  "국립해양박물관 조개 인터렉션 (부산)"   = "busan-maritime-museum"
  "AR 전망경"                           = "dmz-ar-telescope"
  "컬러투라이프 강릉"                    = "color2life-gangneung"
  "컬러투라이프 함안[2]"                 = "color2life-haman"
  "소래역사관 [2]"                       = "sorae-interactive"
}

$IMG_UP = "사진 업로드"; $IMG_NOUP = "사진 미업로드"; $IMG_ORIG = "사진 원본"

# 영상은 3단계 — 아직 안 올림 / 유튜브에만 올림 / 페이지에도 넣음
$VID_NOUP = "영상 미업로드"
$VID_YT   = "유튜브 업로드 완료"
$VID_PAGE = "페이지 업로드 완료"
$VID_OLD  = @("영상", "영상 업로드")   # 예전 이름들

$IMG_EXT = '^\.(png|jpg|jpeg|webp)$'
$VID_EXT = '^\.(mp4|mov|avi|mkv|m4v|webm)$'

$MaxWidth = 1600
$MaxBytes = 500KB

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
         Where-Object { $_.MimeType -eq "image/jpeg" }

function Save-Jpeg($bmp, $path, $q) {
  $e = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $e.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int64]$q)
  $bmp.Save($path, $codec, $e)
}

function Optimize-Image([string]$in, [string]$out) {
  $orig = [System.Drawing.Bitmap]::FromFile($in)
  $w = $orig.Width; $h = $orig.Height
  $cx = 0; $cy = 0; $cw = $w; $ch = $h
  $th = 24; $st = 4; $sm = 12

  $fc = -1; $lc = -1
  for ($x = 0; $x -lt $w; $x += $st) {
    $mx = 0
    for ($y = 0; $y -lt $h; $y += $sm) {
      $c = $orig.GetPixel($x, $y)
      $v = [Math]::Max([Math]::Max([int]$c.R, [int]$c.G), [int]$c.B)
      if ($v -gt $mx) { $mx = $v }
    }
    if ($mx -gt $th) { if ($fc -lt 0) { $fc = $x }; $lc = $x }
  }
  $fr = -1; $lr = -1
  for ($y = 0; $y -lt $h; $y += $st) {
    $mx = 0
    for ($x = 0; $x -lt $w; $x += $sm) {
      $c = $orig.GetPixel($x, $y)
      $v = [Math]::Max([Math]::Max([int]$c.R, [int]$c.G), [int]$c.B)
      if ($v -gt $mx) { $mx = $v }
    }
    if ($mx -gt $th) { if ($fr -lt 0) { $fr = $y }; $lr = $y }
  }
  if ($fc -ge 0 -and $fr -ge 0) {
    $cx = $fc; $cy = $fr
    $cw = [Math]::Min($w - $cx, $lc - $fc + $st)
    $ch = [Math]::Min($h - $cy, $lr - $fr + $st)
  }

  $rect = New-Object System.Drawing.Rectangle($cx, $cy, $cw, $ch)
  $crop = $orig.Clone($rect, $orig.PixelFormat)
  $orig.Dispose()

  $scale = [Math]::Min(1.0, $MaxWidth / $crop.Width)
  $nw = [int][Math]::Round($crop.Width * $scale)
  $nh = [int][Math]::Round($crop.Height * $scale)

  $dest = New-Object System.Drawing.Bitmap($nw, $nh)
  $g = [System.Drawing.Graphics]::FromImage($dest)
  $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.DrawImage($crop, 0, 0, $nw, $nh)
  $g.Dispose()
  $crop.Dispose()

  # 500KB 를 넘으면 품질을 낮춰 다시 저장합니다
  $q = 88
  Save-Jpeg $dest $out $q
  while ((Get-Item -LiteralPath $out).Length -gt $MaxBytes -and $q -gt 55) {
    $q -= 8
    Save-Jpeg $dest $out $q
  }
  $size = (Get-Item -LiteralPath $out).Length
  $dest.Dispose()
  return [pscustomobject]@{ W = $nw; H = $nh; Bytes = $size; Q = $q }
}

function Get-BaseName([string]$name) {
  # 이름 끝의 " [숫자, 숫자, ...]" 만 떼어냅니다. 기존 " [2]" 같은 표시는 남깁니다.
  return ($name -replace '\s*\[\d+(?:,\s*\d+)+\]\s*$', '')
}

# 데이터 파일의 주석에서 "페이지에 올라간 영상 파일" 목록을 읽습니다.
#   youtube: [
#     // project_pado-art-museum_3.mp4     ← 이 줄
#     { url: "...", label: "..." },
function Get-OnPageVideos([string]$dataFile) {
  $set = New-Object 'System.Collections.Generic.HashSet[string]'
  if (-not (Test-Path -LiteralPath $dataFile)) { return $set }
  foreach ($m in [regex]::Matches((Get-Content -LiteralPath $dataFile -Raw), '//\s*(project_[\w\-]+_\d+\.\w+)')) {
    [void]$set.Add($m.Groups[1].Value)
  }
  return $set
}

function Ensure-Dir([string]$p) {
  if (-not (Test-Path -LiteralPath $p)) { if (-not $WhatIf) { New-Item -ItemType Directory -Path $p | Out-Null } }
}

function Files-In([string]$dir, [string]$pattern) {
  if (-not (Test-Path -LiteralPath $dir)) { return @() }
  return @(Get-ChildItem -LiteralPath $dir -File | Where-Object { $_.Extension -match $pattern } | Sort-Object Name)
}

# 이미 붙은 번호 중 가장 큰 값을 찾습니다 (번호는 절대 다시 매기지 않습니다)
function Next-Index([string]$slug, [string[]]$dirs) {
  $max = 0
  foreach ($d in $dirs) {
    foreach ($f in (Files-In $d '.*')) {
      $m = [regex]::Match($f.Name, ('^project_' + [regex]::Escape($slug) + '_(\d+)\.'))
      if ($m.Success) { $n = [int]$m.Groups[1].Value; if ($n -gt $max) { $max = $n } }
    }
  }
  return $max + 1
}

if (-not (Test-Path -LiteralPath $Root)) { throw "폴더가 없습니다: $Root" }

# 페이지에 링크가 들어간 영상 파일 목록
$dataFile = Join-Path (Split-Path (Split-Path $Site -Parent) -Parent) "src\data\projects.ts"
$onPage = Get-OnPageVideos $dataFile
"데이터 파일에서 페이지 등록 영상 $($onPage.Count) 개 확인"

$rows = @()
$unmapped = @()

foreach ($d in (Get-ChildItem -LiteralPath $Root -Directory | Sort-Object Name)) {
  $base = Get-BaseName $d.Name
  if ($SKIP -contains $base) { continue }

  $slug = $MAP[$base]
  if (-not $slug) { $unmapped += $base; continue }

  $dir = $d.FullName
  foreach ($s in @($IMG_UP, $IMG_NOUP, $IMG_ORIG, $VID_NOUP, $VID_YT, $VID_PAGE)) { Ensure-Dir (Join-Path $dir $s) }

  $pUp = Join-Path $dir $IMG_UP; $pOrig = Join-Path $dir $IMG_ORIG
  $vNo = Join-Path $dir $VID_NOUP; $vYt = Join-Path $dir $VID_YT; $vPg = Join-Path $dir $VID_PAGE

  # 1) 예전 폴더 이름 흡수
  #    [영상] 은 아직 안 올린 것, [영상 업로드] 는 이미 페이지에 넣은 것이었습니다
  foreach ($oldName in $VID_OLD) {
    $old = Join-Path $dir $oldName
    if (-not (Test-Path -LiteralPath $old)) { continue }
    $target = if ($oldName -eq "영상 업로드") { $vPg } else { $vNo }
    foreach ($f in (Get-ChildItem -LiteralPath $old -File)) {
      if (-not $WhatIf) { Move-Item -LiteralPath $f.FullName -Destination (Join-Path $target $f.Name) -Force }
      "  [$base] '$oldName' → '$(Split-Path $target -Leaf)' : $($f.Name)"
    }
    if (-not $WhatIf -and @(Get-ChildItem -LiteralPath $old -Force).Count -eq 0) { Remove-Item -LiteralPath $old -Force }
  }

  # 2) 최상위에 새로 넣은 영상 → 영상 미업로드
  foreach ($f in (Files-In $dir $VID_EXT)) {
    if (-not $WhatIf) { Move-Item -LiteralPath $f.FullName -Destination (Join-Path $vNo $f.Name) -Force }
    "  [$base] 새 영상 → '$VID_NOUP' : $($f.Name)"
  }

  # 3) 최상위에 새로 넣은 사진 → 줄여서 사진 업로드, 원본은 사진 원본
  $iNext = Next-Index $slug @($pUp)
  foreach ($f in (Files-In $dir $IMG_EXT)) {
    $newName = "project_{0}_{1}.jpg" -f $slug, $iNext
    if (-not $WhatIf) {
      $r = Optimize-Image $f.FullName (Join-Path $pUp $newName)
      Move-Item -LiteralPath $f.FullName -Destination (Join-Path $pOrig $f.Name) -Force
      "  [$base] 새 사진 → $newName  $($r.W)x$($r.H)  $([math]::Round($f.Length/1KB))KB → $([math]::Round($r.Bytes/1KB))KB"
    } else {
      "  [$base] 새 사진 → $newName (예정)"
    }
    $iNext++
  }

  # 4) 번호가 안 붙은 영상 이름 정리 (이미 붙은 것은 그대로 둡니다)
  $vNext = Next-Index $slug @($vNo, $vYt, $vPg)
  foreach ($dirV in @($vNo, $vYt, $vPg)) {
    foreach ($f in (Files-In $dirV $VID_EXT)) {
      if ($f.Name -match ('^project_' + [regex]::Escape($slug) + '_\d+\.')) { continue }
      $newName = "project_{0}_{1}{2}" -f $slug, $vNext, $f.Extension.ToLower()
      if (-not $WhatIf) { Rename-Item -LiteralPath $f.FullName -NewName $newName }
      "  [$base] 영상 이름 : $($f.Name) → $newName"
      $vNext++
    }
  }

  # 4-2) 데이터 파일에 링크가 들어간 영상은 [페이지 업로드 완료] 로 옮깁니다
  foreach ($dirV in @($vNo, $vYt)) {
    foreach ($f in (Files-In $dirV $VID_EXT)) {
      if (-not $onPage.Contains($f.Name)) { continue }
      if (-not $WhatIf) { Move-Item -LiteralPath $f.FullName -Destination (Join-Path $vPg $f.Name) -Force }
      "  [$base] 페이지에 등록됨 → '$VID_PAGE' : $($f.Name)"
    }
  }

  # 5) 사이트에 반영
  $imgs = Files-In $pUp $IMG_EXT
  if ($imgs.Count -gt 0 -and -not $WhatIf) {
    $siteDir = Join-Path $Site $slug
    Ensure-Dir $siteDir
    Get-ChildItem -LiteralPath $siteDir -File | Remove-Item -Force
    foreach ($f in $imgs) { Copy-Item -LiteralPath $f.FullName -Destination (Join-Path $siteDir $f.Name) -Force }
  }

  $imgUp  = $imgs.Count
  $vidPg  = (Files-In $vPg $VID_EXT).Count
  $vidYt  = (Files-In $vYt $VID_EXT).Count
  $vidNo  = (Files-In $vNo $VID_EXT).Count

  # [이미지, 페이지 완료, 유튜브만 완료, 미업로드]
  $newFolder = "{0} [{1}, {2}, {3}, {4}]" -f $base, $imgUp, $vidPg, $vidYt, $vidNo
  if ($d.Name -ne $newFolder -and -not $WhatIf) {
    # 탐색기나 백신이 폴더를 잠깐 잡고 있으면 이름 변경이 거부됩니다. 몇 번 다시 시도합니다.
    $renamed = $false
    for ($try = 1; $try -le 4; $try++) {
      try {
        Rename-Item -LiteralPath $dir -NewName $newFolder -ErrorAction Stop
        $renamed = $true
        break
      } catch {
        [System.GC]::Collect()
        Start-Sleep -Milliseconds 600
      }
    }
    if (-not $renamed) {
      "  ⚠ [$base] 폴더 이름을 못 바꿨습니다 (다른 프로그램이 사용 중). 탐색기를 닫고 다시 실행하세요."
      $newFolder = $d.Name
    }
  }

  $rows += [pscustomobject]@{ 폴더 = $newFolder; 이미지 = $imgUp; 페이지완료 = $vidPg; 유튜브만 = $vidYt; 미업로드 = $vidNo }
}

""
$rows | Format-Table -AutoSize
"합계 — 이미지 {0}장 / 페이지 완료 {1}개 / 유튜브만 {2}개 / 미업로드 {3}개" -f `
  ($rows | Measure-Object 이미지 -Sum).Sum, ($rows | Measure-Object 페이지완료 -Sum).Sum,
  ($rows | Measure-Object 유튜브만 -Sum).Sum, ($rows | Measure-Object 미업로드 -Sum).Sum
""
"손대지 않은 폴더: $($SKIP -join ', ')"
if ($unmapped.Count) { "⚠ 매핑 없는 폴더 (이 스크립트 위쪽 `$MAP 에 추가하세요): $($unmapped -join ', ')" }
if ($WhatIf) { "`n※ -WhatIf 라서 실제로는 아무것도 바꾸지 않았습니다." }
