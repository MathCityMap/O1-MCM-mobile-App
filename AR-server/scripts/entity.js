class Entity {
  constructor (document, element) {
    this.document = document;
    this.load(element);
  }

  load (element) {
    try {
      this.error = false;
      if (element["a-entity"]) {
        const entity = this.document.createElement(element["a-entity"]);
        this.json = element;
        for (var attribute in element) {
          if (attribute === "a-entity")
            continue;
          if (attribute === "entities") {
            this.entities = new EntityCollection(this.document, element[attribute]);
          } else {
            entity.setAttribute(attribute, element[attribute]);
          }
        }

        this.entity = entity;
      } else {
        throw("No 'a-entity' property in declaration");
      }
    } catch (e) {
      this.error = true;
      console.log("Cannot create entity out of", element, e);
      throw(e);
    }
  }

  fill (parent, scene) {
    if (this.error) {
      throw("Cannot fill entity. Entity load had error");
    }

    // a-assets always must be direct child of a-scene for preload resources
    if (this.json["a-entity"] === "a-assets") {
      scene.appendChild(this.entity);
    } else {
      parent.appendChild(this.entity);
    }
    if (this.entities) {
      this.entities.fill(this.entity, scene);
    }
  }
}
