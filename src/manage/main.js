import { health } from "../service.js";
import { finder } from "../utils.js";
import { manageFactory } from "./manage.js";
import { tagFactory } from "../tags.js";
import { getData } from "../scientists.js";

/**
 *
 * Se inicializa los recursos para la vista correspondiente
 *
 */

export async function init() {
  const checkConnection = await health();
  console.log("Estado del servidor", checkConnection.status);
  const inyect = document.getElementById("list");

  /**
   * Obtenemos los tags
   */
  const tags = await tagFactory();
  const tagsDiv = document.getElementById("tags");

  /**
   * Inyectamos los tags al DOM
   */
  tags.map((e) => tagsDiv.append(e.component));

  /**
   * Se agrega la funcionalidad al buscador
   */
  await finder(getData);
  /**
   * Se inyecta los items
   */
  inyect.append(...(await manageFactory()));
}

await init();
