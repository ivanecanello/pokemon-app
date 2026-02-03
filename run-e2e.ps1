# PowerShell script to start dev server and run Cypress tests

# Kill any existing node processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Start dev server in background
Write-Host "Starting dev server..."
$serverProcess = Start-Process -FilePath "npx" -ArgumentList "ng serve" -NoNewWindow -PassThru -WorkingDirectory "C:\Users\ivane\Desktop\pokemon-app"

# Wait for server to start
Write-Host "Waiting for server to stabilize..."
Start-Sleep -Seconds 10

# Run Cypress tests
Write-Host "Running Cypress tests..."
cd C:\Users\ivane\Desktop\pokemon-app
npx cypress run

# Kill server
Stop-Process -InputObject $serverProcess -Force
