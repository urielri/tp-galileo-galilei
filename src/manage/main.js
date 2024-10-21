import { health } from "../service.js";
import { finder } from "../utils.js";
import { manageFactory, formModal } from "./manage.js";
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

  /**
   * Obtenemos los tags
   */
  const tags = await tagFactory(manageFactory);
  const tagsDiv = document.getElementById("tags");

  /**
   * Inyectamos los tags al DOM
   */
  tags.map((e) => tagsDiv.append(e.component));

  /**
   * Se agrega la funcionalidad al buscador
   */
  await finder(manageFactory);
  /**
   * Se inyecta los items
   */
  await manageFactory("default");

  /**
   * Agregamos el evento click al boton Crear Scientist
   */
  document.getElementById("add").addEventListener("click", () => {
    formModal("Crear scientist");
  });
}

await init();
