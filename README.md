# Portal TI - Nova Servicios (EA1)

## Datos del Estudiante
* **Nombre y Apellidos:** [Sanchez Quispe Juan Carlos]
* **Curso:** Desarrollo de Entornos Web · CPEX
* **Fecha:** 23 de septiembre de 2026
* **Caso:** Nova Servicios S.A.C.
* **Punto de Partida:** Proyecto Base de la Semana 2 (`portal-ti-base`).

---

## 1. Explicación de Decisión CSS (Cascada y Especificidad)
* **Baja Especificidad y Mantenibilidad:** Se definió la paleta global de colores en `:root` (`--primary-color`, `--text-dark`, etc.) para evitar el uso de `!important`.
* **Combinador Hijo Directo:** Se implementó `.services-grid > .card` para aplicar las propiedades de Flexbox/Grid únicamente a las tarjetas directas de la rejilla, evitando efectos no deseados sobre elementos anidados dentro de cada tarjeta.
* **Selector de Atributo:** Se aplicó `button[type="submit"]` para garantizar estilos específicos en botones de envío con mayor especificidad semántica que las clases estándar.

---

## 2. Aporte Individual Obligatorio (3 Cambios Propios)

### Cambio 1: Ampliación de Contenido del Caso
* **Archivo:** `public/index.html`
* **Cambio:** Incorporación de la propuesta del caso **Nova Servicios**: creación de 4 tarjetas de servicio técnico diferenciadas, 5 preguntas frecuentes (FAQs) agrupadas en 2 categorías mediante el elemento semántico `<details>`, y un bloque de contacto con horarios corporativos ficticios.
* **Evidencia:** Archivo `index.html` y captura `P01_navegacion.png`.

### Cambio 2: Mejora Técnica de HTML y CSS
* **Archivos:** `public/index.html` y `public/assets/css/styles.css`
* **Cambio:** Implementación de un enlace de accesibilidad `.skip-link` para saltar al contenido principal con navegación por teclado, foco visible en controles con `:focus-visible` y maquetación responsiva limpia utilizando **CSS Grid** (`repeat(4, 1fr)`) en escritorio y **Flexbox** en la barra superior.
* **Evidencia:** Capturas `P02_movil_320px.png`, `P03_tablet_768px.png` y `P04_escritorio_1440px.png`.

### Cambio 3: Corrección Detectada Durante Pruebas
* **Archivos:** `public/assets/css/styles.css` y `public/assets/js/ui.js`
* **Cambio:** Integración de control de accesibilidad mediante el teclado (cierre del menú hamburguesa al presionar la tecla `Escape`) y alternancia interactiva del atributo `aria-expanded` entre `true` y `false`.
* **Evidencia:** Matriz de pruebas (Prueba P05).

---

## 3. Registro de 2 Problemas Reales Corregidos

### Problema 1: Desbordamiento del menú móvil en anchos de 320 px
* **Antes:** El menú de navegación permanecía ocupando espacio vertical en el DOM en dispositivos móviles aun cuando estaba oculto visualmente, generando un scroll innecesario.
* **Después:** Se configuró `display: none` en la regla base del `.nav-menu` y se maneja la apertura controlada mediante la clase `.is-active`, garantizando que en 320 px el contenido no se desborde ni genere scroll horizontal.

### Problema 2: Agrupación incompleta en las opciones de prioridad del formulario
* **Antes:** Las opciones de selección única (Baja, Media, Alta) estaban estructuradas como botones radio sueltos sin contexto semántico para lectores de pantalla.
* **Después:** Se encerraron en un elemento `<fieldset>` con un `<legend>Prioridad de la incidencia</legend>` visible, asegurando la asociación accesible para usuarios con lector de pantalla según las pautas WCAG.

---

## 4. Declaración de Herramientas de Apoyo
* **Herramienta:** IA Gemini.
* **Solicitud realizada:** Asistencia para el estructurado HTML5 semántico, reglas CSS Grid/Flexbox y la elaboración de la matriz de pruebas.
* **Verificación efectuada:** Comprobación manual mediante extensión Live Server en VS Code, validando el recorrido con la tecla `Tab`, inspección de contraste de color y prueba de los tres tamaños de pantalla requeridos.