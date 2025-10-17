# SlayerForge Quick Deployment Script

Write-Host "🚀 SlayerForge Deployment Helper" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path ".\backend") -or -not (Test-Path ".\frontend")) {
    Write-Host "❌ Error: Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}

# Function to generate random secret
function Generate-Secret {
    $bytes = New-Object byte[] 32
    [Security.Cryptography.RNGCryptoServiceProvider]::Create().GetBytes($bytes)
    return [Convert]::ToBase64String($bytes)
}

Write-Host "📝 Step 1: Generate Security Keys" -ForegroundColor Yellow
Write-Host "Copy these keys for Railway environment variables:" -ForegroundColor Gray
Write-Host ""
Write-Host "APP_KEYS=" -NoNewline; Write-Host "$(Generate-Secret),$(Generate-Secret)" -ForegroundColor Green
Write-Host "API_TOKEN_SALT=" -NoNewline; Write-Host "$(Generate-Secret)" -ForegroundColor Green
Write-Host "ADMIN_JWT_SECRET=" -NoNewline; Write-Host "$(Generate-Secret)" -ForegroundColor Green
Write-Host "TRANSFER_TOKEN_SALT=" -NoNewline; Write-Host "$(Generate-Secret)" -ForegroundColor Green
Write-Host "JWT_SECRET=" -NoNewline; Write-Host "$(Generate-Secret)" -ForegroundColor Green
Write-Host ""

Write-Host "📦 Step 2: Check Git Status" -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "⚠️  You have uncommitted changes:" -ForegroundColor Yellow
    git status -s
    Write-Host ""
    $commit = Read-Host "Would you like to commit these changes? (y/n)"
    if ($commit -eq 'y') {
        $message = Read-Host "Enter commit message"
        git add .
        git commit -m "$message"
        Write-Host "✅ Changes committed" -ForegroundColor Green
    }
} else {
    Write-Host "✅ Git working directory is clean" -ForegroundColor Green
}
Write-Host ""

Write-Host "🔄 Step 3: Push to GitHub" -ForegroundColor Yellow
$branch = git branch --show-current
Write-Host "Current branch: $branch" -ForegroundColor Gray
$push = Read-Host "Push to GitHub? (y/n)"
if ($push -eq 'y') {
    git push origin $branch
    Write-Host "✅ Pushed to GitHub" -ForegroundColor Green
} else {
    Write-Host "⚠️  Skipped push" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "📋 Step 4: Deployment Checklist" -ForegroundColor Yellow
Write-Host ""
Write-Host "Backend (Railway):" -ForegroundColor Cyan
Write-Host "  1. Sign up: https://railway.app" -ForegroundColor Gray
Write-Host "  2. New Project → Deploy from GitHub" -ForegroundColor Gray
Write-Host "  3. Select repository and 'backend' folder" -ForegroundColor Gray
Write-Host "  4. Add PostgreSQL database" -ForegroundColor Gray
Write-Host "  5. Add environment variables (see above)" -ForegroundColor Gray
Write-Host "  6. Deploy!" -ForegroundColor Gray
Write-Host ""

Write-Host "Frontend (Vercel):" -ForegroundColor Cyan
Write-Host "  1. Sign up: https://vercel.com" -ForegroundColor Gray
Write-Host "  2. New Project → Import from GitHub" -ForegroundColor Gray
Write-Host "  3. Root Directory: frontend" -ForegroundColor Gray
Write-Host "  4. Framework: Vite" -ForegroundColor Gray
Write-Host "  5. Add environment variable:" -ForegroundColor Gray
Write-Host "     VITE_API_URL=https://your-backend.railway.app/graphql" -ForegroundColor Gray
Write-Host "  6. Deploy!" -ForegroundColor Gray
Write-Host ""

Write-Host "📚 Full Guide: Read DEPLOYMENT_GUIDE.md for detailed instructions" -ForegroundColor Cyan
Write-Host ""
Write-Host "✨ Happy Deploying!" -ForegroundColor Green
