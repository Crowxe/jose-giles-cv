# CV Interactivo - SPA Bilingüe

Esta es una aplicación de página única (SPA) simple para mostrar tu currículum vitae con soporte para múltiples idiomas.

## Características

- Diseño responsivo que se adapta a diferentes tamaños de pantalla
- Cambio de idioma dinámico entre español e inglés
- Diseño con barra lateral y línea de tiempo para experiencias laborales
- Proyectos destacados para cada experiencia laboral
- Modo de edición secreto que permite:
  - Editar todos los textos del CV
  - Añadir nuevas experiencias laborales
  - Eliminar experiencias existentes
  - Añadir nuevos ítems a cada experiencia

## Cómo usar

1. Abre el archivo `index.html` en tu navegador para ver el CV
2. Utiliza el botón de cambio de idioma en la parte superior para alternar entre español e inglés
3. Para acceder al modo de edición, añade `?secret_edit=jose123` al final de la URL
4. En modo edición, realiza los cambios que necesites:
   - Haz clic en cualquier texto para editarlo
   - Usa el botón "Añadir Experiencia" para agregar una nueva entrada de trabajo
   - Usa el botón "Eliminar" para quitar experiencias
   - Usa el botón "Añadir ítem" para agregar nuevas responsabilidades/logros a cada experiencia
5. Haz clic en "Guardar Cambios" cuando hayas terminado
6. Si quieres cancelar los cambios, haz clic en "Cancelar"

## Estructura de archivos

- `index.html` - Estructura HTML del CV
- `styles.css` - Estilos CSS para el diseño del CV
- `script.js` - Funcionalidad JavaScript para la edición y cambio de idioma
- `print.js` - Funcionalidad para imprimir o exportar como PDF desde el navegador

## Idiomas soportados

- Español
- Inglés

La preferencia de idioma seleccionada se guarda en el navegador y se recuerda en futuras visitas.

## Implementación en GitHub Pages

Este CV está diseñado para funcionar perfectamente en GitHub Pages. Para implementarlo:

1. Asegúrate de que el repositorio sea público
2. Ve a la sección Settings > Pages de tu repositorio
3. Selecciona la rama principal (main o master) como fuente
4. Espera unos minutos y tu CV estará disponible en `https://[tu-usuario].github.io/[nombre-repositorio]/`

## Funciones adicionales

Incluye scripts para generar versiones PDF del CV utilizando diversas técnicas:
- Captura de pantalla automatizada
- Conversión directa a PDF
- Generación de PDF multipágina

## Limitaciones actuales

- Los cambios en modo edición no se guardan permanentemente (se pierden al cerrar el navegador)

## Futuras mejoras

Para una implementación más completa, podrías:

1. Conectar a una base de datos para guardar permanentemente los cambios
2. Añadir más idiomas adicionales
3. Implementar un sistema de autenticación más robusto para el modo edición
4. Permitir subir y cambiar fotos de perfil 