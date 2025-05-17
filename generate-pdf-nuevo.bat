@echo off
echo Generando PDF del CV con Puppeteer...
echo Por favor espera unos momentos mientras se completa el proceso.

REM Ejecutar el script Node.js
node generate-pdf-puppeteer.js

echo.
echo Si no hay errores, tu PDF ha sido generado como CV-Jose-Giles.pdf
echo Presiona cualquier tecla para abrir el PDF...
pause > nul

REM Abrir el PDF
start CV-Jose-Giles.pdf 