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
    
    // Ruta al archivo HTML
    const htmlPath = path.join(__dirname, 'index.html');
    const htmlFileUrl = `file://${htmlPath}`;
    
    console.log('Cargando la página...');
    await page.goto(htmlFileUrl, { waitUntil: 'networkidle0' });
    
    // Esperar a que todos los elementos se carguen
    await page.waitForSelector('body', { timeout: 5000 });
    
    // Ocultar cualquier botón de "guardar como PDF"
    await page.evaluate(() => {
      const pdfButtons = Array.from(document.querySelectorAll('button, a')).filter(el => 
        el.textContent.toLowerCase().includes('pdf') || 
        el.textContent.toLowerCase().includes('guardar') ||
        el.textContent.toLowerCase().includes('descargar')
      );
      
      for (const button of pdfButtons) {
        button.style.display = 'none';
      }
    });

    // Inyectar CSS para mejorar la paginación en el PDF
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
          section, article, .job-item, .education-item {
            page-break-inside: avoid;
          }
          
          h2, h3 {
            page-break-after: avoid;
          }
        }
      `
    });
    
    // Obtener los elementos que necesitamos modificar
    const bodyHeight = await page.evaluate(() => {
      return document.body.scrollHeight;
    });
    
    // Calcular el número aproximado de páginas necesarias (considerando A4)
    // Un tamaño A4 es aproximadamente 1100px de alto
    const pagesNeeded = Math.ceil(bodyHeight / 1200);
    
    console.log(`Se necesitarán aproximadamente ${pagesNeeded} páginas`);
    
    // Generar PDF manteniendo el diseño original
    console.log('Generando PDF...');
    const pdfPath = path.join(__dirname, 'CV-Jose-Giles-final.pdf');
    
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      scale: 0.85, // Reducir ligeramente para que entre más contenido en cada página
      margin: {
        top: '7mm',
        right: '7mm',
        bottom: '7mm',
        left: '7mm'
      }
    });
    
    console.log(`PDF generado correctamente como: ${pdfPath}`);
    await browser.close();
    
  } catch (error) {
    console.error('Error:', error);
  }
})(); 