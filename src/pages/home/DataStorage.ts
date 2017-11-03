import { Storage } from '@ionic/storage';

export class DataStorage {
  storage: Storage;
  constructor(storageName: string, onReady: any, onError: any) {
    this.storage = new Storage({ name: storageName });
    this.storage.ready().then(onReady, onError);
  }

  get(key: string, onSuccess: any, onError: any) {
    this.storage.get(key).then(onSuccess, onError);
  }

  clear(onSuccess: any = null, onError: any = null) {
    this.storage.clear().then(onSuccess, onError);
    // return this._webSQLDB.transaction((tx) => {
    //   return tx.executeSql(`DELETE FROM ${this._storeName}`, [], onSuccess, onError);
    // });
  }

  put(key: string, object: any, onSuccess: any = null, onError: any = null) {
    this.storage.set(key, object).then(onSuccess, onError);
  }

  getDenseBatch(tileImagesToQueryArray, onSuccess, onError) {
    var result = [];
    var error = false;
    var storage = this.storage;
    var i = 0;
    var onSQLSuccess = function (data) {
      result[i] = data;
      i++;
      if (i < tileImagesToQueryArray.length) {
        storage.get(tileImagesToQueryArray[i]).then(onSQLSuccess, onSQLError);
      } else {
        onSuccess(result);
      }
    }
    var onSQLError = function (err) {
      console.log("onSQLError", error);
      error = true;
      onError(error);
    }

    this.storage.get(tileImagesToQueryArray[i]).then(onSQLSuccess, onSQLError);
  }

}
