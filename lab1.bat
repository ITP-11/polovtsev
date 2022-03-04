@echo off
cls
set ras = %1
if -%1==- goto NoParam
echo peremennaya opredelena: %1 
goto Continue
:NoParam
echo peremennaya ne opredelena
goto :eof
:Continue
copy E:\zadanie1\a3\*.* E:\archive
"C:\Program Files\WinRAR\WinRAR.exe" a -m5 E:\archive\archive.rar E:\archive\*.%1