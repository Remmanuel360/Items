// home.js (reemplazar por completo)

// array global para la lista base (se usará en el buscador)
let listaGlobal = [];

// buscador por nombre; recibe texto y actualiza la lista visible
function buscadorfuncion(texto) {
  const cont = document.getElementById("la-lista");
  if (!cont) return;

  if (texto.length >= 3) {
    // Si listaGlobal contiene items base ({name, url}) o detalles ({name, _base,...})
    const filtrados = listaGlobal.filter(item =>
      item.name.toLowerCase().includes(texto.toLowerCase())
    );
    cont.innerHTML = generarLista(filtrados);
  } else {
    cont.innerHTML = generarLista(listaGlobal);
  }
}

// generarLista maneja tanto items base ({name,url}) como items detallados (tienen ._base)
function generarLista(arrayItems) {
  // Si arrayItems es la lista base (objetos con .url) mostramos nombre y botón detalle
  // Si es detalle (contiene propiedades de detalle), también mostramos rareza/categoría si están
  let listaHTML = "";
  for (let i = 0; i < arrayItems.length; i++) {
    const it = arrayItems[i];

    // Si es un item detallado (viene con _base), usaremos su id del _base
    const baseUrl = it._base ? it._base.url : it.url;
    const id = baseUrl ? baseUrl.split("/").pop() : (it.index || it.name);

    // Preparamos líneas extra si vienen de detalle
    const rarity = it.rarity ? (typeof it.rarity === "string" ? it.rarity : it.rarity.name) : "";
    const category = it.equipment_category ? (typeof it.equipment_category === "string" ? it.equipment_category : it.equipment_category.name) : "";

    listaHTML += `
      <div class="c-lista-item" style="padding:8px;border-bottom:1px solid #ddd;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <p style="margin:0;font-weight:600;">${it.name}</p>
            ${category ? `<small>Categoría: ${category}</small>` : ""}
            ${rarity ? `<small style="margin-left:10px">Rareza: ${rarity}</small>` : ""}
          </div>
          <div>
            <button onclick="detalle('${id}')">Ver detalle</button>
          </div>
        </div>
      </div>
    `;
  }
  if (listaHTML === "") listaHTML = "<p>No hay items para mostrar.</p>";
  return listaHTML;
}

async function home() {
  const root = document.getElementById("root");
  if (!root) return;
  root.innerHTML = "Cargando...";

  // Cargar lista base desde Conexion("All")
  try {
    const base = await Conexion("All"); // usa la función de conexion.js
    listaGlobal = base; // guardar global para buscador
  } catch (err) {
    console.error("Error cargando lista base:", err);
    root.innerHTML = "<p>Error al cargar la lista.</p>";
    return;
  }

  // Barra de búsqueda y botones de categoría (puedes ajustar la lista)
  root.innerHTML = `
    <section style="margin-bottom:12px;">
      <input type="text" id="buscar" placeholder="Buscar ítem..." style="padding:8px;width:60%;" />
      <div id="filtros" style="margin-top:8px;"></div>
    </section>
    <section id="la-lista"></section>
  `;

  // Conectar buscador
  const input = document.getElementById("buscar");
  input.addEventListener("input", () => buscadorfuncion(input.value));

  // Lista de categorías (puedes añadir/quitar)
  const categorias = ["All", "Armor", "Weapon", "Wondrous Item", "Ring", "Rod", "Staff", "Wand"];
  const contFiltros = document.getElementById("filtros");
  categorias.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.style.marginRight = "6px";
    btn.addEventListener("click", async () => {
      // Si All, mostramos la lista base
      if (cat === "All") {
        listaGlobal = await Conexion("All");
        document.getElementById("la-lista").innerHTML = generarLista(listaGlobal);
        return;
      }
      // Si otra categoría, llamamos al filtro (que hará fetch de detalles necesarios)
      document.getElementById("la-lista").innerHTML = "Cargando...";
      const resultado = await Conexion(cat);
      // resultado son items detallados (con propiedades de detalle)
      listaGlobal = resultado; // actualizar buscador para buscar dentro de resultados filtrados
      document.getElementById("la-lista").innerHTML = generarLista(resultado);
    });
    contFiltros.appendChild(btn);
  });

  // Mostrar lista base inicialmente
  document.getElementById("la-lista").innerHTML = generarLista(listaGlobal);
}
