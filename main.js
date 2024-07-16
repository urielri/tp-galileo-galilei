import { health } from "./src/service.js";

export async function init() {
  const connection = await health();
  console.log("Hola, se inicializa function init()");
  if (!connection.status)
    throw new Error("No se pudo conectar con el servidor");
  /*
   * Obtenemos los articulos
   * */
  // const scientists = await scientistFactory();
  const scientists = [];
  console.log(articles);
  //  const articlesDiv = document.getElementById("articles");
  /**
   *  Inyectamos los articulos creados con JS en el DOM
   */
  // scientists.map((e) => articlesDiv.append(e.container));
}

window.addEventListener("load", async (e) => {
  e.preventDefault();
  await init();
});
