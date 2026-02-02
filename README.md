# App Web - Lista de Supermercado (HTML + CSS + JS)

Aplicación web tipo lista de supermercado que permite agregar productos con cantidad, marcarlos como comprados, eliminarlos y mantener la información aunque se recargue la página gracias a `localStorage`.

## Funcionalidades implementadas
- Agregar productos dinámicamente (DOM con `createElement`)
- Validación:
  - No permitir producto vacío
  - Cantidad mayor que cero
  - Mensajes de error claros
- Marcar producto como “comprado” (uso de `classList`)
- Eliminar productos dinámicamente del DOM
- Contadores:
  - Total de productos
  - Productos comprados
  - Productos pendientes
- Persistencia con `localStorage`:
  - Guardar lista
  - Recuperarla al recargar

## Tecnologías usadas
- HTML5 (estructura semántica: header, main, section, footer)
- CSS3 (diseño tipo card, Flexbox/Grid, :hover y :focus)
- JavaScript (DOM, eventos, funciones reutilizables, localStorage)
- Git + GitHub (repositorio público e historial de commits)

## Instrucciones de uso
1. Clona o descarga el repositorio.
2. Abre `index.html` en tu navegador.
3. Escribe un producto y una cantidad, presiona **Agregar**.
4. Usa **Comprado** para marcar o **Eliminar** para quitar un producto.
5. Recarga la página y verás que la lista se conserva.

## Estructura del proyecto
- index.html
- styles.css
- script.js
- README.md

---

## Uso responsable de IA (EVIDENCIA)
**Prompts utilizados (ejemplos):**
1. "Explícame cómo guardar y recuperar un arreglo de objetos en localStorage con JSON.stringify y JSON.parse."
2. "Dame un ejemplo de createElement para construir un <li> con botones y eventos."
3. "Cómo estructurar contadores (total, comprados, pendientes) en JavaScript."

**Qué parte ayudó la IA:**
- Comprender la persistencia con `localStorage` (guardar/leer).
- Ideas de estructura para renderizado del DOM con funciones reutilizables.

**Qué modifiqué manualmente:**
- Integré la persistencia con mi estructura de datos `products`.
- Implementé `renderList()` como render principal para evitar duplicación.
- Ajusté validaciones y mensajes para que sean claros.
- Diseñé estilos CSS (card, badges, hover/focus) y estados "comprado".

**Declaración obligatoria (Opción A):**
Declaro que utilicé Inteligencia Artificial como apoyo para comprender partes del proyecto.
El código fue adaptado, modificado y entendido por mí.