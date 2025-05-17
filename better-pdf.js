const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');

(async () => {
  try {
    console.log('Iniciando el navegador...');
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1100,1400']
    });
    
    const page = await browser.newPage();
    
    // Configurar el viewport para un tamaño de A4 más apropiado
    await page.setViewport({
      width: 1100, 
      height: 1400,
      deviceScaleFactor: 1.5
    });
    
    // Ruta al archivo HTML
    const htmlPath = path.join(__dirname, 'index.html');
    const htmlFileUrl = `file://${htmlPath}`;
    
    console.log('Cargando la página...');
    await page.goto(htmlFileUrl, { waitUntil: 'networkidle0' });
    
    // Esperar a que todos los elementos se carguen
    await page.waitForSelector('body', { timeout: 5000 });
    
    // Eliminar cualquier botón de "guardar como PDF" si existe
    await page.evaluate(() => {
      // Ocultar botones relacionados con PDF
      const pdfButtons = Array.from(document.querySelectorAll('button, a')).filter(el => 
        el.textContent.toLowerCase().includes('pdf') || 
        el.textContent.toLowerCase().includes('guardar') ||
        el.textContent.toLowerCase().includes('descargar')
      );
      
      for (const button of pdfButtons) {
        button.style.display = 'none';
      }
      
      // Asegurarse de que el cuerpo ocupe todo el ancho disponible
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.overflow = 'visible';
      
      // Eliminar cualquier fondo blanco extra
      const allElements = document.querySelectorAll('*');
      for (const el of allElements) {
        if (getComputedStyle(el).backgroundColor === 'rgb(255, 255, 255)') {
          el.style.backgroundColor = 'transparent';
        }
      }
    });
    
    // Inyectar CSS para optimizar la presentación
    await page.addStyleTag({
      content: `
        @page {
          size: A4;
          margin: 0;
        }
        
        body {
          margin: 0 !important;
          padding: 0 !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      `
    });
    
    // Obtener la altura total de la página
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    
    // Crear captura completa de la página
    console.log('Capturando página completa...');
    
    const fullPageImagePath = path.join(__dirname, 'cv_full_page.png');
    await page.screenshot({
      path: fullPageImagePath,
      fullPage: true
    });
    
    console.log('Captura completa guardada.');
    
    // Cerrar el navegador
    await browser.close();
    
    // Dividir la imagen en páginas A4 para el PDF
    console.log('Dividiendo la imagen para el PDF...');
    
    const { createCanvas, loadImage } = require('canvas');
    
    // Instalar canvas si no está disponible
    try {
      require.resolve('canvas');
    } catch (e) {
      console.log('Instalando dependencia canvas...');
      require('child_process').execSync('npm install canvas');
    }
    
    // Cargar la imagen completa
    const image = await loadImage(fullPageImagePath);
    
    // Dimensiones A4 en puntos (72 puntos por pulgada)
    const a4Width = 595;
    const a4Height = 842;
    
    // Calcular cuántas páginas necesitamos
    const scale = a4Width / image.width;
    const scaledHeight = image.height * scale;
    const numPages = Math.ceil(scaledHeight / a4Height);
    
    console.log(`Dividiendo en ${numPages} páginas...`);
    
    // Crear directorio temporal para las páginas
    const tempDir = path.join(__dirname, 'temp_pages');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    
    // Crear las páginas individuales
    const pageFiles = [];
    
    for (let i = 0; i < numPages; i++) {
      const canvas = createCanvas(a4Width, a4Height);
      const ctx = canvas.getContext('2d');
      
      // Calcular qué parte de la imagen dibujar
      const sourceY = i * (a4Height / scale);
      const sourceHeight = Math.min(a4Height / scale, image.height - sourceY);
      
      // Dibujar solo la porción correspondiente a esta página
      ctx.drawImage(
        image,
        0, sourceY, image.width, sourceHeight,
        0, 0, a4Width, sourceHeight * scale
      );
      
      // Guardar la página como archivo
      const pagePath = path.join(tempDir, `page_${i}.png`);
      const out = fs.createWriteStream(pagePath);
      const stream = canvas.createPNGStream();
      stream.pipe(out);
      
      // Esperar a que se complete la escritura
      await new Promise((resolve) => {
        out.on('finish', resolve);
      });
      
      pageFiles.push(pagePath);
      console.log(`Página ${i+1}/${numPages} creada`);
    }
    
    // Crear un PDF con las páginas
    console.log('Generando PDF final...');
    
    const pdfPath = path.join(__dirname, 'CV-Jose-Giles-final.pdf');
    const doc = new PDFDocument({
      size: 'A4',
      margin: 0,
      info: {
        Title: 'Currículum Vitae - José Giles',
        Author: 'José Giles',
      }
    });
    
    doc.pipe(fs.createWriteStream(pdfPath));
    
    // Añadir cada página al PDF
    for (let i = 0; i < pageFiles.length; i++) {
      if (i > 0) doc.addPage({ margin: 0 });
      
      doc.image(pageFiles[i], 0, 0, {
        width: doc.page.width,
        height: doc.page.height,
        align: 'center',
        valign: 'center'
      });
    }
    
    doc.end();
    
    console.log(`PDF generado correctamente: ${pdfPath}`);
    
    // Limpiar archivos temporales
    console.log('Limpiando archivos temporales...');
    fs.unlinkSync(fullPageImagePath);
    pageFiles.forEach(file => fs.unlinkSync(file));
    fs.rmdirSync(tempDir);
    
  } catch (error) {
    console.error('Error:', error);
  }
})(); 