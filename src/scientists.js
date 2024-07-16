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
 * @returns {Promise<{id: string, name: string, about: string, tags: string[], phrases: string[], web: string, career: string, image: string }[]>} Retorna un Array con los articulos
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

/**
 * @param {HTMLElement} name
 * @param {HTMLElement} web
 */
function buildName(name, web) {}

/**
 * @param {HTMLElement} tags
 * @param {string[]} data
 */
function buildPhrases() {}

export class Scientist {
  container = document.createElement("article");
  aboutContainer = document.createElement("div");
  career = document.createElement("span");
  image = document.createElement("img");
  name = document.createElement("h3");
  about = document.createElement("p");
  phrases = document.createElement("div");
  tags = document.createElement("div");
  web = document.createElement("a");
  expand = false;
  constructor() {}

  /**
   * @param {'name' | 'tags'| 'image' | 'about' | 'container' | 'aboutContainer' | 'phrases' | 'web'} element
   * @param {(object: HTMLElement) => void} cb
   */
  setProperty(element, cb) {
    if (typeof element !== "string") return;
    cb(this[element]);
  }
  /**
   *
   * construye el componente a ser inyectado en el DOM
   */
  build() {
    /**
     * CLASSES
     */
    this.container.classList.add("scientist");
    this.tags.classList.add("tags");
    this.phrases.classList.add("phrases");
    this.web.classList.add("web");
    this.aboutContainer.classList.add("aboutContainer");

    /*
     * CONTAINER
     */
    this.container.id = "scientist-";
    /** BIND */
    this.container.append(this.image);
    this.container.append(this.aboutContainer);
    //buildName(this.name, this.web);
    this.container.append(this.tags.cloneNode());
    //this.container.append(this.about);
    buildPhrases(this.phrases);

    /**
     * ABOUT CONTAINER
     */
    this.aboutContainer.id = "aboutContaienr";

    /** BIND */
    this.aboutContainer.append(this.name);
    this.aboutContainer.append(this.career);
    this.aboutContainer.append(this.tags);
  }
}
/**
 * Obtiene los datos de la BD, crea y construye el articulo que se va a mostrar al usuario
 *
 * @returns {Promise<Scientist[]>} HTMLElement[] - Retorna un Array con el HTMLElement creado e hidratado, listo para ser visualizado.
 */
export async function scientistFactory() {
  const data = await getScientists();
  const scientists = data.map((element) =>
    buildScientistCard(createScientistBase(), element),
  );
  return scientists;
}

/**
 * Hidrata con los datos obtenidos de la BD al HTMLScientistBase
 * @param {Scientist}scientist
 * @param {{id: string, name: string, about: string, tags: string[], phrases: string[], web: string, career: string, image: string }} data
 * @returns {Scientist}
 */
export function buildScientistCard(
  scientist,
  { id, image, name, about, tags, phrases, web, career },
) {
  scientist.setProperty("container", (object) => {
    object.id = `${object.id}${id}`;
  });
  scientist.setProperty("image", (object) => {
    object.src = image;
  });
  scientist.setProperty("name", (object) => {
    object.innerText = name;
  });
  scientist.setProperty("about", (object) => {
    object.innerText = about;
  });
  scientist.setProperty("tags", (object) => {});
  return scientist;
}

function tagComponent() {
  const tag = document.createElement("div");
}
