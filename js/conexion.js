// conexion.js (reemplazar por completo)

let items = []; // lista básica: { name, url }
let itemsDetalladosCache = {}; // cache por id -> detalle completo

// Obtener lista básica (si no está cargada)
async function obtenerListaBase() {
  if (items.length === 0) {
    const res = await fetch("https://www.dnd5eapi.co/api/magic-items");
    if (!res.ok) throw new Error("Error cargando lista base");
    const data = await res.json();
    items = data.results; // [{ name, url }, ...]
  }
  return items;
}

/**
 * Conexion(filtroCategory)
 * - filtroCategory: "All" o el nombre de la categoría (por ejemplo "Armor", "Wondrous Item")
 * - Si "All" devuelve la lista básica (rápida).
 * - Si otra cosa, devuelve items detallados que coinciden con esa categoría.
 */
async function Conexion(filtroCategory = "All") {
  await obtenerListaBase();

  if (filtroCategory === "All") {
    return items;
  }

  const filtrados = [];

  // Recorremos la lista básica; por cada item obtenemos detalle (cacheado)
  for (const it of items) {
    const id = it.url.split("/").pop();

    // Si no está en cache, lo traemos y guardamos
    if (!itemsDetalladosCache[id]) {
      try {
        const r = await fetch(`https://www.dnd5eapi.co/api/magic-items/${id}`);
        if (!r.ok) {
          // si falla con este item, lo saltamos
          console.warn("No se pudo cargar detalle de", id);
          continue;
        }
        const detalle = await r.json();
        // Guardar también el base para identificarlo si hace falta
        detalle._base = it;
        itemsDetalladosCache[id] = detalle;
      } catch (err) {
        console.warn("Error fetch detalle:", err, id);
        continue;
      }
    }

    const detalle = itemsDetalladosCache[id];

    // equipment_category puede ser objeto o undefined
    const cat = detalle.equipment_category;
    const catName = cat ? (typeof cat === "string" ? cat : cat.name) : "";

    if (catName.toLowerCase() === filtroCategory.toLowerCase()) {
      filtrados.push(detalle);
    }
  }

  return filtrados;
}

// Función que llama la interfaz para filtrar y actualizar la lista (usada por home.js)
async function FiltroConexion(filtro) {
  const cont = document.getElementById("la-lista");
  if (!cont) return;
  cont.innerHTML = "Cargando...";
  try {
    const resultado = await Conexion(filtro);
    cont.innerHTML = generarLista(resultado);
  } catch (err) {
    console.error("Error en FiltroConexion:", err);
    cont.innerHTML = "<p>Error al filtrar.</p>";
  }
}
