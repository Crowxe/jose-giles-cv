@echo off
echo Generando PDF optimizado de tu CV...
echo Por favor espera unos momentos mientras se completa el proceso.

REM Ejecutar el script Node.js
node generate-pdf-optimized.js

echo.
echo Si no hay errores, se ha generado el archivo:
echo - CV-Jose-Giles-optimizado.pdf (PDF optimizado con paginación)
echo.
echo Presiona cualquier tecla para abrir el PDF...
pause > nul

REM Abrir el PDF
start CV-Jose-Giles-optimizado.pdf 