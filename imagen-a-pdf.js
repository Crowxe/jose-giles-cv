const fs = require('fs');
const imageToPdf = require('image-to-pdf');
const path = require('path');

console.log('Convirtiendo imagen a PDF...');

// Ruta de la imagen
const imagePath = path.join(__dirname, 'CV-Jose-Giles-highres.png');

// Verificar que la imagen existe
if (!fs.existsSync(imagePath)) {
  console.error('Error: No se encuentra la imagen CV-Jose-Giles-highres.png');
  process.exit(1);
}

// Ruta para el PDF resultante
const pdfPath = path.join(__dirname, 'CV-Jose-Giles-exacto.pdf');

// Configurar las dimensiones y calidad del PDF
const pages = [imagePath];

// Crear el PDF a partir de la imagen
imageToPdf(pages, imageToPdf.sizes.A4)
  .pipe(fs.createWriteStream(pdfPath))
  .on('finish', () => {
    console.log(`PDF creado correctamente: ${pdfPath}`);
  })
  .on('error', (err) => {
    console.error('Error al crear el PDF:', err);
  }); 