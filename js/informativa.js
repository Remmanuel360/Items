function informativa() {
  const root = document.getElementById("root");

  root.innerHTML = `
    <section class="c-informativa">
      <h2>Curiosidades del Mundo de Dungeons & Dragons</h2>
      <p>Dungeons & Dragons (D&D) es el juego de rol más famoso del mundo, lleno de aventuras, magia y criaturas fantásticas. 
      Aquí tienes algunas curiosidades sobre su universo:</p>

      <ul class="curiosidades-lista">
        <li>🎲 El dado de 20 caras, conocido como <strong>d20</strong>, es el corazón del sistema. Se usa para decidir el éxito o el fracaso de casi todas las acciones.</li>
        <li>🧙 Algunos objetos legendarios, como la <strong>Espada de Kas</strong> o el <strong>Libro del Exaltado</strong>, son únicos en todo el multiverso.</li>
        <li>🐉 El primer monstruo diseñado para D&D fue el <strong>Beholder</strong>, una criatura flotante con múltiples ojos mágicos.</li>
        <li>📜 En el manual original de 1974, muchos objetos mágicos se inspiraron directamente en los mitos de Tolkien, Lovecraft y el folclore medieval.</li>
        <li>⚔️ Existen más de <strong>500 objetos mágicos</strong> diferentes en la quinta edición de D&D, cada uno con propiedades y rarezas distintas.</li>
        <li>🕯️ En una campaña típica, los objetos mágicos no solo sirven para el combate, sino también para resolver acertijos o abrir nuevas rutas de historia.</li>
      </ul>

      <p><em>“El poder de un héroe no está en su espada, sino en su ingenio.”</em></p>
      <button onclick="home()">Volver</button>
    </section>
  `;
}
