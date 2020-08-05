class Scene {
  constructor (document, json) {
    this.document = document;
    this.load(json);
  }

  load (json) {
    try {
      this.error = false;
      this.json = json; // for debugging
      this.gpsPosition = json["gps-entity-place"];
      this.position = json.position;
      this.createRootElement();
      this.entities = new EntityCollection(this.document, json.entities);
    } catch (e) {
      this.error = true;
      console.log("error loading scene", e);
      throw(e);
    }
  }

  setGPSPosition (latitude, longitude) {
    this.gpsPosition = `latitude: ${latitude}; longitude: ${longitude};`;
    this.createRootElement();
  }

  setPosition (x, y, z) {
    this.position = `${x} ${y} ${z}`;
    this.createRootElement();
  }

  createRootElement () {
    this.element = null;
    if (this.gpsPosition || this.position) {
      const element = {
        "a-entity": "a-entity",
      };

      if (this.gpsPosition) {
        element["gps-entity-place"] = this.gpsPosition;
      }

      if (this.position) {
        element.position = this.position;
      }

      this.element = new Entity(this.document, element);
    }
  }

  fill (scene) {
    if (this.error) {
      throw("cannot fill scene. Scene load had error");
    }

    if (this.element) {
        this.element.fill(scene);
        this.entities.fill(this.element.entity, scene);
    } else {
      this.entities.fill(scene);
    }
  }
}
