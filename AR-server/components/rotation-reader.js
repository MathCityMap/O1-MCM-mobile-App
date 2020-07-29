AFRAME.registerComponent("rotation-reader", {
  /**
   * We use IIFE (immediately-invoked function expression) to only allocate one
   * vector or euler and not re-create on every tick to save memory.
   */
  init: function () {
    this.loc = {};
    this.loc.position = new THREE.Vector3();
    this.loc.quaternion = new THREE.Quaternion();
    this.loc.isPositionEqual = (position) => {
      return !!this.loc.lastPosition &&
        this.loc.lastPosition.x === position.x &&
        this.loc.lastPosition.y === position.y &&
        this.loc.lastPosition.z === position.z;
    };
    this.loc.isQuaternionEqual = (quaternion) => {
      return !!this.loc.lastQuaternion &&
        this.loc.lastQuaternion.x === quaternion.x &&
        this.loc.lastQuaternion.y === quaternion.y &&
        this.loc.lastQuaternion.z === quaternion.z &&
        this.loc.lastQuaternion.w === quaternion.w;
    };
  },
  tick: function () {
    var position = this.el.object3D.getWorldPosition(this.loc.position);
    var quaternion = this.el.object3D.getWorldQuaternion(this.loc.quaternion);
    if (!this.loc.isPositionEqual(position)) {
      this.loc.lastPosition = Object.assign(new THREE.Vector3(), position);
      if (this.loc.tp) {
        clearTimeout(this.loc.tp);
      }
      this.loc.tp = setTimeout(() => {
        this.loc.tp = null;
        console.log("position", position);
      }, 500);

    }
    if (!this.loc.isQuaternionEqual(quaternion)) {
      this.loc.lastQuaternion = Object.assign(new THREE.Quaternion(), quaternion);
      if (this.loc.tq) {
        clearTimeout(this.loc.tq);
      }
      this.loc.tq = setTimeout(() => {
        this.loc.tq = null;
        console.log("quaternion", quaternion);
      }, 500);
    }
  }
});
