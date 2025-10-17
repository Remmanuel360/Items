async function detalle(item) {
  document.getElementById("root").innerHTML = "Cargando detalle...";

  // Llamada al API de D&D 5e
  const res = await fetch(`https://www.dnd5eapi.co/api/2014/magic-items/${item}`);
  const data = await res.json();

  console.log(data.name);
  console.log(data.rarity);
  console.log(data.equipment_category);

  // Algunos objetos tienen descripción en forma de array
  const descripcion = data.desc ? data.desc.join("<br><br>") : "Sin descripción disponible.";

  // Obtener la rareza correctamente
  const rarityVal = data.rarity
    ? (typeof data.rarity === "string" ? data.rarity : data.rarity.name)
    : "Desconocida";

  // Mostrar detalle en la página
  document.getElementById("root").innerHTML = `
    <section class="c-detalle">
      <h2>${data.name}</h2>
      <p><strong>Rareza:</strong> ${rarityVal}</p>
      <p><strong>Categoría:</strong> ${data.equipment_category?.name || "No especificada"}</p>
      <p><strong>Descripción:</strong></p>
      <p>${descripcion}</p>
      <button onclick="home()">Volver</button>
    </section>
  `;
}
