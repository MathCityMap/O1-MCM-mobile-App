import { DataStorage } from './DataStorage';
import { ImageRetriever } from './ImageRetriever';
import queue from 'async/queue';

export class ImageStore {
  _eventEmitter: any;
  _nbTilesLeftToSave: number;
  _nbImagesCurrentlyBeingRetrieved: number;
  _imageRetriever: any;
  _myQueue: any;
  _beingCanceled: boolean;
  _running: boolean;
  storage: DataStorage;
  _onSaveImagesSuccess: any;

  constructor(eventEmitter, imageRetriever: ImageRetriever) {
    if (imageRetriever == null) {
      throw new Error('the image store needs an imageRetriever');
    }
    if (eventEmitter == null) {
      throw new Error('the image store needs an eventEmitter');
    }
    this._eventEmitter = eventEmitter;
    this._nbTilesLeftToSave = 0;
    this._nbImagesCurrentlyBeingRetrieved = 0;
    this._imageRetriever = imageRetriever;
    this._myQueue = null;
    this._beingCanceled = false;
    this._running = false;
  }

  createDB(storeName, onReady, onError) {
    if (onReady == null) {
      throw new Error('This async function needs a callback');
    }
    this.storage = new DataStorage(storeName, onReady, onError);
  }

  cancel() {
    if (!this._running) {
      return false;
    }
    if (this._beingCanceled) {
      return true;
    }
    this._beingCanceled = true;
    if (this._myQueue != null) {
      this._myQueue.kill();
      if (this._nbImagesCurrentlyBeingRetrieved === 0) {
        this._finish();
      }
      return true;
    }
    return false;
  }

  isBusy() {
    return this._running;
  }

  get(key, onSuccess, onError) {
    if ((onSuccess == null) || (onError == null)) {
      throw new Error('This async function needs callbacks');
    }
    return this.storage.get(key, onSuccess, onError);
  }

  clear(onSuccess, onError) {
    if ((onSuccess == null) || (onError == null)) {
      throw new Error('This async function needs callbacks');
    }
    return this.storage.clear(onSuccess, onError);
  }

  _finish(error = null, onError = null) {
    this._running = false;
    this._beingCanceled = false;
    this._eventEmitter.fire('tilecachingprogressdone', null);
    this._myQueue = null;
    this._nbImagesCurrentlyBeingRetrieved = 0;
    if (error != null) {
      return onError(error);
    } else {
      return this._onSaveImagesSuccess();
    }
  }

  saveImages(tileImagesToQuery, onStarted, onSuccess, onError) {
    this._running = true;
    if (this._myQueue != null) {
      throw new Error('Not allowed to save images while saving is already in progress');
    }
    if ((onStarted == null) || (onSuccess == null) || (onError == null)) {
      throw new Error('This async function needs callbacks');
    }
    this._onSaveImagesSuccess = onSuccess;
    this._getImagesNotInDB(tileImagesToQuery, (tileInfoOfImagesNotInDB) => {
      var MAX_NB_IMAGES_RETRIEVED_SIMULTANEOUSLY, data, j, len;
      if (!this._beingCanceled && (tileInfoOfImagesNotInDB != null) && tileInfoOfImagesNotInDB.length > 0) {

        MAX_NB_IMAGES_RETRIEVED_SIMULTANEOUSLY = 8;
        this._myQueue = queue((data, callback) => {
          return this._saveTile(data, callback);
        }, MAX_NB_IMAGES_RETRIEVED_SIMULTANEOUSLY);
        this._myQueue.drain = (error) => {
          return this._finish(error, onError);
        };
        for (j = 0, len = tileInfoOfImagesNotInDB.length; j < len; j++) {
          data = tileInfoOfImagesNotInDB[j];
          this._myQueue.push(data);
        }

        onStarted();
      } else {
        //nothing to do
        onStarted();
        this._finish();
      }
    }, function (error) {
      onError(error);
    });
  }

  _getImagesNotInDB(tileImagesToQuery, callback, onError) {
    var imageKey, tileImagesToQueryArray;
    tileImagesToQueryArray = [];
    for (imageKey in tileImagesToQuery) {
      tileImagesToQueryArray.push(imageKey);
    }
    // Query all the needed tiles from the DB
    this.storage.getDenseBatch(tileImagesToQueryArray, (tileImages) => {
      var i, j, len, testTile, tileImage, tileInfoOfImagesNotInDB;
      i = 0;
      tileInfoOfImagesNotInDB = [];
      this._eventEmitter.fire('tilecachingstart', null);
      this._nbTilesLeftToSave = 0;
      testTile = (tileImage) => {
        var key, tileInfo;
        if (!tileImage) {
          // that tile image is not present in the DB
          key = tileImagesToQueryArray[i];
          tileInfo = tileImagesToQuery[key];
          this._nbTilesLeftToSave++;
          tileInfoOfImagesNotInDB.push({
            key: key,
            tileInfo: tileInfo
          });
        }
        i++;
      };
      for (j = 0, len = tileImages.length; j < len; j++) {
        tileImage = tileImages[j];
        testTile(tileImage);
      }
      this._updateTotalNbImagesLeftToSave(this._nbTilesLeftToSave);
      callback(tileInfoOfImagesNotInDB);
    }, function (error) {
      onError(error);
    });
  }

  _saveTile(data, callback) {
    var errorGettingImage, gettingImage;
    // when the image is received, it is stored inside the DB using Base64 format
    gettingImage = (response) => {
      return this.storage.put(data.key, {
        "image": response
      }, () => {
        this._decrementNbTilesLeftToSave();
        return callback();
      }, (error) => {
        this._decrementNbTilesLeftToSave();
        return callback(error);
      });
    };
    errorGettingImage = (errorType, errorData) => {
      this._decrementNbTilesLeftToSave();
      this._eventEmitter._reportError(errorType, {
        data: errorData,
        tileInfo: data.tileInfo
      });
      return callback(errorType);
    };
    this._nbImagesCurrentlyBeingRetrieved++;
    return this._imageRetriever.retrieveImage(data.tileInfo, gettingImage, errorGettingImage);
  }

  // called when the total number of tiles is known
  _updateTotalNbImagesLeftToSave(nbTiles) {
    this._nbTilesLeftToSave = nbTiles;
    return this._eventEmitter.fire('tilecachingprogressstart', {
      nbTiles: this._nbTilesLeftToSave
    });
  }

  // called each time a tile as been handled
  _decrementNbTilesLeftToSave() {
    this._nbTilesLeftToSave--;
    if (!this._beingCanceled) {
      this._eventEmitter.fire('tilecachingprogress', {
        nbTiles: this._nbTilesLeftToSave
      });
    }
    // I need to do this so the ImageStore only call finish when everything is done canceling
    this._nbImagesCurrentlyBeingRetrieved--;
    if (this._beingCanceled && this._nbImagesCurrentlyBeingRetrieved === 0) {
      return this._finish();
    }
  }

}