Dim shell, desktop, ps1Path
Set shell = CreateObject("WScript.Shell")
desktop = shell.SpecialFolders("Desktop")
ps1Path = desktop & "\start-admin.ps1"
shell.Run "powershell -NoExit -NoProfile -ExecutionPolicy Bypass -File """ & ps1Path & """"
