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
  document.body.classList.add("modalOpen");
  const invisibleDiv = document.createElement("div");
  invisibleDiv.classList.add("invisible");
  portal.append(invisibleDiv);
  invisibleDiv.addEventListener("click", () => {
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
  document.getElementById("portal").append(modal);
  return modal;
}
/**
 * @param {[Node]} children
 */
export function createForm(children, id) {
  const form = document.createElement("form");
  form.classList.add("form");
  form.id = id;
  let prev = null;
  let col = null;
  children.map((e) => {
    const element = new Label(e.dataset.display, e.id).build();
    element.appendChild(e);

    prev = element;

    if (e.dataset.cols === "1") {
      form.append(element);
    }

    if (!col) {
      col = document.createElement("div");
      col.classList.add("col");
    }

    if (
      e.dataset.cols === "2" &&
      e.dataset.cols === prev.children[1].dataset.cols
    ) {
      col.append(prev, element);
      if (col.children.length === 2) {
        form.append(col);
        col = null;
      }
    }
  });
  return form;
}
export class Label {
  text = "";
  id = "";
  constructor(text, id) {
    this.text = text;
    this.id = id;
  }
  build() {
    const label = document.createElement("label");
    const text = document.createElement("span");
    text.innerText = this.text;
    label.append(text);
    label.htmlFor = this.id;
    return label;
  }
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
  const about = document.createElement("textarea");
  const image = document.createElement("input");
  const web = document.createElement("input");
  const multipleTags = multiple("_tags", "tags", "Tag", [...scientist.tags]);
  const multiplePhrases = multiple("_phrases", "phrases", "Frases", [
    ...scientist.phrases,
  ]);
  career.type = "text";
  name.type = "text";
  image.type = "text";
  web.type = "text";

  name.name = "name";
  about.name = "about";
  image.name = "image";
  web.name = "web";
  career.name = "career";

  name.id = "_name";
  about.id = "_about";
  image.id = "_image";
  web.id = "_web";
  career.id = "_career";

  career.placeholder = "Carrera";
  name.placeholder = "Nombre";
  about.placeholder = "Acerca de";
  image.placeholder = "Url";
  web.placeholder = "Web";

  career.value = scientist.career;
  name.value = scientist.name;
  about.value = scientist.about;
  image.value = scientist.image;
  web.value = scientist.web;

  name.dataset.display = "Nombre";
  about.dataset.display = `Sobre ${scientist.name}`;
  image.dataset.display = "Imagen";
  web.dataset.display = "Web";
  career.dataset.display = "Carrera";
  multipleTags.dataset.display = "Tags";
  multiplePhrases.dataset.display = "Frases";

  name.dataset.cols = "2";
  career.dataset.cols = "2";
  image.dataset.cols = "2";
  web.dataset.cols = "2";
  about.dataset.cols = "1";
  multiplePhrases.dataset.cols = "1";
  multipleTags.dataset.cols = "1";

  return createForm(
    [name, career, web, image, about, multiplePhrases, multipleTags],
    "form",
  );
}

/**
 * Se construye el componente multiple, encargado de manejar los multiples valores  de un input
 * @param {string} id
 * @param {string} placeholder
 */
function multiple(id, name, placeholder, arr) {
  const container = document.createElement("div");
  container.classList.add("multiple-container");
  container.id = `_multiple-container${id}`;
  const inputHidden = document.createElement("input");
  inputHidden.type = "hidden";
  inputHidden.id = id;
  inputHidden.name = name;
  inputHidden.value = JSON.stringify(arr);
  const values = multipleValues(arr, id);

  const input = multipleController(placeholder, id, values.id);
  container.append(input, inputHidden, values);
  return container;
}
const MULTIPLE_VALUES_ID = "multiple-values";
/**
 * Recorre el arreglo e inyecta los valores como elementos visibles
 * @param {Array} arr
 */
function multipleValues(arr, idInput) {
  let id = randomString();
  const container = document.createElement("div");
  container.classList.add("multiple-values");
  container.id = `${MULTIPLE_VALUES_ID}${idInput}`;
  const remove = (idTag) => {
    removeTag(idTag, idInput, arr);
  };
  arr.map((e) => {
    const tag = new Tag(id, e, remove).build();
    container.append(tag);
    id = randomString();
  });
  return container;
}

function removeTag(idTag, idInput, arr) {
  arr.splice(arr.indexOf(idTag), 1);
  updateValue(idInput, JSON.stringify(arr));
  document.getElementById(idTag).remove();
}

function updateValue(id, value) {
  const input = document.getElementById(id);
  input.value = value;
}

function multipleController(placeholder, id, multipleValuesId) {
  let value = "";
  const containerController = document.createElement("div");
  containerController.classList.add("multiple-controller");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = placeholder;
  input.id = `_multiple-input${id}`;

  input.addEventListener("keyup", (event) => {
    value = event.target.value;
    if (value.length > 0) {
      containerController.classList.add("active");
    } else {
      containerController.classList.remove("active");
    }
  });
  const button = document.createElement("button");
  button.innerHTML = addIcon;
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const valueInput = document.getElementById(id).value;
    const arr = JSON.parse(valueInput);
    arr.push(value);
    if (value !== "") {
      updateValue(id, JSON.stringify(arr));
      containerController.classList.remove("active");
      input.value = "";
      const tagId = randomString();
      document
        .getElementById(multipleValuesId)
        .append(new Tag(tagId, value, () => removeTag(tagId, id, arr)).build());
      value = "";
    }
  });
  containerController.append(input, button);
  return containerController;
}

class Tag {
  id = "";
  value = "";
  remove = undefined;
  constructor(id, value, remove) {
    this.id = id;
    this.value = value;
    this.remove = remove;
  }
  build() {
    const tag = document.createElement("div");
    tag.classList.add("tag");
    tag.id = this.id;
    tag.innerText = this.value;
    const remove = document.createElement("div");
    remove.classList.add("remove");
    remove.innerHTML = closeIcon;
    remove.addEventListener("click", () => {
      this.remove(this.id);
    });
    tag.append(remove);
    return tag;
  }
}
function randomString() {
  return (Math.random() + 1).toString(36).substring(7);
}

const closeIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6.34831 11.6517L11.6516 6.34839" stroke="#FCFCFC" stroke-width="1.5" stroke-linecap="round"/> <path d="M6.34831 6.34831L11.6516 11.6516" stroke="#FCFCFC" stroke-width="1.5" stroke-linecap="round"/> </svg>`;
const addIcon = `
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.9637 16.7499L13.0364 9.25024" stroke="#FCFCFC" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M9.25011 12.9637L16.7498 13.0364" stroke="#FCFCFC" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
  `;
