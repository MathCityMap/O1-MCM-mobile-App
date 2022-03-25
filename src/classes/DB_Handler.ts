import { SQLite, SQLiteObject, SQLiteDatabaseConfig } from '@ionic-native/sqlite'
import { DBC } from './DBC'
import * as Collections from 'typescript-collections'
import { checkAvailability } from "@ionic-native/core";

declare var openDatabase: any;

class WebSQLObject extends SQLiteObject {
  constructor() {
    super(openDatabase('mcm', '1.0', 'MCM DB', 2 * 1024 * 1024));
  }

  executeSql(statement: string, params: any): Promise<any> {
    return new Promise<SQLiteObject>((resolve, reject) => {
      this._objectInstance.transaction(function (tx) {
        console.debug(statement);
        tx.executeSql(statement, params, function (tx, results) {
          resolve(results);
        }, function (tx, error) {
          reject(error);
        });
      });
    });
  }
}

class WebSQL extends SQLite {
  create(config: SQLiteDatabaseConfig): Promise<SQLiteObject> {
    return new Promise<SQLiteObject>((resolve, reject) => {
      resolve(new WebSQLObject());
    });
  }
}

export class DB_Handler {
  private static mInstance: DB_Handler = null
  private mSQLite: SQLite = null
  private mDB: SQLiteObject = null
  private mReady: boolean = false
  private cache = {}


  public static getInstance(): DB_Handler {
    if (this.mInstance === null) {
      this.mInstance = new DB_Handler();
    }

    return this.mInstance
  }

  private constructor() { }

  ready(): Promise<void> {
    if (this.mReady) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve, reject) => {
      this.mSQLite = checkAvailability(SQLite.getPluginRef(), null, SQLite.getPluginName()) === true ? new SQLite() : new WebSQL();
      this.mSQLite.create({
        name: 'mcm_db.sqlite3',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.mDB = db
          this.mReady = true;
          console.log('Connected to DB')
          // it's ok to always run onCreate because SQL has IF EXISTS
          this.onCreate().then(() => {
            this.mReady = true;
            resolve()
          })
        })
        .catch(e => {
          console.error('Error connecting to DB', JSON.stringify(e))
          reject(e)
        });
    })
  }

  private onCreate(): Promise<void> {
    // Create Tables
    let CREATE_STATE_TABLE: string = DBC.DB_STATE.getCreateStatement()
    let CREATE_TASK_TABLE: string = DBC.DB_TASK.getCreateStatement()
    let CREATE_ROUTE_TABLE: string = DBC.DB_ROUTE.getCreateStatement()
    let CREATE_RELROUTETASK_TABLE: string = DBC.DB_RELROUTETASK.getCreateStatement()
    let CREATE_USERS_TABLE: string = DBC.DB_USERS.getCreateStatement()
    let CREATE_SCORE_TABLE: string = DBC.DB_SCORE.getCreateStatement()

    return new Promise<void>((resolve, reject) => {
      Promise.all<void>([
        this.mDB.executeSql(CREATE_STATE_TABLE, null),
        this.mDB.executeSql(CREATE_TASK_TABLE, null),
        this.mDB.executeSql(CREATE_ROUTE_TABLE, null),
        this.mDB.executeSql(CREATE_RELROUTETASK_TABLE, null),
        this.mDB.executeSql(CREATE_USERS_TABLE, null),
        this.mDB.executeSql(CREATE_SCORE_TABLE, null)
      ]).then(() => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })


  }

  protected initTableVersions(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let sql = `INSERT INTO ${DBC.DATABASE_TABLE_STATE} (${DBC.DB_STATE.fields[1]},${DBC.DB_STATE.fields[2]}) VALUES (?,?)`
      Promise.all([
        this.mDB.executeSql(sql, ["version_task", "0"]),
        this.mDB.executeSql(sql, ["version_route", "0"]),
        this.mDB.executeSql(sql, ["version_rel_route_task", "0"])
      ]).then(() => {
        resolve()
      }).catch(reject)
    })
  }

  // TODO:
  /*
  Get the table versions in a hashmap
   */
  private _getTableVersions(data: any): Collections.Dictionary<string, string> {
    var result = new Collections.Dictionary<string, string>()
    for (var i = 0; i < data.rows.length; i++) {
      var row = data.rows.item(i);
      result.setValue(row.option, row.value)
    }

    return result
  }

  getDB(): SQLiteObject {
    return this.mDB;
  }

  getTableVersions(): Promise<Collections.Dictionary<string, string>> {
    return new Promise<Collections.Dictionary<string, string>>((resolve, reject) => {
      let sqlQuery = `SELECT ${DBC.DB_STATE.fields[1]},${DBC.DB_STATE.fields[2]} FROM ${DBC.DATABASE_TABLE_STATE}`

      this.mDB.executeSql(sqlQuery, [])
        .then(result => {
          console.log("TABLE VERSIONS:", result.rows.length)
          // console.log(JSON.stringify(result.rows.item(1).option))
          if (result.rows.length < 3) {
            console.warn("ZERO RESULTS: call initTableVersions")
            this.initTableVersions().then(() => {
              console.log("RECEIVED RESULTS, REPEATING SQL")
              this.mDB.executeSql(sqlQuery, []).then(result => {
                console.log("RECEIVED RESULTS", result.rows.length)
                resolve(this._getTableVersions(result))
              }).catch(reject)
            }).catch(reject)
          } else {
            // we have results
            resolve(this._getTableVersions(result))
          }
        })
        .catch(error => {
          console.error("DB_Handler.getTableVersions(): Error:", error)
          reject(error)
        })
    })
  }

  //  Wird im ImageDownloader verwendet, dieser benötigt von allen Trails die Infos public und image
  // 15.05.18 - Select only public trails
  getTrailsImageInfo(): Promise<[string[]]> {
    return new Promise<[string[]]>((resolve, reject) => {
      this.mDB.executeSql(`SELECT public,image FROM ${DBC.DATABASE_TABLE_ROUTE} WHERE public = 1`, null)
        .then(result => {
          var info: [string[]] = null
          for (var i = 0; i < result.rows.length; i++) {
            let item = [result.rows.item(i).public, result.rows.item(i).image]
            if (info === null) {
              info = [item]
            } else {
              info.push(item)
            }
          }
          resolve(info)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

}