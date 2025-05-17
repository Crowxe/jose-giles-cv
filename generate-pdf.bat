@echo off
echo Generando PDF de tu CV...
echo Por favor espera unos momentos mientras se completa el proceso.

REM Iniciar Chrome en modo headless
start chrome.exe --headless --remote-debugging-port=9222 --disable-gpu

REM Esperar a que Chrome se inicie
timeout /t 2 > nul

REM Ejecutar el script Node.js
node generate-pdf.js

REM Cerrar Chrome
taskkill /f /im chrome.exe > nul 2>&1

echo.
echo Si no hay errores, tu PDF ha sido generado como CV-Jose-Giles.pdf
echo Puedes presionar cualquier tecla para abrir el PDF...
pause > nul

REM Abrir el PDF
start CV-Jose-Giles.pdf 