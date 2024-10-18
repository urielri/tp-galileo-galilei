import { health } from "../service.js";
import { finder } from "../utils.js";
import { manageFactory } from "./manage.js";
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
   * Se agrega la funcionalidad al buscador
   */
  await finder(getData);
  /**
   * Se inyecta los items
   */
  inyect.append(...(await manageFactory()));
}

await init();
