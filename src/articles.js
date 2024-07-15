import { getScientists } from "./service.js";

const items = [
  {
    id: "0",
    name: "Harry",
    description:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.",
  },
  {
    id: "1",
    name: "Hendrick",
    description:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.",
  },
  {
    id: "2",
    name: "Tomshon",
    description:
      "hola pabloBut I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.",
  },
];

/**
 * Function getArticles
 * Obtiene los articulos de la BD
 * @returns {{id: string, title: string, description: string}[]} Retorna un Array con los articulos
 */

export async function getArticles() {
  const data = await getScientists();

  return data;
}

/**
 * Function createArticle
 * Crea un HTMLElement base del articulo a visualizar
 * @returns {Article}
 *
 */
export function createArticleBase() {
  //const containerArticle = document.createElement("article");
  /**
   * Aplico propiedades basicas al container
   */
  //  containerArticle.classList.add("article");
  // containerArticle.id = "article-";

  // const title = document.createElement("h3");
  const article = new Article();
  article.build();
  return article;
}

export class Article {
  container = document.createElement("article");
  title = document.createElement("h3");
  description = document.createElement("p");
  constructor() {}

  /**
   * @param {'title' | 'description' | 'container'} element
   * @param {(object: HTMLElement) => void} cb
   */
  setProperty(element, cb) {
    if (typeof element !== "string") return;
    cb(this[element]);
  }

  build() {
    this.container.classList.add("article");
    this.container.id = "article-";
    this.container.append(this.title);
    this.container.append(this.description);
  }
  /**
   * @returns {HTMLElement}
   */
  toInyect() {}
}
/**
 * Function articleFactory
 * Obtiene los datos de la BD, crea y construye el articulo que se va a mostrar al usuario
 *
 * @returns {Article[]} HTMLElement[] - Retorna un Array con el HTMLElement creado e hidratado, listo para ser visualizado.
 */
export async function articleFactory() {
  const data = await getArticles();
  const articles = data.map((element) =>
    buildArticleCard(
      createArticleBase(),
      element.id,
      element.name,
      element.description,
    ),
  );
  return articles;
}

/**
 * Function buildArticleCard
 * Hidrata con los datos obtenidos de la BD al HTMLArticleBase
 * @param {Article} article
 * @param {string} id
 * @param {string} title
 * @param {string} description
 * @returns {Article}
 */
export function buildArticleCard(article, id, title, description) {
  article.setProperty("container", (object) => {
    object.id = `${object.id}${id}`;
  });
  article.setProperty("title", (object) => {
    object.innerText = title;
  });
  article.setProperty("description", (object) => {
    object.innerText = description;
  });
  return article;
}
