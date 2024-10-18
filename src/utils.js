/**
 * Le damos funcionalidad al input text que va a ser nuestro buscador
 *
 * El timeout previene una saturacion a la APIrest, asi, una vez que el usuario deja de escribir,
 * recien entonces se realizara la consulta al servidor
 * @param {function} factory
 */
export async function finder(factory) {
  const input = document.getElementById("search");
  let value = "";
  let timer = null;
  input.addEventListener("keyup", async (event) => {
    let render = false;
    value = event.target.value;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      render = true;
      if (render) {
        value !== "" && factory.call(this, "search", value);
        value === "" && factory.call(this, "default");
        render = false;
      }
    }, 1000);
  });
}

/**
 * Creamos el componente boton que va a ser reutilizable
 * @returns {HTMLButtonElement}
 */
export class Button {
  /**
   * @param {string} text
   * @param {function} callback
   * @param {'primary'|'secondary'} priority
   */
  constructor(text, callback, priority) {
    return this.build(text, callback, priority);
  }

  build(text, callback, priority) {
    const button = document.createElement("button");
    button.innerText = text;
    button.classList.add("button", priority);
    button.addEventListener("click", callback);
    return button;
  }
}
