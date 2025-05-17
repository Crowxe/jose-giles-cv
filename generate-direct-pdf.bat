@echo off
echo Generando PDF directo de tu CV...
echo Este método crea el PDF en un solo paso, sin intermediarios.
echo Por favor espera unos momentos mientras se completa el proceso.

REM Ejecutar el script Node.js
node direct-pdf.js

echo.
echo Si no hay errores, se ha generado el archivo:
echo - CV-Jose-Giles-final.pdf (PDF versión final)
echo.
echo Presiona cualquier tecla para abrir el PDF...
pause > nul

REM Abrir el PDF
start CV-Jose-Giles-final.pdf 