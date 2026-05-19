# Nexus Ecosystem - Global Launcher (PowerShell)
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   NEXUS RED INTELIGENTE v4.0.0           " -ForegroundColor Cyan
Write-Host "   Iniciando Ecosistema Completo...       " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. API Arquetipo (NestJS)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd apps/arquetipo-api; npm run dev" -WindowStyle Normal
Write-Host "[1/5] API Arquetipo lanzada en puerto 3001" -ForegroundColor Green

# 2. Blockchain Node (P2P + Explorer)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd apps/blockchain; npm run dev" -WindowStyle Normal
Write-Host "[2/5] Nodo Blockchain lanzado en puerto 3002 (HTTP) y 6001 (P2P)" -ForegroundColor Green

# 3. AI Oracle (IA Inference)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd apps/modulo-ia; npm run dev" -WindowStyle Normal
Write-Host "[3/5] Oráculo IA lanzado en puerto 3005" -ForegroundColor Green

# 4. Frontend Nexus (Next.js)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal
Write-Host "[4/5] Dashboard Frontend lanzado en puerto 3000" -ForegroundColor Green

# 5. Nexus PC Miner (Opcional)
Write-Host "[5/5] Ecosistema listo. Para iniciar el minero manual: cd apps/nexus-pc; npm run dev" -ForegroundColor Yellow

Write-Host "`nNexus está ahora operativo. Accede a http://localhost:3000" -ForegroundColor Cyan
