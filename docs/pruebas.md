# Registro de Pruebas Prácticas - Nova Servicios (EA1)

* **Fecha de ejecución:** 23 de septiembre de 2026
* **Navegador y Versión:** Google Chrome v128.0 (64-bit)
* **Entorno:** Live Server (Local) y Vercel Preview

| ID | Prueba | Resultado Esperado | Estado | Ruta de Evidencia |
|---|---|---|---|---|
| **P01** | Navegación y semántica | Todos los enlaces dirigen a su sección; el formulario se alcanza a 1 clic desde el inicio; estructura semántica correcta con `<h1>` único. | **Cumple** | `docs/capturas/P01_navegacion.png` |
| **P02** | Móvil de 320 px | La página y el formulario se navegan sin superposición, recortes ni scroll horizontal a 320 px de ancho. | **Cumple** | `docs/capturas/P02_movil_320px.png` |
| **P03** | Tablet de 768 px | Ajuste de la rejilla de tarjetas a 2 columnas y menú horizontal visible. | **Cumple** | `docs/capturas/P03_tablet_768px.png` |
| **P04** | Escritorio de 1440 px | Maquetación legible a 4 columnas en las tarjetas de servicio y ancho contenedor limitado a 1200 px. | **Cumple** | `docs/capturas/P04_escritorio_1440px.png` |
| **P05** | Teclado y zoom | Foco claramente visible al navegar con `Tab`; menú operable con `Enter`/`Space` y `Escape`; contenido utilizable al 200% de zoom. | **Cumple** | Verificado en demostración en vivo |
| **P06** | Formulario inválido | Validación adecuada al enviar campos vacíos, nombre de <3 caracteres, email sin formato o descripción <10 caracteres. | **Cumple** | `docs/capturas/P06_formulario_invalido.png` |
| **P07** | Formulario válido | Muestra la confirmación simulada al ingresar: Ana Pérez, ana@example.test, Hardware, Media y descripción de más de 10 caracteres. | **Cumple** | `docs/capturas/P07_formulario_valido.png` |
| **P08** | Calidad y Preview | Metadatos completos (`lang="es"`, viewport, description), buen contraste WCAG y ejecución de Lighthouse móvil. | **Cumple** | `docs/capturas/P08_lighthouse.png` |
