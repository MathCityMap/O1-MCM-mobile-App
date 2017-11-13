import { Storage } from '@ionic/storage';

export var tilesDb = {
  storage: null,
  initialize: function () {
    this.storage = new Storage({ name: "mapboxTilesStorage" });
    return this.storage.ready();
  },
  getItem: function (key) {
    return this.storage.get(key);
  },

  saveTiles: function (tileUrls) {
    var self = this;

    var promises = [];

    for (var i = 0; i < tileUrls.length; i++) {
      var tileUrl = tileUrls[i];

      (function (i, tileUrl) {
        promises[i] = new Promise(function (resolve, reject) {
          var request = new XMLHttpRequest();
          request.open('GET', tileUrl.url, true);
          request.responseType = 'blob';
          request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                console.log("Progress: ", i);
                resolve(self._saveTile(tileUrl.key, request.response));
              } else {
                console.log("send request NOT OK");
                reject({
                  status: request.status,
                  statusText: request.statusText
                });
              }
            }
          };
          request.send();
        });
      })(i, tileUrl);
    }

    return Promise.all(promises);
  },

  clear: function () {
    return this.storage.clear();
  },

  _saveTile: function (key, value) {
    var self = this;
    return this._removeItem(key).then(function () {
      return self.storage.set(key, value);
    });
  },

  _removeItem: function (key) {
    return this.storage.remove(key);
  }
};