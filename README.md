# Torneo Pacelli

Repositorio para la página del Torneo Pacelli.

## Estructura de archivos

- `index.html`: página principal.
- `style.css`: estilos CSS.
- `bracket.js`: lógica para generar el bracket desde Google Sheets.

## Configuración

1. Clona este repositorio en tu cuenta de GitHub:
   ```bash
   git clone https://github.com/Wina05/torneo-pacelli.git
   ```
2. Ve a [GitHub Pages](https://github.com/Wina05/torneo-pacelli/settings/pages) en la configuración del repositorio.
3. En "Source", selecciona la rama `main` y la carpeta `/` (root). Guarda los cambios.
4. Espera unos minutos y tu sitio estará disponible en `https://Wina05.github.io/torneo-pacelli/`.

## Personalización

- Reemplaza `TU_GOOGLE_FORM_URL` en `index.html` con la URL de tu formulario de Google.
- Ajusta premios y reglas en la sección correspondiente de `index.html`.
- La contraseña de administrador para generar el bracket es `admin123`. Puedes cambiarla en `bracket.js`.

## Uso

- Accede al sitio.
- Haz clic en "Generar Enfrentamientos" (requiere contraseña).
- Si hay 3 equipos, aparece "Semifinal Triangular".
