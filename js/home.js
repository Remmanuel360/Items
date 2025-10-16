function buscadorfuncion(texto) {
  if (texto.length >= 3) {
    const filtrados = [];
    for (let i = 0; i < objetosMagicos.length; i++) {
      const nombre = objetosMagicos[i].name.toLowerCase();
      if (nombre.includes(texto.toLowerCase())) {
        filtrados.push(objetosMagicos[i]);
      }
    }
    let listaHTML = generarLista(filtrados);
    document.getElementById("la-lista").innerHTML = listaHTML;
  } else {
    let listaHTML = generarLista(objetosMagicos);
    document.getElementById("la-lista").innerHTML = listaHTML;
  }
}

function generarLista(arrayItems) {
  let listaHTML = "";
  for (let i = 0; i < arrayItems.length; i++) {
    // obtener el identificador del objeto (por ejemplo "amulet-of-health")
    let id = arrayItems[i].url.split("/")[4];
    listaHTML += `
      <div class="c-lista-item" onclick="detalle('${id}')">
        <p>${arrayItems[i].name}</p>
      </div>`;
  }
  return listaHTML;
}

function home() {
  document.getElementById("root").innerHTML = ""; // limpiar contenido anterior

  //  Buscador
  const buscador = document.createElement("input");
  buscador.classList.add("c-buscador");
  buscador.type = "text";
  buscador.placeholder = "Buscar objeto mágico...";
  buscador.addEventListener("input", () => {
    buscadorfuncion(buscador.value);
  });

  //  Contenedor de lista
  const contenedorItems = document.createElement("div");
  contenedorItems.id = "la-lista";
  contenedorItems.innerHTML = generarLista(objetosMagicos);

  // Agregar elementos al DOM
  document.getElementById("root").appendChild(buscador);
  document.getElementById("root").appendChild(contenedorItems);
}

