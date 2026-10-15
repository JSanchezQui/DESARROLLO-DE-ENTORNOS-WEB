# Matriz de Pruebas Realizadas - Guía 5 (EA2)

- **Fecha:** 14 de octubre de 2026
- **Navegador:** Chromium (headless)
- **Entorno:** servidor local (`npm run dev`)
- **Commit probado:** último commit de la rama `feature/catalogo-dinamico` (ver la pestaña Commits del PR)

| ID     | Acción                               | Resultado esperado                        | Resultado real                                                            | Estado     |
| ------ | ------------------------------------ | ----------------------------------------- | ------------------------------------------------------------------------- | ---------- |
| **D1** | Cargar portal por HTTP               | Servicios del JSON en catálogo y select   | 5 tarjetas y 5 opciones (más la opción vacía) cargadas desde el JSON      | **Cumple** |
| **D2** | Agregar 5.° servicio en JSON         | Tarjeta y opción nuevas sin editar HTML   | El 5.° servicio aparece automáticamente                                   | **Cumple** |
| **D3** | Renombrar JSON                       | Error comprensible y carga bloqueada      | Muestra "No pudimos cargar los servicios" y el select queda deshabilitado | **Cumple** |
| **D4** | `id` como texto o prioridad inválida | Contrato rechazado                        | `validarContrato` rechaza tipos incorrectos y prioridades fuera de lista  | **Cumple** |
| **D5** | Cadena HTML en JSON                  | Texto literal sin ejecutar scripts        | Se renderiza como texto plano (`textContent`)                             | **Cumple** |
| **F1** | Enviar vacío                         | Foco en el primer error                   | El foco va a `#servicio` con mensaje; los 3 radios quedan `aria-invalid`  | **Cumple** |
| **F2** | Corregir un campo con error          | Se limpian el mensaje y `aria-invalid`    | Al cambiar el servicio, el mensaje desaparece                             | **Cumple** |
| **F3** | Correo con formato inválido          | Mensaje de correo inválido                | Muestra "Escribe un correo electrónico corporativo válido."               | **Cumple** |
| **F4** | Descripción solo con espacios        | Rechazo por menos de 10 caracteres útiles | Muestra el mensaje de longitud mínima                                     | **Cumple** |
| **F5** | Enviar válido con doble clic         | Una sola fila agregada y botón bloqueado  | Se registra una única solicitud `SOL-0001`                                | **Cumple** |
| **A1** | Abrir ayuda con teclado              | `Enter`/`Space` abre y `Esc` cierra       | El panel se abre, `Esc` lo cierra y el foco vuelve al botón               | **Cumple** |
| **R1** | Vista a 320 px                       | Sin scroll horizontal global              | `scrollWidth` = 320                                                       | **Cumple** |
| **R2** | Vista a 768 px                       | Sin scroll horizontal global              | `scrollWidth` = 768                                                       | **Cumple** |
| **R3** | Vista a 1024 px                      | Sin scroll horizontal global              | `scrollWidth` = 1024                                                      | **Cumple** |
