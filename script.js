// Lógica principal para productos dinámicos y persistencia con localStorage
/* =========================
   App: Lista de Supermercado
   Requisitos:
   - createElement + DOM dinámico
   - validación
   - marcar comprado (classList)
   - eliminar
   - contadores
   - localStorage (persistencia)
   - funciones reutilizables + comentarios
========================= */

/* ====== Selectores ====== */
const form = document.getElementById("productForm");
const productNameInput = document.getElementById("productName");
const productQtyInput = document.getElementById("productQty");
const productList = document.getElementById("productList");
const messageBox = document.getElementById("messageBox");

const totalCountEl = document.getElementById("totalCount");
const boughtCountEl = document.getElementById("boughtCount");
const pendingCountEl = document.getElementById("pendingCount");

const clearAllBtn = document.getElementById("clearAllBtn");

/* ====== Estado en memoria (fuente de verdad) ======
   Cada producto: { id, name, qty, bought }
*/
let products = [];

/* ====== Utilidades ====== */

// Genera un id simple (suficiente para este proyecto)
function generateId() {
  return Date.now().toString();
}

// Mensajes de UI (éxito o error)
function showMessage(text, type = "") {
  messageBox.textContent = text;
  messageBox.className = "message"; // reinicia clases
  if (type === "error") messageBox.classList.add("error");
  if (type === "success") messageBox.classList.add("success");

  // Limpiar mensaje después de un rato (opcional)
  if (text) {
    setTimeout(() => {
      messageBox.textContent = "";
      messageBox.className = "message";
    }, 2500);
  }
}

/* ====== Validación ====== */
function validateInputs(name, qty) {
  if (!name.trim()) {
    showMessage("❌ El nombre del producto no puede estar vacío.", "error");
    return false;
  }

  const qtyNumber = Number(qty);
  if (!Number.isFinite(qtyNumber) || qtyNumber <= 0) {
    showMessage("❌ La cantidad debe ser un número mayor que cero.", "error");
    return false;
  }

  return true;
}

/* ====== LocalStorage ======
   Guardar y recuperar lista
*/
const STORAGE_KEY = "supermarket_list_v1";

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return;
  try {
    products = JSON.parse(data);
  } catch (error) {
    // Si hay error, se reinicia para no romper la app
    products = [];
  }
}

/* ====== Render del DOM ======
   Renderiza toda la lista desde "products"
   (Esto evita repetir lógica y mantiene consistencia)
*/
function renderList() {
  // Limpiar UL antes de volver a dibujar
  productList.innerHTML = "";

  // Crear cada item usando createElement (requisito)
  products.forEach((product) => {
    const li = createProductElement(product);
    productList.appendChild(li);
  });

  updateCounters();
}

/* ====== Crear un item con createElement ====== */
function createProductElement(product) {
  const li = document.createElement("li");
  li.classList.add("item");
  li.dataset.id = product.id;

  if (product.bought) {
    li.classList.add("bought"); // requisito: classList para estilo
  }

  // Info (nombre + meta)
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("info");

  const nameSpan = document.createElement("span");
  nameSpan.classList.add("name");
  nameSpan.textContent = product.name;

  const metaSpan = document.createElement("span");
  metaSpan.classList.add("meta");
  metaSpan.textContent = `Cantidad: ${product.qty}`;

  infoDiv.appendChild(nameSpan);
  infoDiv.appendChild(metaSpan);

  // Botones
  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");

  const toggleBtn = document.createElement("button");
  toggleBtn.classList.add("btn", "btn-small", "btn-primary");
  toggleBtn.type = "button";
  toggleBtn.textContent = product.bought ? "Desmarcar" : "Comprado";

  toggleBtn.addEventListener("click", () => {
    toggleBought(product.id);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "btn-small", "btn-danger");
  deleteBtn.type = "button";
  deleteBtn.textContent = "Eliminar";

  deleteBtn.addEventListener("click", () => {
    deleteProduct(product.id);
  });

  buttonsDiv.appendChild(toggleBtn);
  buttonsDiv.appendChild(deleteBtn);

  // Armar LI
  li.appendChild(infoDiv);
  li.appendChild(buttonsDiv);

  return li;
}

/* ====== CRUD de productos ====== */
function addProduct(name, qty) {
  const newProduct = {
    id: generateId(),
    name: name.trim(),
    qty: Number(qty),
    bought: false,
  };

  products.push(newProduct);
  saveToLocalStorage();
  renderList();
  showMessage("✅ Producto agregado correctamente.", "success");
}

function toggleBought(id) {
  products = products.map((p) =>
    p.id === id ? { ...p, bought: !p.bought } : p
  );

  saveToLocalStorage();
  renderList();
}

function deleteProduct(id) {
  products = products.filter((p) => p.id !== id);
  saveToLocalStorage();
  renderList();
  showMessage("🗑️ Producto eliminado.", "success");
}

function clearAll() {
  products = [];
  saveToLocalStorage();
  renderList();
  showMessage("🧹 Lista borrada.", "success");
}

/* ====== Contadores ====== */
function updateCounters() {
  const total = products.length;
  const bought = products.filter((p) => p.bought).length;
  const pending = total - bought;

  totalCountEl.textContent = `Total: ${total}`;
  boughtCountEl.textContent = `Comprados: ${bought}`;
  pendingCountEl.textContent = `Pendientes: ${pending}`;
}

/* ====== Eventos ====== */
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = productNameInput.value;
  const qty = productQtyInput.value;

  if (!validateInputs(name, qty)) return;

  addProduct(name, qty);

  // Limpiar inputs
  productNameInput.value = "";
  productQtyInput.value = "";
  productNameInput.focus();
});

clearAllBtn.addEventListener("click", () => {
  clearAll();
});

/* ====== Inicialización ====== */
loadFromLocalStorage();

renderList();
Implementar lógica JavaScript para manejo de productos
