# ============================================================
# PORTFOLIO CLEANUP SCRIPT
# Jalankan dengan: .\cleanup.ps1
# Dari folder root project: portolioJak\
# ============================================================

Write-Host "`n=== PORTFOLIO PROJECT CLEANUP ===" -ForegroundColor Cyan

# 1. Hapus file template bawaan Astro yang tidak digunakan
Write-Host "`n[1] Menghapus file template Astro bawaan..." -ForegroundColor Yellow
Remove-Item "src\components\Welcome.astro" -ErrorAction SilentlyContinue
Remove-Item "src\assets\astro.svg" -ErrorAction SilentlyContinue
Remove-Item "src\assets\background.svg" -ErrorAction SilentlyContinue
Write-Host "    Done: Welcome.astro, astro.svg, background.svg dihapus" -ForegroundColor Green

# 2. Hapus komponen duplikat/tidak terpakai
Write-Host "`n[2] Menghapus komponen yang tidak digunakan..." -ForegroundColor Yellow
# profilecard.tsx di /ui/ adalah file lama dengan import next/image & next/link (BUKAN aktif dipakai)
# Yang aktif dipakai adalah /components/ProfileCard.tsx
Remove-Item "src\components\ui\profilecard.tsx" -ErrorAction SilentlyContinue
# card.tsx tidak ada yang mengimportnya
Remove-Item "src\components\ui\card.tsx" -ErrorAction SilentlyContinue
Write-Host "    Done: ui/profilecard.tsx (duplikat lama), ui/card.tsx (tidak dipakai) dihapus" -ForegroundColor Green

# 3. Hapus script utility yang tidak relevan
Write-Host "`n[3] Menghapus script utility lama..." -ForegroundColor Yellow
Remove-Item "check_icons.mjs" -ErrorAction SilentlyContinue
Remove-Item "check_icons_safe.mjs" -ErrorAction SilentlyContinue
Write-Host "    Done: check_icons.mjs, check_icons_safe.mjs dihapus" -ForegroundColor Green

# 4. Hapus asset duplikat/tidak terpakai
Write-Host "`n[4] Menghapus asset duplikat dan tidak terpakai..." -ForegroundColor Yellow
# github.png adalah duplikat dari github.svg (yang dipakai hanya .svg)
Remove-Item "public\icons\tools\github.png" -ErrorAction SilentlyContinue
# antigravity.svg = 2.4MB, tidak ada reference di source code sama sekali
Remove-Item "public\icons\tools\antigravity.svg" -ErrorAction SilentlyContinue
Write-Host "    Done: tools/github.png (duplikat), tools/antigravity.svg (unreferenced 2.4MB) dihapus" -ForegroundColor Green

# 5. Sync node_modules dengan package.json yang sudah diupdate
Write-Host "`n[5] Menjalankan npm install untuk sync dependencies..." -ForegroundColor Yellow
npm install
Write-Host "    Done: node_modules disync" -ForegroundColor Green

# 6. Validasi build
Write-Host "`n[6] Menjalankan npm run build untuk validasi..." -ForegroundColor Yellow
npm run build

Write-Host "`n=== CLEANUP SELESAI ===" -ForegroundColor Cyan
Write-Host "Lihat laporan cleanup di laporan_cleanup.md" -ForegroundColor White
