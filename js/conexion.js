let objetosMagicos = [];

async function Conexion(filtro) {
  const res = await fetch(`https://www.dnd5eapi.co/api/2014/magic-items`);
  const data = await res.json();

  // data.results contiene todos los objetos mágicos
  let items = data.results;

  // Si se aplica un filtro, filtramos por nombre
  if (filtro && filtro !== "All") {
    items = items.filter(item =>
      item.name.toLowerCase().includes(filtro.toLowerCase())
    );
  }

  return items;
}

// Cargar todos los objetos mágicos al iniciar
async function General() {
  if (objetosMagicos.length === 0) {
    objetosMagicos = await Conexion("All");
  }
  home(); // esta función debe mostrar los datos en la página
}

General();

// Función para aplicar un filtro desde el frontend
async function FiltroConexion(filtro) {
  document.getElementById("la-lista").innerHTML = "";
  objetosMagicos = await Conexion(filtro);
  const listaHTML = generarLista(objetosMagicos);
  document.getElementById("la-lista").innerHTML = listaHTML;
}