async function original() {
  const root = document.getElementById("root");
  root.innerHTML = "Cargando objeto aleatorio...";

  try {
    // Obtener la lista básica (si no está cargada)
    if (items.length === 0) {
      const res = await fetch("https://www.dnd5eapi.co/api/2014/magic-items");
      const data = await res.json();
      items = data.results;
    }

    // Elegir un objeto aleatorio de la lista
    const randomItem = items[Math.floor(Math.random() * items.length)];

    // Obtener sus detalles
    const resDetalle = await fetch(`https://www.dnd5eapi.co${randomItem.url}`);
    const data = await resDetalle.json();

    // Procesar rareza y descripción
    const rarityVal = data.rarity
      ? (typeof data.rarity === "string" ? data.rarity : data.rarity.name)
      : "Desconocida";
    const descripcion = data.desc ? data.desc.join("<br><br>") : "Sin descripción disponible.";

    // Mostrar en pantalla
    root.innerHTML = `
      <section class="c-detalle">
        <h2>${data.name}</h2>
        <p><strong>Rareza:</strong> ${rarityVal}</p>
        <p><strong>Categoría:</strong> ${data.equipment_category?.name || "No especificada"}</p>
        <p><strong>Descripción:</strong></p>
        <p>${descripcion}</p>
        <br>
        <button onclick="original()">🔁 Otro objeto aleatorio</button>
        <button onclick="home()">🏠 Volver</button>
      </section>
    `;
  } catch (error) {
    root.innerHTML = `
      <p>Error al cargar el objeto. Intenta nuevamente.</p>
      <button onclick="original()">Reintentar</button>
      <button onclick="home()">Volver</button>
    `;
    console.error(error);
  }
}
