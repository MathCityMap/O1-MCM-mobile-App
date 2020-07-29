class Scene {
  constructor (document, json) {
    this.document = document;
    this.load(json);
  }

  load (json) {
    try {
      this.error = false;
      this.json = json; // for debugging
      this.entities = new EntityCollection(this.document, json.entities);
    } catch (e) {
      this.error = true;
      console.log("error loading scene", e);
      throw(e);
    }
  }

  fill (parent) {
    if (this.error) {
      throw("cannot fill scene. Scene load had error");
    }

    this.entities.fill(parent);
  }
}
