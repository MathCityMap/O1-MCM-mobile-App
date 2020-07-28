// LOG with timestamp
console.logRaw = console.log.bind(console);
console.log = function () {
  if (arguments.length) {
    var timestamp = `[${new Date().toUTCString()}]`;
    var args = [...arguments];
    if (typeof args[0] === "string") {
      args[0] = `${timestamp}: ${args[0]}`;
      this.logRaw.apply(this, args);
    } else {
      this.logRaw(timestamp, ...arguments);
    }
  }
};
// END: LOG with timestamp -->
