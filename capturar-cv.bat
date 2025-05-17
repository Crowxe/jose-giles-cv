@echo off
echo Capturando imágenes del CV en alta resolución...
echo Este método genera capturas de pantalla nítidas de tu CV.
echo Por favor espera unos momentos mientras se completa el proceso.

REM Ejecutar el script Node.js
node screenshot-cv.js

echo.
echo Si no hay errores, se han generado los siguientes archivos:
echo - CV-Jose-Giles-highres.png (imagen completa)
echo - CV-Jose-Giles-page1.png, page2.png, etc. (CV dividido en páginas)
echo.
echo Presiona cualquier tecla para ver el resultado...
pause > nul

REM Abrir la imagen
start CV-Jose-Giles-highres.png 