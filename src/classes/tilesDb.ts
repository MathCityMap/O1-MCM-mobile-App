import { Storage } from '@ionic/storage';
var storageInstance: any;
declare var URL: any;

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
    var downloadWasAborted = false;
    return new Promise(function (resolve, reject) {
      var spawnNextDownloads;
      var downloadTile = function (i, tileUrl) {
        currentlyActiveDownloads++;
        var request = new XMLHttpRequest();
        request.open('GET', tileUrl.url, true);
        request.responseType = 'blob';
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200 && !downloadWasAborted) {
              doneDownload++;
              console.log("Progress: ", i, Math.round((doneDownload) * 100 / totalDownload));
              self._saveTile(tileUrl.key, request.response).then(function() {
                // create URL to make tiles load faster later
                URL.createObjectURL(request.response);
                i++;
                currentlyActiveDownloads--;
                if (doneDownload == totalDownload) {
                  resolve();
                } else {
                  spawnNextDownloads();
                }
                if (progressCallback && !downloadWasAborted) {
                  if (progressCallback(doneDownload, totalDownload)) {
                    downloadWasAborted = true;
                    console.log("download was aborted");
                    reject("download was aborted");
                  }
                  if (doneDownload == totalDownload) {
                    // make sure not to send events after method already resolved promise
                    progressCallback = null;
                  }
                }
              });
            } else if (!downloadWasAborted) {
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
        if (downloadWasAborted) {
          return;
        }
        while (currentlyActiveDownloads < 4 && nextIndex < totalDownload) {
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