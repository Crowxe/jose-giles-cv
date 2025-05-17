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
    
    // Configurar el viewport para un tamaño adecuado
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 1.2
    });
    
    // Ruta al archivo HTML
    const htmlPath = path.join(__dirname, 'index.html');
    const htmlFileUrl = `file://${htmlPath}`;
    
    console.log('Cargando la página...');
    await page.goto(htmlFileUrl, { waitUntil: 'networkidle0' });
    
    // Esperar a que todos los elementos se carguen
    await page.waitForSelector('body', { timeout: 5000 });
    
    // Ocultar cualquier botón de "guardar como PDF"
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
      
      // Asegurarse de que el contenedor principal siga manteniendo el diseño de sidebar
      const container = document.querySelector('.container') || document.querySelector('main');
      if (container) {
        // Mantener el layout flexbox para la sidebar
        container.style.display = 'flex';
        container.style.flexDirection = 'row';
        container.style.width = '100%';
      }
      
      // Asegurar que la barra lateral se muestre correctamente
      const sidebar = document.querySelector('.sidebar') || 
                     document.querySelector('aside') || 
                     document.querySelector('.left-column');
      
      if (sidebar) {
        sidebar.style.height = '100%';
        sidebar.style.position = 'relative';
        sidebar.style.flex = '0 0 30%'; // Asegurar que ocupe ~30% del ancho
      }
      
      // Asegurar que el contenido principal se muestre correctamente
      const mainContent = document.querySelector('.main-content') || 
                         document.querySelector('section') || 
                         document.querySelector('.right-column');
      
      if (mainContent) {
        mainContent.style.flex = '1'; // Ocupar el resto del espacio
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
        
        @media print {
          .container, main {
            display: flex !important;
            flex-direction: row !important;
          }
          
          .sidebar, aside, .left-column {
            flex: 0 0 30% !important;
            height: 100% !important;
          }
          
          .main-content, section, .right-column {
            flex: 1 !important;
          }
          
          section, article, .job-item, .education-item {
            page-break-inside: avoid;
          }
          
          h2, h3 {
            page-break-after: avoid;
          }
        }
      `
    });
    
    // Generar PDF manteniendo el diseño original con sidebar
    console.log('Generando PDF...');
    const pdfPath = path.join(__dirname, 'CV-Jose-Giles-final.pdf');
    
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      landscape: false, // Usar orientación vertical
      scale: 0.9, // Ajustar ligeramente la escala
      margin: {
        top: '5mm',
        right: '5mm',
        bottom: '5mm',
        left: '5mm'
      }
    });
    
    console.log(`PDF generado correctamente como: ${pdfPath}`);
    await browser.close();
    
  } catch (error) {
    console.error('Error:', error);
  }
})(); 