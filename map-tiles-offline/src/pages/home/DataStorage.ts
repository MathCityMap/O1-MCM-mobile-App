import { Storage } from '@ionic/storage';

export class DataStorage {
  storage: Storage;
  constructor(storageName: string, onReady: any, onError: any) {
    // this._webSQLDB = openDatabase('OfflineTileImages', '1.0', 'Store tile images for OfflineLeaftMap', 40 * 1024 * 1024);
    // this._webSQLDB.transaction((tx) => {
    //   return tx.executeSql(`CREATE TABLE IF NOT EXISTS ${this._storeName} (key unique, image)`);
    // }, onError, onReady);
    this.storage = new Storage({ name: storageName });
    this.storage.ready().then(onReady, onError);
  }

  get(key: string, onSuccess: any, onError: any) {
    this.storage.get(key).then(onSuccess, onError);
    // return this._webSQLDB.transaction((tx) => {
    //   var onSQLSuccess;
    //   onSQLSuccess = function(tx, results) {
    //     var len;
    //     len = results.rows.length;
    //     if (len === 0) {
    //       return onSuccess(void 0);
    //     } else if (len === 1) {
    //       return onSuccess(results.rows.item(0));
    //     } else {
    //       return onError('There should be no more than one entry');
    //     }
    //   };
    //   return tx.executeSql(`SELECT * FROM ${this._storeName} WHERE key='${key}'`, [], onSQLSuccess, onError);
    // });
  }

  clear(onSuccess: any = null, onError: any = null) {
    this.storage.clear().then(onSuccess, onError);
    // return this._webSQLDB.transaction((tx) => {
    //   return tx.executeSql(`DELETE FROM ${this._storeName}`, [], onSuccess, onError);
    // });
  }

  put(key: string, object: any, onSuccess: any = null, onError: any = null) {
    this.storage.set(key, object).then(onSuccess, onError);
    // return this._webSQLDB.transaction((tx) => {
    //   return tx.executeSql(`INSERT OR REPLACE INTO ${this._storeName} VALUES (?, ?)`, [key, object.image], onSuccess, onError);
    // });
  }

  // That one is trickier
  // IndexedDB has an option called 'dense'. The idea is that the result array matches the queried keys array, both
  // in size and position. If nothing has been found for a key, there will be undefined at that index in the response.
  // Note: For now, getDenseBatch is only used to find the missing keys
  getDenseBatch(tileImagesToQueryArray, onSuccess, onError) {
    var result = [];
    // var finished = false;
    // var counter = 0;
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

    this.storage.get(tileImagesToQueryArray[i]).then(onSQLSuccess, onSQLError);

    // var onSQLSuccess = function (data) {
    //   console.log("onSQLSuccess", data);
    //   if (error === false) {
    //     if (data === null) {
    //       result.push(data);
    //     }
    //     counter--;
    //     if (finished === true && counter == 0) {
    //       onSuccess(result);
    //     }
    //   }
    // };
    var onSQLError = function (err) {
      console.log("onSQLError", error);
      error = true;
      onError(error);
    }
    // for (var i = 0; i < tileImagesToQueryArray.length; i++) {
    //   counter++;
    //   this.storage.get(tileImagesToQueryArray[i]).then(
    //     onSQLSuccess, onSQLError
    //   );
    // }
    // finished = true;






    // if (tileImagesToQueryArray.length === 0) {
    //   onSuccess([]);
    // }
    // return this._webSQLDB.transaction((tx) => {
    //   var i, j, keys, onSQLSuccess, ref, result, tileImagesToQueryArray2;
    //   result = [];
    //   tileImagesToQueryArray2 = [];
    //   // 2 things are being done here
    //   // Add '' around the keys to create a valid string for the SQL query
    //   // Create the result array with one undefined for each key
    //   for (i = j = 0, ref = tileImagesToQueryArray.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
    //     tileImagesToQueryArray2.push("'" + tileImagesToQueryArray[i] + "'");
    //     result.push(void 0);
    //   }
    //   keys = tileImagesToQueryArray2.join(',');
    //   onSQLSuccess = function(tx, results) {
    //     var index, item, k, ref1;
    //     for (i = k = 0, ref1 = results.rows.length; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
    //       item = results.rows.item(i);
    //       // look up the key index and set the value
    //       index = tileImagesToQueryArray.indexOf(item.key);
    //       if (index >= 0) {
    //         result[index] = item;
    //       }
    //     }
    //     return onSuccess(result);
    //   };
    //   return tx.executeSql(`SELECT * FROM ${this._storeName} WHERE key IN (${keys})`, [], onSQLSuccess, onError);
    // });
  }

}
