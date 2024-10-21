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

export class TagComponent extends Tag {
  component = document.createElement("div");
  /**
   * @param {string} id
   * @param {string} name
   */
  constructor(id, name) {
    super(id, name);
  }
  /**
   * @param {Function} factory
   */
  build(factory) {
    this.component.id = this.id;
    this.component.classList.add("tag");
    const span = document.createElement("span");
    span.innerText = this.name;
    this.component.append(span);

    this.component.addEventListener("click", () => {
      if (this.component.classList.contains("active")) return;
      const tags = document.getElementsByClassName("active");
      for (let i = 0; i < tags.length; i++) {
        tags[i].id !== this.component.id && tags[i].classList.remove("active");
      }
      this.component.classList.add("active");

      this.name === "todos"
        ? factory.call(this, "default")
        : factory.call(this, "tag", this.name);
    });
  }
}

/**
 * @returns {Promise<TagComponent[]>}
 * @param {Function} factory
 */
export async function tagFactory(factory) {
  const data = await getData();
  const array = [...data, new Tag(data.length + 1, "todos")].toReversed();
  const component = array.map(({ id, name }) => {
    const tag = new TagComponent(`tag-${id}`, name);
    tag.build(factory);
    return tag;
  });

  return component;
}
