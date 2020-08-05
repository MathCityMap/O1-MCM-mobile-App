class EntityCollection {
  constructor (document, entityCollection) {
    this.entityCollection = entityCollection;
    this.document = document;
    this.load(entityCollection);
  }

  load (entityCollection) {
    this.error = false;
    this.entities = [];
    try {
      if (Array.isArray(entityCollection)) {
        for (const element of entityCollection) {
          const entity = new Entity(this.document, element);
          if (entity) {
            this.entities.push(entity);
          }
        }
      }
    } catch (e) {
      this.error = true;
      console.log("Error creating entities from a collection", entityCollection, e);
      throw(e);
    }
  }

  fill (parent) {
    if (this.error) {
      throw("Cannot fill entities. Collection load had error");
    }

    for (const entity of this.entities) {
      entity.fill(parent);
    }
  }
}
