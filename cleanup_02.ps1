# ============================================================
# COMPONENT PRUNING SCRIPT — PROMPT 00.5
# Jalankan dengan: .\cleanup_02.ps1
# Dari folder root project: portolioJak\
# ============================================================

Write-Host "`n=== COMPONENT PRUNING — PROMPT 00.5 ===" -ForegroundColor Cyan
Write-Host "Blueprint final: Digital Atelier — No 3D/WebGL, No Preloader, No Typewriter, No FallingSkills" -ForegroundColor Gray

# 1. Hapus komponen heavy 3D — Lanyard (WebGL/Physics)
Write-Host "`n[1] Menghapus Lanyard.tsx (Three.js + Rapier physics, tidak masuk blueprint final)..." -ForegroundColor Yellow
Remove-Item "src\components\Lanyard.tsx" -ErrorAction SilentlyContinue
Write-Host "    Done: Lanyard.tsx dihapus" -ForegroundColor Green

# 2. Hapus komponen WebGL — Aurora
Write-Host "`n[2] Menghapus Aurora.jsx + Aurora.css (OGL WebGL, tidak masuk blueprint final)..." -ForegroundColor Yellow
Remove-Item "src\components\Aurora.jsx" -ErrorAction SilentlyContinue
Remove-Item "src\components\Aurora.css" -ErrorAction SilentlyContinue
Write-Host "    Done: Aurora.jsx + Aurora.css dihapus" -ForegroundColor Green

# 3. Hapus komponen typewriter — TextType
Write-Host "`n[3] Menghapus TextType.jsx + TextType.css (typewriter, tidak masuk blueprint final)..." -ForegroundColor Yellow
Remove-Item "src\components\TextType.jsx" -ErrorAction SilentlyContinue
Remove-Item "src\components\TextType.css" -ErrorAction SilentlyContinue
Write-Host "    Done: TextType.jsx + TextType.css dihapus" -ForegroundColor Green

# 4. Hapus komponen physics skills — FallingSkills
Write-Host "`n[4] Menghapus FallingSkills.tsx (Matter.js physics, diganti Technical Toolkit statis)..." -ForegroundColor Yellow
Remove-Item "src\components\FallingSkills.tsx" -ErrorAction SilentlyContinue
Write-Host "    Done: FallingSkills.tsx dihapus" -ForegroundColor Green

# 5. Hapus komponen preloader
Write-Host "`n[5] Menghapus Preloader.astro (blueprint final tidak memakai preloader)..." -ForegroundColor Yellow
Remove-Item "src\components\common\Preloader.astro" -ErrorAction SilentlyContinue
Write-Host "    Done: Preloader.astro dihapus" -ForegroundColor Green

# 6. Hapus asset lanyard (card.glb, lanyard.png, Jakkob.png copy)
Write-Host "`n[6] Menghapus asset Lanyard (hanya dipakai Lanyard.tsx yang sudah dihapus)..." -ForegroundColor Yellow
Remove-Item "public\assets\lanyard\card.glb" -ErrorAction SilentlyContinue
Remove-Item "public\assets\lanyard\lanyard.png" -ErrorAction SilentlyContinue
# PENTING: Ini adalah copy foto di folder lanyard, BUKAN foto profil utama di /saya/Jakkob.png
Remove-Item "public\assets\lanyard\Jakkob.png" -ErrorAction SilentlyContinue
# Hapus folder lanyard jika sudah kosong
$lanyardDir = "public\assets\lanyard"
if ((Get-ChildItem $lanyardDir -ErrorAction SilentlyContinue | Measure-Object).Count -eq 0) {
    Remove-Item $lanyardDir -ErrorAction SilentlyContinue
    Write-Host "    Done: folder public/assets/lanyard/ kosong, dihapus" -ForegroundColor Green
} else {
    Write-Host "    Done: asset lanyard dihapus (folder masih ada isinya)" -ForegroundColor Green
}

# 7. Sync node_modules dengan package.json yang sudah diupdate
Write-Host "`n[7] Menjalankan npm install untuk sync dependencies..." -ForegroundColor Yellow
npm install
Write-Host "    Done" -ForegroundColor Green

# 8. Validasi build
Write-Host "`n[8] Menjalankan npm run build untuk validasi..." -ForegroundColor Yellow
npm run build

Write-Host "`n=== COMPONENT PRUNING SELESAI ===" -ForegroundColor Cyan
Write-Host "Komponen yang dihapus: Lanyard, Aurora, TextType, FallingSkills, Preloader" -ForegroundColor White
Write-Host "Package yang dihapus: @react-three/*, three, meshline, matter-js, ogl, motion" -ForegroundColor White
