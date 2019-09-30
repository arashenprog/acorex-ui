@"
          _____              __   __
    /\   / ____|             \ \ / /
   /  \ | |     ___  _ __ ___ \ V / 
  / /\ \| |    / _ \| '__/ _ \ > <  
 / ____ \ |___| (_) | | |  __// . \ 
/_/    \_\_____\___/|_|  \___/_/ \_\
                                                                                                           
"@


[string] $OS_Drive = "C:\"
[string] $FileType = "*.tgz"

[string] $Root = ($MyInvocation.MyCommand.Path | Split-Path | Resolve-Path).ProviderPath

[string] $ACoreX_UI_Project = $Root + "\projects\acorex-ui"
[string] $ACoreX_SPA_Project = $Root + "\projects\acorex-spa"
[string] $ACoreX_Editor_Project = $Root + "\projects\acorex-editor"


[string] $ACoreX_UI_Dist = $Root + "\dist\acorex-ui"
[string] $ACoreX_SPA_Dist = $Root + "\dist\acorex-spa"
[string] $ACoreX_Editor_Dist = $Root + "\dist\acorex-editor"

[string] $ACoreX_UI_Package = $ACoreX_UI_Dist + "\*.tgz"
[string] $ACoreX_SPA_Package = $ACoreX_SPA_Dist + "\*.tgz"
[string] $ACoreX_Editor_Package = $ACoreX_Editor_Dist + "\*.tgz"


[string] $ACoreX_Deploy_Folder = $OS_Drive + "ACoreX"


# If ACoreX Folder in (C:/) drive doesn't exist
if (!(Test-Path -Path $ACoreX_Deploy_Folder)) {
    New-Item -Path  $ACoreX_Deploy_Folder -ItemType Directory 
}


# Build ACoreX UI
Set-Location -Path $ACoreX_UI_Project
ng build acorex-ui

# Create NPM Package ACoreX UI
Set-Location -Path $ACoreX_UI_Dist
npm pack

# Copy To ACoreX Folder
Copy-Item -Path $ACoreX_UI_Package -Destination $ACoreX_Deploy_Folder


# Build ACoreX SPA
Set-Location -Path $ACoreX_SPA_Project
ng build acorex-spa

# Create NPM Package ACoreX SPA
Set-Location -Path $ACoreX_SPA_Dist
npm pack

# Copy To ACoreX Folder
Copy-Item -Path $ACoreX_SPA_Package -Destination $ACoreX_Deploy_Folder


# Build ACoreX Editor
Set-Location -Path $ACoreX_Editor_Project
ng build acorex-editor

# Create NPM Package ACoreX SPA
Set-Location -Path $ACoreX_Editor_Dist
npm pack

# Copy To ACoreX Folder
Copy-Item -Path $ACoreX_Editor_Package -Destination $ACoreX_Deploy_Folder


@"
 ______ _       _     _              _ 
|  ____(_)     (_)   | |            | |
| |__   _ _ __  _ ___| |__   ___  __| |
|  __| | | '_ \| / __| '_ \ / _ \/ _` |
| |    | | | | | \__ \ | | |  __/ (_| |
|_|    |_|_| |_|_|___/_| |_|\___|\__,_|
Powerd by <3
"@