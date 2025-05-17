@echo off
echo Generando PDF final de alta calidad...
echo Este método creará un PDF optimizado con mejor maquetación.
echo Por favor espera unos momentos mientras se completa el proceso.

REM Ejecutar el script Node.js
node better-pdf.js

echo.
echo Si no hay errores, se ha generado el archivo:
echo - CV-Jose-Giles-final.pdf (PDF de alta calidad)
echo.
echo Presiona cualquier tecla para abrir el PDF...
pause > nul

REM Abrir el PDF
start CV-Jose-Giles-final.pdf 