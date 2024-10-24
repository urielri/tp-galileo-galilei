import { getData } from "../scientists.js";
import {
  createScientist,
  updateScientist,
  deleteScientist,
  health,
} from "../service.js";

import { Button, createModal, createPortal, scientistForm } from "../utils.js";

/**
 *
 *
 */
export class Item {
  id = "";
  title = "";
  image = "";
  scientist = {};
  /**
   * @param {string} id
   * @param {string} title
   * @param {string} image
   * @param {ScientistModel} data
   */
  constructor(id, title, image, data) {
    this.build(id, title, image, data);
  }
  build(id, title, image, data) {
    const button = new Button(
      "Editar",
      (e) => {
        formModal("Editar scientist", "edit", data);
      },
      "primary",
      "edit",
    );
    const button2 = new Button(
      "Eliminar",
      (e) => {
        modalConfirmation(
          "Estas seguro que deseas eliminar este cientifico?",
          id,
        );
      },
      "secondary",
      "delete",
    );
    const component = document.createElement("div");
    component.classList.add("item");
    component.id = id;
    component.innerHTML = `
    <div class="item-image">
      <img src="${image}" alt="${title}" />
    </div>
    <div class="item-title"><span>${title}</span></div>
    <div class="item-actions" id="actions">
    </div>
    </div>
    `;
    component.children[2].append(button.build());
    component.children[2].append(button2.build());
    return component;
  }
}

/**
 * Construye el componente que se va a mostrar en la vista
 */
export async function manageFactory(type, value) {
  const items = await getData(type, value);
  const component = items.map((data) => {
    const item = new Item(data.id, data.name, data.image, data);
    return item.build(data.id, data.name, data.image, data);
  });
  const inyect = document.getElementById("list");

  while (inyect.firstChild) {
    inyect.firstChild.remove();
  }
  inyect.append(...component);
}

export function formModal(text, flow, data) {
  const portal = createPortal();
  const modal = createModal("modal-form");
  const title = document.createElement("h2");
  const form = scientistForm(data);
  title.innerText = text;
  modal.appendChild(title);
  modal.appendChild(form);
  const actions = createActionsForm([
    {
      text: "Cancelar",
      callback: () => closePortal(),
      priority: "secondary",
      id: "cancel",
    },
    {
      text: "Confirmar",
      callback: () => actionFlow(data, flow),
      priority: "primary",
      id: "confirm",
    },
  ]);
  modal.appendChild(actions);
}

/**
 * Crea los botones que se van a mostrar en el formulario
 * @param {[{text: string, callback: function, priority: string, id: string}]} actions
 */
export function createActionsForm(actions) {
  const container = document.createElement("div");
  container.classList.add("actions-form");
  const actionsButton = actions.map(
    (action) =>
      new Button(action.text, action.callback, action.priority, action.id),
  );
  actionsButton.map((action) => container.append(action.build()));
  return container;
}

export function modalConfirmation(text, id) {
  const portal = createPortal();
  const modal = createModal("modal-confirmation");
  const container = document.createElement("div");
  container.classList.add("container");
  const title = document.createElement("h2");
  title.innerText = text;
  container.append(title);
  modal.appendChild(container);
  const actions = createActionsForm([
    {
      text: "Cancelar",
      callback: () => closePortal(),
      priority: "secondary",
      id: "cancel",
    },
    {
      text: "Confirmar",
      callback: () => deleteItem(id),
      priority: "primary",
      id: "confirm",
    },
  ]);
  modal.appendChild(actions);
}

async function deleteItem(id) {
  const button = document.getElementById("confirm");
  button.style.backgroundColor = "var(--grey-00)";
  button.style.cursor = "not-allowed";
  button.innerText = "Eliminando...";
  button.disabled = true;
  inyectLoader("modal");
  try {
    const response = await deleteScientist(id);
    if (response.status === 200) {
      await manageFactory("scientist");
      closePortal();
    }
  } catch (e) {
    console.log(e);
  }
}

async function actionFlow(data, flow) {
  const button = document.getElementById("confirm");
  button.style.backgroundColor = "var(--black-01)";
  button.style.cursor = "not-allowed";
  button.disabled = true;
  inyectLoader("modal");
  const form = new FormData(document.getElementById("form"));

  data = {
    name: form.get("name"),
    web: form.get("web"),
    image: form.get("image"),
    tags: JSON.parse(form.get("tags")),
    phrases: JSON.parse(form.get("phrases")),
    about: form.get("about"),
    career: form.get("career"),
  };
  try {
    if (flow === "edit") {
      button.innerText = "Actualizando...";
      const response = await updateScientist(data);
      console.log(response);
      if (response.inserted === 1) {
        manageFactory("default");
        closePortal();
      }
    } else if (flow === "create") {
      button.innerText = "Creando...";
      const response = await createScientist(data);
      if (response.status === 200) {
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function closePortal() {
  const portal = document.getElementById("portal");
  if (portal && portal.isConnected) {
    portal.remove();
  }
}

function inyectLoader(id) {
  const container = document.createElement("div");
  container.classList.add("loader-container");
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.classList.add("loader");
  container.append(loader);
  const parent = document.getElementById(id);
  parent.appendChild(container);
}
