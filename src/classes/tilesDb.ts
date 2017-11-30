import { Storage } from '@ionic/storage';

var storageInstance: any;
export var tilesDb = {
  storage: null,
  initialize: function () {
    if (storageInstance) {
      this.storage = storageInstance;
    } else {
      this.storage = storageInstance = new Storage({ name: "mapboxTilesStorage" });
    }
    return this.storage.ready();
  },
  getItem: function (key) {
    return this.storage.get(key);
  },

  saveTiles: function (tileUrls, progressCallback) {
    var self = this;

    const totalDownload = tileUrls.length;
    var doneDownload = 0;
    var currentlyActiveDownloads = 0;
    var nextIndex = 0;
    return new Promise(function (resolve, reject) {
      var spawnNextDownloads;
      var downloadTile = function (i, tileUrl) {
        currentlyActiveDownloads++;
        var request = new XMLHttpRequest();
        request.open('GET', tileUrl.url, true);
        request.responseType = 'blob';
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
              doneDownload++;
              console.log("Progress: ", i, Math.round((doneDownload) * 100 / totalDownload));
              self._saveTile(tileUrl.key, request.response);
              i++;
              currentlyActiveDownloads--;
              if (doneDownload == totalDownload) {
                resolve();
              } else {
                spawnNextDownloads();
              }
              if (progressCallback) {
                progressCallback(doneDownload, totalDownload);
              }
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
      };

      spawnNextDownloads = function() {
        while (currentlyActiveDownloads < 3 && nextIndex < totalDownload) {
          downloadTile(nextIndex, tileUrls[nextIndex]);
          nextIndex++;
        }
      };

      spawnNextDownloads();
    });
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