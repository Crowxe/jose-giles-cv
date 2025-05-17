const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');
const sizeOf = require('image-size');

console.log('Convirtiendo imagen a PDF usando PDFKit...');

// Ruta de la imagen
const imagePath = path.join(__dirname, 'CV-Jose-Giles-highres.png');

// Verificar que la imagen existe
if (!fs.existsSync(imagePath)) {
  console.error('Error: No se encuentra la imagen CV-Jose-Giles-highres.png');
  process.exit(1);
}

// Obtener dimensiones de la imagen
try {
  const dimensions = sizeOf(imagePath);
  console.log(`Dimensiones de la imagen: ${dimensions.width}x${dimensions.height}`);
  
  // Crear un nuevo documento PDF
  const pdfPath = path.join(__dirname, 'CV-Jose-Giles-exacto.pdf');
  const doc = new PDFDocument({
    size: [dimensions.width, dimensions.height],
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    info: {
      Title: 'Currículum Vitae - José Giles',
      Author: 'José Giles',
    }
  });
  
  // Stream el PDF a un archivo
  doc.pipe(fs.createWriteStream(pdfPath));
  
  // Añadir la imagen al PDF
  doc.image(imagePath, 0, 0, {
    width: dimensions.width,
    height: dimensions.height
  });
  
  // Finalizar el PDF
  doc.end();
  
  console.log(`PDF creado correctamente: ${pdfPath}`);
} catch (error) {
  console.error('Error al procesar la imagen:', error);
} 