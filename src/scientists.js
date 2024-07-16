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
 * Obtiene los articulos de la BD
 * @returns {Promise<{id: string, title: string, description: string}[]>} Retorna un Array con los articulos
 */

export async function getData() {
  const data = await getScientists();

  return data;
}
/**
 * Crea un HTMLElement base del articulo a visualizar
 * @returns {Scientist}
 *
 */
export function createScientistBase() {
  const scientist = new Scientist();
  scientist.build();
  return scientist;
}

export class Scientist {
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
    this.container.classList.add("scientist");
    this.container.id = "scientist-";
    this.container.append(this.title);
    this.container.append(this.description);
  }
  /**
   * @returns {HTMLElement}
   */
  toInyect() {}
}
/**
 * Obtiene los datos de la BD, crea y construye el articulo que se va a mostrar al usuario
 *
 * @returns {Promise<Scientist[]>} HTMLElement[] - Retorna un Array con el HTMLElement creado e hidratado, listo para ser visualizado.
 */
export async function scientistFactory() {
  const data = await getScientists();
  const scientists = data.map((element) =>
    buildScientistCard(
      createScientistBase(),
      element.id,
      element.name,
      element.description,
    ),
  );
  return scientists;
}

/**
 * Hidrata con los datos obtenidos de la BD al HTMLScientistBase
 * @param {Scientist}scientist
 * @param {string} id
 * @param {string} title
 * @param {string} description
 * @returns {Scientist}
 */
export function buildScientistCard(scientist, id, title, description) {
  scientist.setProperty("container", (object) => {
    object.id = `${object.id}${id}`;
  });
  scientist.setProperty("title", (object) => {
    object.innerText = title;
  });
  scientist.setProperty("description", (object) => {
    object.innerText = description;
  });
  return scientist;
}
