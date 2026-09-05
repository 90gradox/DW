# DESCARGA 90

Interfaz frontend estética y responsive para una web de análisis/descarga de contenido multimedia.

## Archivos
- index.html — estructura de la web.
- style.css — diseño, responsive y animaciones.
- script.js — interacción de plataformas, análisis visual simulado y FAQ.

## Abrir
Haz doble clic en `index.html` para ver la web localmente.

## Importante
Esta versión es el FRONTEND. El botón de análisis muestra una respuesta simulada.
Para realizar descargas reales necesitas un backend propio que procese únicamente contenido que tengas derecho a descargar y que respete las condiciones de las plataformas.

No incluye mecanismos para saltar DRM, controles de acceso ni restricciones técnicas.


## Corrección de la alerta
Se eliminó el `alert()` que mostraba el mensaje "La interfaz está lista..." al pulsar un formato.
Ahora los mensajes aparecen dentro de la página, sin ventanas emergentes.

También se añadió detección básica de plataforma por dominio para TikTok, Instagram, Facebook y YouTube.
