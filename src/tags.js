import { scientistFactory } from "./scientists.js";
import { getTags } from "./service.js";

/**
 * @returns {Promise<Tag[]>}
 */
export async function getData() {
  const response = await getTags();
  return response;
}

export class Tag {
  id = "";
  name = "";
  /**
   * @param {string} id
   * @param {string} name
   */
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

let tagSelected = "";
export class TagComponent extends Tag {
  component = document.createElement("div");
  /**
   * @param {string} id
   * @param {string} name
   */
  constructor(id, name) {
    super(id, name);
  }
  build() {
    this.component.id = this.id;
    this.component.classList.add("tag");
    const span = document.createElement("span");
    span.innerText = this.name;
    this.component.append(span);

    this.component.addEventListener("click", (event) => {
      if (this.component.classList.contains("active")) return;
      const tags = document.getElementsByClassName("active");
      for (let i = 0; i < tags.length; i++) {
        tags[i].id !== this.component.id && tags[i].classList.remove("active");
      }
      this.component.classList.add("active");
      scientistFactory("tag", this.name);
    });
  }
}

/**
 * @returns {Promise<TagComponent[]>}
 */
export async function tagFactory() {
  const data = await getData();

  const component = data.map(({ id, name }) => {
    const tag = new TagComponent(`tag-${id}`, name);
    tag.build();
    return tag;
  });

  return component;
}
