import { health } from "./src/service.js";
import { scientistFactory } from "./src/scientists.js";
import { tagFactory } from "./src/tags.js";
import { finder } from "./src/utils.js";
export async function init() {
  const connection = await health();
  console.log("Hola, se inicializa function init()");
  if (!connection.status)
    throw new Error("No se pudo conectar con el servidor");

  /**
   * Obtenemos los tags
   */
  const tags = await tagFactory(scientistFactory);
  const tagsDiv = document.getElementById("tags");

  /**
   * Inyectamos los tags al DOM
   */
  tags.map((e) => tagsDiv.append(e.component));

  await finder(scientistFactory);
  await scientistFactory("default");
}

await init();
