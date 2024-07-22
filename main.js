import { health } from "./src/service.js";
import { scientistFactory } from "./src/scientists.js";
import { tagFactory } from "./src/tags.js";
export async function init() {
  const connection = await health();
  console.log("Hola, se inicializa function init()");
  if (!connection.status)
    throw new Error("No se pudo conectar con el servidor");

  /**
   * Obtenemos los tags
   */
  const tags = await tagFactory();
  const tagsDiv = document.getElementById("tags");

  /**
   * Inyectamos los tags al DOM
   */
  tags.map((e) => tagsDiv.append(e.component));

  await finder();
  await scientistFactory("default");
}

/**
 * Le damos funcionalidad al input text que va a ser nuestro buscador
 *
 * El timeout previene una saturacion a la APIrest, asi, una vez que el usuario deja de escribir,
 * recien entonces se realizara la consulta al servidor
 */
async function finder() {
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
        value !== "" && scientistFactory("search", value);
        value === "" && scientistFactory("default");
        render = false;
      }
    }, 1000);
  });
}

await init();
