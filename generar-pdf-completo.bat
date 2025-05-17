@echo off
echo Generando PDF completo de tu CV...
echo Este método usa las capturas por páginas que ya generamos.
echo Por favor espera unos momentos mientras se completa el proceso.

REM Ejecutar el script Node.js
node imagen-multi-pdf.js

echo.
echo Si no hay errores, se ha generado el archivo:
echo - CV-Jose-Giles-completo.pdf
echo.
echo Presiona cualquier tecla para abrir el PDF...
pause > nul

REM Abrir el PDF
start CV-Jose-Giles-completo.pdf 