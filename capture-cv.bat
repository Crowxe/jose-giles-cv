@echo off
echo Capturando imagen y PDF de tu CV...
echo Por favor espera unos momentos mientras se completa el proceso.

REM Ejecutar el script Node.js
node generate-screenshot.js

echo.
echo Si no hay errores, se han generado:
echo - CV-Jose-Giles.png (imagen de alta resolución)
echo - CV-Jose-Giles-completo.pdf (PDF)
echo.
echo Presiona cualquier tecla para ver los resultados...
pause > nul

REM Abrir los archivos generados
start CV-Jose-Giles.png
start CV-Jose-Giles-completo.pdf 