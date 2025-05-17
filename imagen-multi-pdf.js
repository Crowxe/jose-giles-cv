const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

console.log('Generando PDF multipágina a partir de la imagen completa...');

// Ruta de la imagen
const imagePath = path.join(__dirname, 'CV-Jose-Giles-highres.png');

// Verificar que la imagen existe
if (!fs.existsSync(imagePath)) {
  console.error('Error: No se encuentra la imagen CV-Jose-Giles-highres.png');
  process.exit(1);
}

// Crear un nuevo documento PDF
const pdfPath = path.join(__dirname, 'CV-Jose-Giles-completo.pdf');
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 10, bottom: 10, left: 10, right: 10 },
  info: {
    Title: 'Currículum Vitae - José Giles',
    Author: 'José Giles',
  }
});

// Stream el PDF a un archivo
doc.pipe(fs.createWriteStream(pdfPath));

// Usar las imágenes individuales ya generadas para crear un PDF paginado
const paginas = [];
let i = 1;

// Verificar cuántas páginas tenemos
while (fs.existsSync(`CV-Jose-Giles-page${i}.png`)) {
  paginas.push(`CV-Jose-Giles-page${i}.png`);
  i++;
}

console.log(`Se encontraron ${paginas.length} imágenes de páginas`);

// Si no se encontraron imágenes de páginas, usar sólo la imagen completa
if (paginas.length === 0) {
  console.log('No se encontraron imágenes de páginas, dividiendo la imagen completa...');
  
  // Añadir la imagen completa ajustada al ancho de A4
  doc.image(imagePath, {
    fit: [doc.page.width - 20, doc.page.height * 3], // Permitir que sea muy alta
    align: 'center'
  });
} else {
  // Añadir cada imagen como una página
  paginas.forEach((paginaPath, index) => {
    if (index > 0) doc.addPage();
    
    doc.image(path.join(__dirname, paginaPath), {
      fit: [doc.page.width - 20, doc.page.height - 20],
      align: 'center',
      valign: 'center'
    });
    
    console.log(`Página ${index + 1} añadida al PDF`);
  });
}

// Finalizar el PDF
doc.end();

console.log(`PDF multipágina creado correctamente: ${pdfPath}`); 