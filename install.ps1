$ErrorActionPreference = "Stop"

$Dest = if ($env:TOKEN_SAVER_HOME) { $env:TOKEN_SAVER_HOME } else { Join-Path $HOME "token-saver" }
$Base = "https://github.com/sudowhat/token-saver/releases/latest/download"
$Temp = Join-Path ([System.IO.Path]::GetTempPath()) ("token-saver-" + [guid]::NewGuid())
New-Item -ItemType Directory -Path $Temp | Out-Null

try {
    $Archive = Join-Path $Temp "token-saver.tgz"
    $Checksum = Join-Path $Temp "token-saver.tgz.sha256"
    Write-Host "Downloading latest Token Saver release..."
    Invoke-WebRequest -UseBasicParsing "$Base/token-saver.tgz" -OutFile $Archive
    Invoke-WebRequest -UseBasicParsing "$Base/token-saver.tgz.sha256" -OutFile $Checksum

    $Expected = ((Get-Content $Checksum -Raw).Trim() -split '\s+')[0].ToLowerInvariant()
    $Actual = (Get-FileHash -Algorithm SHA256 $Archive).Hash.ToLowerInvariant()
    if ($Expected -ne $Actual) { throw "release checksum verification failed" }

    tar -xzf $Archive -C $Temp
    if ($LASTEXITCODE -ne 0) { throw "could not extract release archive" }
    $Src = Join-Path $Temp "package"
    if (-not (Test-Path (Join-Path $Src "AGENT.md"))) { throw "release archive is invalid" }

    if (Test-Path (Join-Path $Dest ".git")) {
        throw "$Dest is a Git checkout. Update it with its version-control workflow instead."
    }
    if ((Test-Path $Dest) -and -not (Test-Path (Join-Path $Dest ".token-saver-powershell"))) {
        throw "$Dest already exists and is not a PowerShell-managed Token Saver install; nothing was overwritten"
    }

    $Manifest = Join-Path $Dest ".token-saver-files.sha256"
    if (Test-Path $Manifest) {
        foreach ($line in Get-Content $Manifest) {
            if ([string]::IsNullOrWhiteSpace($line)) { continue }
            $parts = $line -split '\s+', 2
            $file = Join-Path $Dest $parts[1]
            if (-not (Test-Path $file)) { throw "local managed file is missing: $($parts[1])" }
            $hash = (Get-FileHash -Algorithm SHA256 $file).Hash.ToLowerInvariant()
            if ($hash -ne $parts[0].ToLowerInvariant()) { throw "local changes detected in $($parts[1]); refusing to overwrite" }
        }
    }

    New-Item -ItemType Directory -Force -Path $Dest | Out-Null
    $Entries = @("AGENT.md","README.md","CONTRIBUTING.md","CHANGELOG.md","INIT_PROMPT.txt","OPTIONAL_PROJECT_STUB.md","THIRD_PARTY.md","LICENSE","package.json","skills")
    foreach ($entry in $Entries) {
        $target = Join-Path $Dest $entry
        if (Test-Path $target) { Remove-Item -Recurse -Force $target }
        Copy-Item -Recurse -Force (Join-Path $Src $entry) $target
    }

    $manifestLines = @()
    Get-ChildItem -Path $Dest -Recurse -File | Where-Object { $_.Name -notin @(".token-saver-files.sha256", ".token-saver-powershell") } | Sort-Object FullName | ForEach-Object {
        $rel = [System.IO.Path]::GetRelativePath($Dest, $_.FullName).Replace('\\','/')
        $hash = (Get-FileHash -Algorithm SHA256 $_.FullName).Hash.ToLowerInvariant()
        $manifestLines += "$hash $rel"
    }
    Set-Content -Path $Manifest -Value $manifestLines -Encoding UTF8
    Set-Content -Path (Join-Path $Dest ".token-saver-powershell") -Value "managed" -Encoding ASCII

    $Version = (Get-Content (Join-Path $Dest "package.json") -Raw | ConvertFrom-Json).version
    Write-Host "Installed Token Saver $Version -> $Dest"
    Write-Host ""
    Write-Host "Start an AI agent with:"
    Write-Host ""
    Write-Host "Read ~/token-saver/AGENT.md and initialize this project. Then continue to follow it for this session."
}
finally {
    Remove-Item -Recurse -Force $Temp -ErrorAction SilentlyContinue
}
