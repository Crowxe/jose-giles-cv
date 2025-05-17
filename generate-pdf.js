const { create } = require('html-pdf-chrome');
const fs = require('fs');
const path = require('path');

// Leer el archivo HTML
const htmlPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// Opciones para el PDF
const options = {
  port: 9222, // Puerto para Chrome
  printOptions: {
    preferCSSPageSize: true,
    printBackground: true,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paperWidth: 8.5,
    paperHeight: 11
  }
};

// Crear el PDF
async function generatePDF() {
  try {
    console.log('Abriendo Chrome...');
    const pdf = await create(html, options);
    
    console.log('Generando PDF...');
    const pdfPath = path.join(__dirname, 'CV-Jose-Giles.pdf');
    await pdf.toFile(pdfPath);
    
    console.log(`PDF generado exitosamente: ${pdfPath}`);
  } catch (error) {
    console.error('Error al generar el PDF:', error);
  }
}

console.log('Iniciando generación de PDF...');
generatePDF(); 