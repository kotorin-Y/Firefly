$ErrorActionPreference = "Stop"
$blog = Split-Path -Parent $PSScriptRoot
$workspace = Split-Path -Parent $blog
$downloads = Join-Path $blog "public\downloads\portfolio"
$stageRoot = Join-Path $env:TEMP "kotorin-portfolio-packages"

if (Test-Path -LiteralPath $stageRoot) { Remove-Item -LiteralPath $stageRoot -Recurse -Force }
New-Item -ItemType Directory -Force -Path $stageRoot, $downloads | Out-Null

function Copy-PublicSource {
	param([string]$Source, [string]$Project, [string]$TargetName)
	$stage = Join-Path $stageRoot $Project
	New-Item -ItemType Directory -Force -Path $stage | Out-Null
	$excluded = @(".git", "node_modules", "dist", "artifacts", ".astro", ".wrangler", ".worktrees", ".superpowers", ".gstack", "output")
	Get-ChildItem -LiteralPath $Source -Force | Where-Object { $excluded -notcontains $_.Name -and $_.Name -notmatch '^(release|dist-electron)' -and $_.Name -notmatch '^\.env' -and $_.Extension -ne ".log" -and $_.Extension -ne ".tsbuildinfo" } | ForEach-Object {
		Copy-Item -LiteralPath $_.FullName -Destination $stage -Recurse -Force
	}
	$targetDir = Join-Path $downloads $Project
	New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
	$target = Join-Path $targetDir $TargetName
	if (Test-Path -LiteralPath $target) { Remove-Item -LiteralPath $target -Force }
	Compress-Archive -Path (Join-Path $stage "*") -DestinationPath $target -CompressionLevel Optimal
}

Copy-PublicSource (Join-Path $workspace "opspilot-prototype") "ops-deputy" "ops-deputy-source-v1.zip"
Copy-PublicSource (Join-Path $workspace "windows-motion-studio") "windows-motion-studio" "windows-motion-studio-source-v1.zip"
Copy-PublicSource (Join-Path $workspace "violet-nexus-desktop") "fancy" "fancy-source-v0.3.0.zip"
Copy-PublicSource (Join-Path $workspace "stellar-blade-blood-rain") "stellar-blade-blood-rain" "stellar-blade-blood-rain-source-v1.zip"

function New-AssetPackage {
	param([string]$Project, [string[]]$Files, [string]$TargetName)
	$stage = Join-Path $stageRoot "$Project-assets"
	New-Item -ItemType Directory -Force -Path $stage | Out-Null
	foreach ($file in $Files) {
		if (Test-Path -LiteralPath $file) { Copy-Item -LiteralPath $file -Destination $stage -Force }
	}
	$target = Join-Path (Join-Path $downloads $Project) $TargetName
	if (Test-Path -LiteralPath $target) { Remove-Item -LiteralPath $target -Force }
	Compress-Archive -Path (Join-Path $stage "*") -DestinationPath $target -CompressionLevel Optimal
}

New-AssetPackage "ops-deputy" @(
	(Join-Path $workspace "opspilot-prototype\artifacts\opsdeputy-packaged-updated.png"),
	(Join-Path $workspace "opspilot-prototype\artifacts\opsdeputy-updated-interactions.png"),
	(Join-Path $workspace "opspilot-prototype\docs\SOFTWARE_BLUEPRINT.md"),
	(Join-Path $workspace "opspilot-prototype\docs\API_DESIGN.md")
) "ops-deputy-interaction-assets-v1.zip"

New-AssetPackage "windows-motion-studio" @(
	(Join-Path $workspace "windows-motion-studio\assets\windows_motion_studio_icon.png"),
	(Join-Path $workspace "windows-motion-studio\ADAPTERS.md"),
	(Join-Path $workspace "windows-motion-studio\README.md")
) "windows-motion-studio-interaction-assets-v1.zip"

New-AssetPackage "fancy" @(
	(Join-Path $workspace "output\png\violet-nexus\desktop-overview.png"),
	(Join-Path $workspace "output\png\violet-nexus\mobile-overview.png"),
	(Join-Path $workspace "output\png\violet-nexus\product-architecture.png"),
	(Join-Path $workspace "violet-nexus-desktop\artifacts\smoke\05-search.png"),
	(Join-Path $workspace "violet-nexus-desktop\artifacts\smoke\04-settings.png")
) "fancy-interaction-assets-v0.3.0.zip"

New-AssetPackage "stellar-blade-blood-rain" @(
	(Join-Path $workspace "stellar-blade-blood-rain\public\assets\reveal-hero.jpg"),
	(Join-Path $workspace "stellar-blade-blood-rain\public\assets\reveal-evie.jpg"),
	(Join-Path $workspace "stellar-blade-blood-rain\public\assets\media-frame-1.jpg"),
	(Join-Path $workspace "stellar-blade-blood-rain\public\assets\SOURCES.md")
) "stellar-blade-blood-rain-interaction-assets-v1.zip"

Copy-Item -LiteralPath (Join-Path $workspace "opspilot-prototype\dist\OpsPilot Agent.exe") -Destination (Join-Path $downloads "ops-deputy\ops-deputy-v1-x64.exe") -Force
Copy-Item -LiteralPath (Join-Path $workspace "windows-motion-studio\dist\WindowsMotionStudio.exe") -Destination (Join-Path $downloads "windows-motion-studio\windows-motion-studio-v1-x64.exe") -Force
Copy-Item -LiteralPath (Join-Path $workspace "violet-nexus-desktop\release-0.3.0\Fancy-Setup-0.3.0-x64.exe") -Destination (Join-Path $downloads "fancy\fancy-setup-v0.3.0-x64.exe") -Force
Copy-Item -LiteralPath (Join-Path $workspace "violet-nexus-desktop\release-0.3.0\Fancy-Portable-0.3.0-x64.exe") -Destination (Join-Path $downloads "fancy\fancy-portable-v0.3.0-x64.exe") -Force
$fancyPrd = Get-ChildItem -LiteralPath (Join-Path $workspace "output\pdf") -Filter "*.pdf" | Where-Object { $_.Name -like "*Fancy*" } | Select-Object -First 1
if (-not $fancyPrd) { throw "Fancy PRD PDF was not found" }
Copy-Item -LiteralPath $fancyPrd.FullName -Destination (Join-Path $downloads "fancy\fancy-prd-zh-cn.pdf") -Force
