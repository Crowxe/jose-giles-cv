@echo off
echo Convirtiendo la imagen de alta resolución a PDF...
echo Este método crea un PDF a partir de la imagen.
echo Por favor espera unos momentos mientras se completa el proceso.

REM Ejecutar el script Node.js
node imagen-a-pdf-simple.js

echo.
echo Si no hay errores, se ha generado el archivo:
echo - CV-Jose-Giles-exacto.pdf
echo.
echo Presiona cualquier tecla para abrir el PDF...
pause > nul

REM Abrir el PDF
start CV-Jose-Giles-exacto.pdf 