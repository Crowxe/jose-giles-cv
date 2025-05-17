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
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2 // Alta resolución
    });
    
    // Ruta al archivo HTML
    const htmlPath = path.join(__dirname, 'index.html');
    const htmlFileUrl = `file://${htmlPath}`;
    
    console.log('Cargando la página...');
    await page.goto(htmlFileUrl, { waitUntil: 'networkidle0' });
    
    // Esperar a que todos los elementos se carguen
    await page.waitForSelector('body', { timeout: 5000 });
    
    // Capturar toda la página como imagen
    console.log('Capturando imagen de la página...');
    await page.screenshot({
      path: 'CV-Jose-Giles.png',
      fullPage: true,
      omitBackground: false
    });
    
    console.log('Imagen PNG generada correctamente: CV-Jose-Giles.png');
    
    // Opcionalmente, convertir a PDF también
    console.log('Generando PDF...');
    await page.pdf({
      path: 'CV-Jose-Giles-completo.pdf',
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      landscape: false
    });
    
    console.log('PDF generado correctamente: CV-Jose-Giles-completo.pdf');
    await browser.close();
    
  } catch (error) {
    console.error('Error:', error);
  }
})(); 