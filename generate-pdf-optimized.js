const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  try {
    console.log('Iniciando el navegador...');
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Configurar el viewport para simular una pantalla de escritorio
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
    
    // Inyectar CSS para optimizar la presentación para PDF
    await page.addStyleTag({
      content: `
        @page {
          size: A4;
          margin: 0;
        }
        
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        @media print {
          .sidebar, .main-content {
            page-break-inside: avoid;
          }
          
          section {
            page-break-inside: avoid;
          }
          
          h2 {
            page-break-after: avoid;
          }
          
          ul, ol {
            page-break-before: avoid;
          }
        }
      `
    });
    
    // Configurar el PDF con opciones avanzadas
    console.log('Generando PDF optimizado...');
    await page.pdf({
      path: 'CV-Jose-Giles-optimizado.pdf',
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      scale: 0.9, // Reducir ligeramente para mejorar la legibilidad
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm'
      }
    });
    
    console.log('PDF optimizado generado correctamente: CV-Jose-Giles-optimizado.pdf');
    await browser.close();
    
  } catch (error) {
    console.error('Error:', error);
  }
})(); 