import {
  getScientists,
  getScientistsByTag,
  getScientistsByTextSearched,
} from "./service.js";
import { createPortal } from "./utils.js";

/**
 * @typedef {'default' | 'tag' | 'search'} Type
 * @typedef  {{id: string, name: string, about: string, tags: string[], phrases: string[], web: string, career: string, image: string }} ScientistModel
 */
/**
 * @param {Type} type
 * @param {string | undefined} value
 * Obtiene los articulos de la BD
 * @returns {Promise<ScientistModel[]>} Retorna un Array con los articulos
 */
export async function getData(type, value) {
  if (type === "search" && !value)
    throw new Error("Value no debe ser undefined");

  /**
   * @type {ScientistModel[] | null}
   */
  let response = null;
  switch (type) {
    case "default":
      response = await getScientists();
      break;
    case "tag":
      response = await getScientistsByTag(value);
      break;
    case "search":
      response = await getScientistsByTextSearched(value);
      break;
  }

  return response;
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
    this.image.classList.add("avatar");
    this.aboutContainer.classList.add("aboutContainer");

    /**
     * EVENTS
     */

    this.container.addEventListener("click", () => {
      if (!this.container.classList.contains("modal")) {
        createPortal();
        this.container.classList.add("modal");
      }
    });

    /*
     * CONTAINER
     */
    this.container.id = "scientist-";
    /** BIND */
    this.container.append(this.image);
    this.container.append(this.aboutContainer);
    this.container.append(this.web);
    this.container.append(this.about);
    this.container.append(this.phrases);
    //this.container.append(this.tags.cloneNode());

    /**
     * ABOUT CONTAINER
     */
    this.aboutContainer.id = "aboutContaienr";

    /**
     * CAREER
     * */
    this.career.classList.add("career");

    /** BIND */
    this.aboutContainer.append(this.name);
    this.aboutContainer.append(this.career);
    this.aboutContainer.append(this.tags);
  }
}

/**
 * Hidrata con los datos obtenidos de la BD al HTMLScientistBase
 * @param {Scientist}scientist
 * @param {ScientistModel} data
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

  scientist.setProperty("career", (object) => {
    object.innerText = career;
  });

  scientist.setProperty("tags", (object) => {
    tags.map((value) => object.append(tagComponent(value)));
  });

  scientist.setProperty("web", (object) => {
    hyperlinkComponent(object, name, web);
  });

  scientist.setProperty("phrases", (object) => {
    phrasesComponent(object, phrases);
  });

  scientist.container.insertBefore(
    scientist.tags.cloneNode(true),
    scientist.web.nextSibling,
  );
  return scientist;
}

/**
 * Obtiene los datos de la BD, crea y construye el articulo que se va a mostrar al usuario
 * @param {Type | undefined} type
 * @param {string | undefined} value
 * @returns {Promise<void>}
 */
export async function scientistFactory(type, value) {
  /*
   * Obtenemos los articulos
   */
  const data = await getData(type, value);
  const scientists = data.map((element) =>
    buildScientistCard(createScientistBase(), element),
  );

  const scientistsDiv = document.getElementById("articles");
  if (scientistsDiv.children.length > 0) {
    let l = scientistsDiv.children.length;
    for (let i = 0; i < l; i++) {
      scientistsDiv.children[0].remove();
    }
  }
  /**
   *  Inyectamos los articulos creados con JS en el DOM
   */
  scientists.map((e) => scientistsDiv.append(e.container));
}

/**
 * @param {string} value
 */
function tagComponent(value) {
  const tag = document.createElement("div");
  tag.classList.add("tag");
  const span = document.createElement("span");
  span.innerText = value;
  tag.append(span);
  return tag;
}

/**
 * @param {HTMLElement} container
 * @param {string} text
 * @param {string} href
 */
function hyperlinkComponent(container, text, href) {
  container.classList.add("name");
  container.href = href;
  container.target = "_blank";
  const span = document.createElement("span");
  span.innerText = text;
  const icon = document.createElement("img");
  icon.src = "/src/public/hyperlink.svg";
  container.append(span);
  container.append(icon);
}

/**
 * @param {HTMLElement} container
 * @param {string[]} phrases
 */
function phrasesComponent(container, phrases) {
  const title = document.createElement("h3");
  title.innerText = "Frases";
  container.append(title);
  phrases.map((value) => {
    const p = document.createElement("p");
    p.innerText = value;
    container.append(p);
  });
}
