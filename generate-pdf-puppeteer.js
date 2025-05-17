const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

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
      width: 1200,
      height: 1600,
      deviceScaleFactor: 1,
    });
    
    // Ruta al archivo HTML
    const htmlPath = path.join(__dirname, 'index.html');
    const htmlFileUrl = `file://${htmlPath}`;
    
    console.log('Cargando la página...');
    await page.goto(htmlFileUrl, { waitUntil: 'networkidle0' });
    
    // Esperar a que todos los elementos se carguen
    await page.waitForSelector('body', { timeout: 5000 });
    
    // Inyectar CSS adicional para asegurar que el diseño se mantenga en el PDF
    await page.addStyleTag({
      content: `
        @page {
          size: A4;
          margin: 0;
        }
        body {
          width: 100%;
          height: 100%;
          display: flex;
          overflow: visible !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        @media print {
          html, body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
          }
        }
      `
    });
    
    // Configurar el PDF para que mantenga la apariencia visual exacta
    console.log('Generando PDF...');
    const pdfPath = path.join(__dirname, 'CV-Jose-Giles.pdf');
    
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    });
    
    console.log(`PDF generado correctamente: ${pdfPath}`);
    await browser.close();
    
  } catch (error) {
    console.error('Error al generar el PDF:', error);
  }
})(); 