import { articleFactory } from "./src/articles.js";
import { health } from "./src/service.js";

async function init() {
  console.log("Hola, se inicializa function init()");
  /*
   * Obtenemos los articulos
   * */
  await health();
  const articles = await articleFactory();
  console.log(articles);
  const articlesDiv = document.getElementById("articles");
  /**
   *  Inyectamos los articulos creados con JS en el DOM
   */
  articles.map((e) => articlesDiv.append(e.container));

  return;
}

init();
