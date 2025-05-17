// Este script prepara el CV para impresión a PDF
document.addEventListener('DOMContentLoaded', function() {
  const printButton = document.createElement('button');
  printButton.textContent = 'Guardar como PDF';
  printButton.id = 'print-button';
  printButton.addEventListener('click', function() {
    window.print();
  });
  
  // Agregar estilos para el botón
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    #print-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 10px 15px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      z-index: 9999;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    
    #print-button:hover {
      background-color: #2980b9;
    }
    
    @media print {
      #print-button {
        display: none;
      }
    }
  `;
  
  document.head.appendChild(styleElement);
  document.body.appendChild(printButton);
}); 