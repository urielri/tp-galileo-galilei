import { getScientists } from "../service.js";
import { getData } from "../scientists.js";
import { Button } from "../utils.js";

/**
 *
 *
 */
export class Item {
  id = "";
  title = "";
  image = "";
  /**
   * @param {string} id
   * @param {string} title
   * @param {string} image
   */
  constructor(id, title, image) {
    this.build(id, title, image);
  }
  build(id, title, image) {
    const button = new Button(
      "Editar",
      (e) => {
        console.log(e.target.parentElement.id);
      },
      "primary",
    );
    const button2 = new Button(
      "Eliminar",
      (e) => {
        console.log(e.target.parentElement.id);
      },
      "secondary",
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
      ${button.outerHTML}
      ${button2.outerHTML}
    </div>
    </div>
    `;
    return component;
  }
}

/**
 * Construye el componente que se va a mostrar en la vista
 */
export async function manageFactory() {
  const items = await getData("default");
  const component = items.map(({ id, title, image }) => {
    const item = new Item(id, title, image);
    return item.build(id, title, image);
  });
  return component;
}
