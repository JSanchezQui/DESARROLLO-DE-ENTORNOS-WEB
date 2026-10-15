# Matriz de Pruebas Realizadas - Guía 5 (EA2)

- **Fecha:** 14 de octubre de 2026
- **Navegador:** Google Chrome (v128.0)
- **Entorno:** Live Server (`https://github.com/JSanchezQui/DESARROLLO-DE-ENTORNOS-WEB/pull/1`)
- **Commit Tested:** `[9ece4076f08ec725b82898a7630dc255f57ba4a9]`

| ID     | Acción                       | Resultado Esperado                      | Resultado Real                               | Estado     |
| ------ | ---------------------------- | --------------------------------------- | -------------------------------------------- | ---------- |
| **D1** | Cargar portal HTTP           | 4 servicios en catálogo y select        | Carga correcta los servicios desde JSON      | **Cumple** |
| **D2** | Agregar 5.° servicio en JSON | Tarjeta y opción nuevas sin editar HTML | Se visualiza el 5.° servicio automáticamente | **Cumple** |
| **D3** | Renombrar JSON               | Error comprensible y carga bloqueada    | Muestra "No pudimos cargar los servicios"    | **Cumple** |
| **D5** | Cadena HTML en JSON          | Texto literal sin ejecución script      | Se renderiza en pantalla como texto plano    | **Cumple** |
| **F1** | Enviar vacío                 | Foco en primer error                    | Enfoca el selector `#servicio` con mensaje   | **Cumple** |
| **F5** | Enviar válido duplicado      | Una sola fila agregada, botón bloqueado | Procesa un único ticket `SOL-0001`           | **Cumple** |
| **A1** | Abrir ayuda con teclado      | `Enter`/`Space` abre, `Esc` cierra      | El foco regresa al botón correctamente       | **Cumple** |
| **R1** | Probar 320px                 | Sin scroll horizontal global            | Contenido legible en vista móvil             | **Cumple** |
