@"
_  __               
| |/ /___  ___ _ __  
| ' // _ \/ _ \ '_ \ 
| . \  __/  __/ |_) |
|_|\_\___|\___| .__/ 
              |_|    
  ____      _           
 / ___|__ _| |_ __ ___  
| |   / _` | | '_ ` _ \ 
| |__| (_| | | | | | | |
 \____\__,_|_|_| |_| |_|
                        
    _              _ 
   / \   _ __   __| |
  / _ \ | '_ \ / _` |
 / ___ \| | | | (_| |
/_/   \_\_| |_|\__,_|
                     
  ____          _         ___  _   _ 
 / ___|___   __| | ___   / _ \| \ | |
| |   / _ \ / _` |/ _ \ | | | |  \| |
| |__| (_) | (_| |  __/ | |_| | |\  |
 \____\___/ \__,_|\___|  \___/|_| \_|
                                     
"@

[string] $Root = ($MyInvocation.MyCommand.Path | Split-Path | Resolve-Path).ProviderPath

[string] $ACoreX_SPA_Project = $Root + "\projects\acorex-spa"

Set-Location -Path $ACoreX_SPA_Project
npm start
