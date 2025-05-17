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
    
    // Eliminar cualquier botón de guardar PDF y ajustar estilos
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
      
      // Ajustar los estilos para la impresión
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      
      // Seleccionar el contenedor principal para asegurar que ocupa el espacio correcto
      const mainContainer = document.querySelector('.container') || document.querySelector('main') || document.body;
      if (mainContainer) {
        mainContainer.style.margin = '0';
        mainContainer.style.width = '100%';
        mainContainer.style.display = 'flex';
        mainContainer.style.flexDirection = 'row';
      }
      
      // Eliminar fondos blancos adicionales
      const allElements = document.querySelectorAll('*');
      for (const el of allElements) {
        if (el.style.backgroundColor === 'white' || 
            getComputedStyle(el).backgroundColor === 'rgb(255, 255, 255)') {
          el.style.backgroundColor = 'transparent';
        }
      }
      
      // Asegurar que la barra lateral se muestre correctamente
      const sidebar = document.querySelector('.sidebar') || 
                     document.querySelector('aside') || 
                     document.querySelector('.left-column');
      
      if (sidebar) {
        sidebar.style.height = '100%';
        sidebar.style.position = 'relative';
        sidebar.style.pageBreakInside = 'avoid';
      }
      
      // Asegurar que el contenido principal se muestre correctamente
      const mainContent = document.querySelector('.main-content') || 
                         document.querySelector('section') || 
                         document.querySelector('.right-column');
      
      if (mainContent) {
        mainContent.style.height = '100%';
        mainContent.style.position = 'relative';
        mainContent.style.pageBreakInside = 'avoid';
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
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }
        }
      `
    });
    
    console.log('Generando PDF...');
    
    // Generar PDF directamente
    const pdfPath = path.join(__dirname, 'CV-Jose-Giles-final.pdf');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      },
      scale: 0.75, // Reducir un poco la escala para ver más contenido
      displayHeaderFooter: false
    });
    
    console.log(`PDF generado correctamente: ${pdfPath}`);
    await browser.close();
    
  } catch (error) {
    console.error('Error:', error);
  }
})(); 