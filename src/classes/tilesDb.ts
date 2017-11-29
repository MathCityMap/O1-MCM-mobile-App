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

  saveTiles: function (tileUrls, progressCallback) {
    var self = this;

    var promises = [];
    const totalDownload = tileUrls.length;
    var doneDownload = 0;
    for (var i = 0; i < totalDownload; i++) {
      var tileUrl = tileUrls[i];

      (function (i, tileUrl, totalDownload) {
        promises[i] = new Promise(function (resolve, reject) {
          var request = new XMLHttpRequest();
          request.open('GET', tileUrl.url, true);
          request.responseType = 'blob';
          request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                doneDownload++;
                console.log("Progress: ", i, Math.round((doneDownload) * 100 / totalDownload));
                if (progressCallback) {
                  progressCallback(doneDownload, totalDownload);
                }
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
      })(i, tileUrl, totalDownload);
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