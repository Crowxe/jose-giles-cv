const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  try {
    console.log('Iniciando el navegador...');
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1200,800']
    });
    
    const page = await browser.newPage();
    
    // Configurar el viewport para una imagen de alta calidad
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2.0 // Alta resolución
    });
    
    // Ruta al archivo HTML
    const htmlPath = path.join(__dirname, 'index.html');
    const htmlFileUrl = `file://${htmlPath}`;
    
    console.log('Cargando la página...');
    await page.goto(htmlFileUrl, { waitUntil: 'networkidle0' });
    
    // Esperar a que todos los elementos se carguen
    await page.waitForSelector('body', { timeout: 5000 });
    
    // Ocultar cualquier botón de PDF
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
    });
    
    // Capturar la página completa
    console.log('Capturando la imagen...');
    await page.screenshot({
      path: 'CV-Jose-Giles-highres.png',
      fullPage: true,
      omitBackground: false,
    });
    
    console.log('Imagen guardada como: CV-Jose-Giles-highres.png');
    
    // Crear una versión optimizada para imprimir
    console.log('Creando versión para imprimir...');
    
    // Obtener la altura de la página
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    
    // Calcular cuántas páginas A4 ocupa (A4 = 210mm × 297mm, proporción ~1:1.4)
    const pageWidth = 1200;
    const a4Height = pageWidth * 1.4; // Altura aproximada de A4 si el ancho es 1200px
    const numPages = Math.ceil(pageHeight / a4Height);
    
    console.log(`El CV ocuparía aproximadamente ${numPages} páginas A4`);
    
    // Capturar una imagen por cada página A4
    for (let i = 0; i < numPages; i++) {
      const yPosition = i * a4Height;
      const captureHeight = Math.min(a4Height, pageHeight - yPosition);
      
      // Desplazarse a la posición correcta
      await page.evaluate((y) => window.scrollTo(0, y), yPosition);
      
      // Esperar a que se complete el desplazamiento
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Tomar la captura de esta "página"
      await page.screenshot({
        path: `CV-Jose-Giles-page${i+1}.png`,
        clip: {
          x: 0,
          y: 0,
          width: pageWidth,
          height: captureHeight
        }
      });
      
      console.log(`Página ${i+1}/${numPages} capturada como: CV-Jose-Giles-page${i+1}.png`);
    }
    
    console.log('Capturas completadas.');
    await browser.close();
    
  } catch (error) {
    console.error('Error:', error);
  }
})(); 