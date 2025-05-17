const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

console.log('Convirtiendo imagen a PDF usando PDFKit...');

// Ruta de la imagen
const imagePath = path.join(__dirname, 'CV-Jose-Giles-highres.png');

// Verificar que la imagen existe
if (!fs.existsSync(imagePath)) {
  console.error('Error: No se encuentra la imagen CV-Jose-Giles-highres.png');
  process.exit(1);
}

// Crear un nuevo documento PDF en tamaño A4
const pdfPath = path.join(__dirname, 'CV-Jose-Giles-exacto.pdf');
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 0, bottom: 0, left: 0, right: 0 },
  info: {
    Title: 'Currículum Vitae - José Giles',
    Author: 'José Giles',
  }
});

// Stream el PDF a un archivo
doc.pipe(fs.createWriteStream(pdfPath));

// Añadir la imagen al PDF a tamaño completo
doc.image(imagePath, 0, 0, {
  width: doc.page.width,
  align: 'center',
  valign: 'center'
});

// Finalizar el PDF
doc.end();

console.log(`PDF creado correctamente: ${pdfPath}`); 