const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');

(async () => {
  try {
    console.log('Iniciando el navegador...');
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Configurar el viewport para capturar imágenes de alta calidad
    await page.setViewport({
      width: 1100,
      height: 850, // Altura aproximada para una página A4
      deviceScaleFactor: 1.5
    });
    
    // Ruta al archivo HTML
    const htmlPath = path.join(__dirname, 'index.html');
    const htmlFileUrl = `file://${htmlPath}`;
    
    console.log('Cargando la página...');
    await page.goto(htmlFileUrl, { waitUntil: 'networkidle0' });
    
    // Esperar a que todos los elementos se carguen
    await page.waitForSelector('body', { timeout: 5000 });
    
    // Obtener la altura total de la página
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    
    // Calcular cuántas capturas necesitamos
    const viewportHeight = page.viewport().height;
    const numScreenshots = Math.ceil(bodyHeight / viewportHeight);
    
    console.log(`Generando ${numScreenshots} capturas de página...`);
    
    // Crear directorio temporal para las imágenes si no existe
    const tempDir = path.join(__dirname, 'temp_images');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    
    // Función para esperar un tiempo determinado
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    // Tomar capturas de cada parte de la página
    const imageFiles = [];
    for (let i = 0; i < numScreenshots; i++) {
      const yPosition = i * viewportHeight;
      await page.evaluate((y) => window.scrollTo(0, y), yPosition);
      
      // Dar tiempo para que la página termine de renderizar después del scroll
      await sleep(200);
      
      const imagePath = path.join(tempDir, `page_${i}.png`);
      await page.screenshot({
        path: imagePath,
        clip: {
          x: 0,
          y: 0,
          width: page.viewport().width,
          height: Math.min(viewportHeight, bodyHeight - yPosition)
        }
      });
      
      imageFiles.push(imagePath);
      console.log(`Captura ${i+1}/${numScreenshots} completada`);
    }
    
    // Cerrar el navegador
    await browser.close();
    
    // Crear un PDF con las imágenes
    console.log('Generando PDF a partir de las imágenes...');
    
    // Verificar si tenemos pdfkit instalado
    try {
      require.resolve('pdfkit');
    } catch (e) {
      console.log('Instalando pdfkit...');
      require('child_process').execSync('npm install pdfkit');
    }
    
    const pdfPath = path.join(__dirname, 'CV-Jose-Giles-paginado.pdf');
    const doc = new PDFDocument({
      size: 'A4',
      margin: 0
    });
    
    doc.pipe(fs.createWriteStream(pdfPath));
    
    // Añadir cada imagen como una página
    for (let i = 0; i < imageFiles.length; i++) {
      if (i > 0) doc.addPage();
      doc.image(imageFiles[i], 0, 0, {
        width: doc.page.width,
        height: doc.page.height
      });
    }
    
    doc.end();
    
    console.log(`PDF generado correctamente: ${pdfPath}`);
    
    // Limpiar directorio temporal
    console.log('Limpiando archivos temporales...');
    imageFiles.forEach(file => fs.unlinkSync(file));
    fs.rmdirSync(tempDir);
    
  } catch (error) {
    console.error('Error:', error);
  }
})(); 