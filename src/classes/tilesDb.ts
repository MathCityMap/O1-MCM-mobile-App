import { Storage } from '@ionic/storage';
import { ImagesService } from '../services/images-service';

var storageInstance: any;
declare var URL: any;

export var tilesDb = {
    storage: null,
    initialize: function () {
        if (storageInstance) {
            this.storage = storageInstance;
        } else {
            this.storage = storageInstance = new Storage({name: "mapboxTilesStorage"});
        }
        return this.storage.ready();
    },
    getItem: function (key) {
        return Promise.resolve(null);
    },

    saveTiles: function (tileUrls, progressCallback) {
        let urlToKey = {};
        tileUrls.map(element => urlToKey[element.url] = element.key);
        return ImagesService.INSTANCE.downloadURLs(tileUrls.map(element => element.url), false, (done, total, url) => {
            // tilesDb._saveTile(urlToKey[url]);
            return progressCallback(done, total);
        }, true);
    },

    clear: function () {
        return this.storage.clear();
    },

    _saveTile: async function (key) {
        let count = await this.storage.get(key);
        if (!count) {
            count = 1;
        } else {
            count++;
        }
        await this.storage.set(key, count);
    },

    removeItems: async function (keys) {
        let promises = [];
        for (let key of keys) {
            promises.push(this.storage.get(key));
        }
        Promise.all(promises).then(counts => {
            let urlsToRemove = [];
            for (var i = 0; i < counts.length; i++) {
                let count = counts[i];
                let key = keys[i];
                if (count > 1) {
                    this.storage.set(key, count - 1);
                } else if (count === 1) {
                    this.storage.remove(key);
                    urlsToRemove.push(key);
                }
            }
            ImagesService.INSTANCE.removeDownloadedURLs(urlsToRemove, false);
        });
    }
};