# DESCARGA 90

Proyecto listo para publicar el **frontend en GitHub Pages** y ejecutar el backend por separado.

## 1. Publicar en GitHub Pages

Sube:
- `index.html`
- `style.css`
- `script.js`
- `assets/`

En GitHub: **Settings → Pages → Deploy from branch → main → /(root)**.

## 2. Backend

La carpeta `backend/` contiene un servidor Node.js que descarga **URLs directas a archivos de video** que sean públicamente accesibles.

En el backend:

```bash
npm install
npm start
```

Luego, en `script.js`, cambia:

```js
const API_BASE = "";
```

por la URL pública de tu backend, por ejemplo:

```js
const API_BASE = "https://tu-backend.example.com";
```

## Importante

GitHub Pages no ejecuta Node.js; por eso el backend debe estar alojado en otro servicio.

Esta plantilla no incluye extracción/scraping de TikTok, Instagram, Facebook o YouTube. Para esas plataformas debes utilizar APIs o mecanismos autorizados y respetar sus términos de servicio y los derechos sobre el contenido.

## Estructura

```text
Descarga90/
├── index.html
├── style.css
├── script.js
├── assets/
└── backend/
    ├── package.json
    └── server.js
```
