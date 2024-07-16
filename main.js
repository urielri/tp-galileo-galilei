import { health } from "./src/service.js";
import { scientistFactory } from "./src/scientists.js";
export async function init() {
  const connection = await health();
  console.log("Hola, se inicializa function init()");
  if (!connection.status)
    throw new Error("No se pudo conectar con el servidor");
  /*
   * Obtenemos los articulos
   * */
  const scientists = await scientistFactory();
  const scientistsDiv = document.getElementById("articles");
  /**
   *  Inyectamos los articulos creados con JS en el DOM
   */
  scientists.map((e) => scientistsDiv.append(e.container));
}

await init();
