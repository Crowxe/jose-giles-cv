@echo off
echo Generando PDF paginado de tu CV...
echo Este método divide la página en secciones y crea un PDF de múltiples páginas.
echo Por favor espera unos momentos mientras se completa el proceso.

REM Ejecutar el script Node.js
node pdf-from-images.js

echo.
echo Si no hay errores, se ha generado el archivo:
echo - CV-Jose-Giles-paginado.pdf (PDF con múltiples páginas)
echo.
echo Presiona cualquier tecla para abrir el PDF...
pause > nul

REM Abrir el PDF
start CV-Jose-Giles-paginado.pdf 