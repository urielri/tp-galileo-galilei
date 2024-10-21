import { getData } from "../scientists.js";
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
        formModal("Editar scientist", data);
      },
      "primary",
      "edit",
    );
    const button2 = new Button(
      "Eliminar",
      (e) => {
        console.log(e.target.parentElement.id);
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

export function formModal(text, data) {
  const portal = createPortal();
  const modal = createModal("modal-form");
  const title = document.createElement("h2");
  const form = scientistForm(data);
  title.innerText = text;
  modal.appendChild(title);
  modal.appendChild(form);
  const actions = createActionsForm([
    {
      text: "Confirmar",
      callback: () => console.log(new FormData(form).get("name")),
      priority: "primary",
      id: "confirm",
    },
    {
      text: "Cancelar",
      callback: undefined,
      priority: "secondary",
      id: "cancel",
    },
  ]);
  modal.appendChild(actions);
  document.body.appendChild(modal);
  /**
   * Si se cierra el portal, se elimina el modal
   */
  document.addEventListener("click", () => {
    if (!portal.isConnected && modal.isConnected) modal.remove();
  });
}
/**
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
