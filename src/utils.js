/**
 * Le damos funcionalidad al input text que va a ser nuestro buscador
 *
 * El timeout previene una saturacion a la APIrest, asi, una vez que el usuario deja de escribir,
 * recien entonces se realizara la consulta al servidor
 * @param {function} factory
 */
export async function finder(factory) {
  const input = document.getElementById("search");
  let value = "";
  let timer = null;
  input.addEventListener("keyup", async (event) => {
    let render = false;
    value = event.target.value;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      render = true;
      if (render) {
        value !== "" && factory.call(this, "search", value);
        value === "" && factory.call(this, "default");
        render = false;
      }
    }, 1000);
  });
}

/**
 * Creamos el componente boton que va a ser reutilizable
 * @returns {HTMLButtonElement}
 */
export class Button {
  text = "";
  callback = undefined;
  priority = "";
  id = "";
  element = document.createElement("button");
  /**
   * @param {string} text
   * @param {Function} callback
   * @param {'primary'|'secondary'} priority
   * @param {string} id
   */
  constructor(text, callback, priority, id) {
    this.text = text;
    this.callback = callback;
    this.priority = priority;
    this.id = id;
  }

  build(style) {
    this.element.innerText = this.text;
    this.element.id = this.id;
    this.element.classList.add("button", this.priority);
    this.element.addEventListener("onclick", this.callback);
    this.element.onclick = this.callback;
    style && (this.element.style = style);
    return this.element;
  }
}

/**
 * Creamos el portal donde se mostrara la modal
 */
export function createPortal() {
  const portal = document.createElement("div");
  portal.classList.add("portal");
  portal.id = "portal";
  portal.addEventListener("click", () => {
    const modal = document.getElementsByClassName("modal");
    modal[0].classList.remove("modal");
    document.body.classList.remove("modalOpen");
    portal.remove();
  });
  document.body.children[0].append(portal);
  return portal;
}

export function createModal(className) {
  const modal = document.createElement("div");
  modal.classList.add("modal", className);
  modal.id = "modal";
  return modal;
}
/**
 * @param {[Node]} children
 */
export function createForm(children, id) {
  const form = document.createElement("form");
  form.classList.add("form");
  form.id = id;
  children.map((e) => form.append(e));
  return form;
}

/**
 * Se construye el formulario para crear un nuevo scientist
 * @param {?Object} data
 */
export function scientistForm(data) {
  /**
   * @param {string} career
   * @param {string} name
   * @param {string} about
   * @param {string} image
   * @param {Array} tags
   * @param {Array} phrases
   * @param {string} web
   */
  let scientist = {
    career: "",
    name: "",
    about: "",
    image: "",
    tags: [],
    phrases: [],
    web: "",
  };

  if (data) scientist = data;

  const career = document.createElement("input");
  const name = document.createElement("input");
  const about = document.createElement("input");
  const image = document.createElement("input");
  const tags = document.createElement("input");
  const phrases = document.createElement("input");
  const web = document.createElement("input");

  career.type = "text";
  name.type = "text";
  about.type = "text";
  image.type = "text";
  tags.type = "text";
  phrases.type = "text";
  web.type = "text";

  name.name = "name";
  about.name = "about";
  image.name = "image";
  tags.name = "tags";
  phrases.name = "phrases";
  web.name = "web";

  career.placeholder = "Career";
  name.placeholder = "Name";
  about.placeholder = "About";
  image.placeholder = "Image";
  tags.placeholder = "Tags";
  phrases.placeholder = "Phrases";
  web.placeholder = "Web";

  career.value = scientist.career;
  name.value = scientist.name;
  about.value = scientist.about;
  image.value = scientist.image;
  tags.value = scientist.tags.join(",");
  phrases.value = scientist.phrases.join("\n");
  web.value = scientist.web;

  return createForm([career, name, about, image, tags, phrases, web], "form");
}
