import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/toPromise'
import * as Collections from 'typescript-collections'

import { AsyncTask } from './AsyncTask'
import { DBC } from './DBC'
import { Helper } from './Helper'
import { DBC_Plan } from '../classes/DBC_Plan'
import { DB_Handler } from '../classes/DB_Handler'

@Injectable()
export class DB_Updater extends AsyncTask<string[]> {
  constructor(private http: Http) {
    super()
  }

  onPreExecute() {
    console.log("onPreExecute ran");
    // Java: displays progress bar
  }

  onPostExecute() {
    console.log("onPostExecute ran");
    //     // If all tables are updated - start image download of routes
    //     if (Helper.routeTableUpdate == 1 && Helper.taskTableUpdate == 1 && Helper.relTableUpdate == 1 && Helper.routeTableNeedsUpdate == 1) {
    //         // System.out.println("Table update finished. Start download of routes images.");
    //         new ImageDownloaderRoutes(context, false).execute();
    //     }
    //     if(Helper.routeTableUpdate == 1 && Helper.taskTableUpdate == 1 && Helper.relTableUpdate == 1 && Helper.routeTableNeedsUpdate == 0){
    //         new ImageDownloaderRoutes(context, true).execute();
    //     }
    //     dialog.dismiss();
  }

  async doInBackground(params: string[]): Promise<any> {
    let queryAction = params[0]
    let table = params[1]
    let action = params[2]
    console.log("async runInBackground")

    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    })
    let options = new RequestOptions({ headers: headers });
    let data = "pass=" + encodeURI(Helper.REQUEST_PASS)
      + "&action=" + encodeURI(queryAction)

    return new Promise<any>((resolve, reject) => {
      this.http.post(Helper.API_URL, data, options)
        .toPromise()
        .then((response) => {
          console.log('API response: ', response.text().substr(0, 255))
          let resText = response.text()
          if (resText && resText.length > 0) {
            let tableRows = response.json()
            if (action === "update") {
              this.insertJSONinSQLiteDB(tableRows, DBC.MAP_DB.getValue(table)).then(() => {
                resolve()
              })
            } else if (action === "checkForUpdates") {
              this.checkForUpdates(tableRows, DBC.MAP_DB.getValue(table)).then(() => {
                resolve()
              })
            }
          }
        })
        .catch((error) => {
          console.error('API error(status): ', error.status)
          console.error('API error: ', JSON.stringify(error))
          
          reject(JSON.stringify(error))
          //         // Starte ImageDownloaderRoutes, damit die Listenelemente angezeigt werden
          //         // Sonst stürzt ab app
          //         parent.runOnUiThread(new Runnable() {
          //             @Override
          //             public void run() {
          //                 new ImageDownloaderRoutes(context, false).execute();
          //             }
          //         });
          //         e.printStackTrace();
          //         dialog.dismiss();
          //         Toast.makeText(context, "Error: Could not finish database update.", Toast.LENGTH_LONG).show();
          //         return new String("Exception: " + e.getMessage());
        })
    })
  }

  /*
    Compare online and offline table versions and update if necessary
  */
  private async checkForUpdates(data: any, table: DBC_Plan) {
    let dbHandler = DB_Handler.getInstance()
    let db = dbHandler.getWritableDatabase()
    console.log("WAITING FOR offlineVersions")
    let offlineVersions = await dbHandler.getTableVersions()
    console.log("OFFLINE versions", offlineVersions)
    Helper.taskTableUpdate = 0
    Helper.routeTableUpdate = 0
    Helper.relTableUpdate = 0
    Helper.routeTableNeedsUpdate = 0

    // Create structure
    let onlineVersions = new Collections.Dictionary<string, string>()
    for (var i = 0; i < data.length; i++) {
      let row = data[i]
      let option = row["option"]
      let value = row["value"]
      onlineVersions.setValue(option, value)
    }

    // Compare
    let sqlUpdateQuery = `UPDATE ${DBC.DATABASE_TABLE_STATE} SET ${DBC.DB_STATE.fields[2]} = ? WHERE ${DBC.DB_STATE.fields[1]} = ?`
    if (Number(offlineVersions.getValue("version_task")) < Number(onlineVersions.getValue("version_task"))) {
      // Tasks need update
      await new DB_Updater(this.http).execute(["getTasks", DBC.DATABASE_TABLE_TASK, "update"])
      // Update local table
      console.log("UPDATING version_task VERSION!", onlineVersions.getValue("version_task"))
      db.executeSql(sqlUpdateQuery,
        [
          onlineVersions.getValue("version_task"),
          "version_task"
        ]).then(() => {
          console.log("UPDATED VERSION!", "version_task")
        })
    } else {
      Helper.taskTableUpdate = 1
    }
    if (Number(offlineVersions.getValue("version_route")) < Number(onlineVersions.getValue("version_route"))) {
      // Routes need update
      Helper.routeTableNeedsUpdate = 1
      await new DB_Updater(this.http).execute(["getRoutes", DBC.DATABASE_TABLE_ROUTE, "update"])
      // Update local table
      console.log("UPDATING version_route VERSION!", onlineVersions.getValue("version_route"))
      db.executeSql(sqlUpdateQuery,
        [
          onlineVersions.getValue("version_route"),
          "version_route"
        ]).then(() => {
          console.log("UPDATED VERSION!", "version_route")
        })
    } else {
      Helper.routeTableUpdate = 1
    }
    if (Number(offlineVersions.getValue("version_rel_route_task")) < Number(onlineVersions.getValue("version_rel_route_task"))) {
      // Relation needs update
      await new DB_Updater(this.http).execute(["getRelations", DBC.DATABASE_TABLE_REL_ROUTE_TASK, "update"])
      // Update local table
      console.log("UPDATING version_rel_route_task VERSION!", onlineVersions.getValue("version_rel_route_task"))
      db.executeSql(sqlUpdateQuery,
        [
          onlineVersions.getValue("version_rel_route_task"),
          "version_rel_route_task"
        ]).then(() => {
          console.log("UPDATED VERSION!", "version_rel_route_task")
        })
    } else {
      Helper.relTableUpdate = 1
    }
  }

  /*
    Get Rows in JSON form and a table definition
    Inserts Data from MYSQL online (represented as JSON) into sqlite database of app
  */
  private async insertJSONinSQLiteDB(data: any, table: DBC_Plan) {
    let sqlInsertQry = `INSERT INTO ${table.getTableName()} ${table.getFieldsInScopes()} VALUES ${table.getFieldsPlaceholders()};`
    let dbh = DB_Handler.getInstance()
    let db = dbh.getWritableDatabase()
    await db.executeSql(`DELETE FROM ${table.getTableName()}`, null)
    await db.transaction(tr => {
      for (var i = 0; i < data.length; i++) {
        let row = data[i]
        var params = []
        for (var n = 1; n <= table.fieldsCount; n++) {
          // Check which data type is used in table > choose right bind
          if (table.fieldsType[n - 1] === "INTEGER") {
            // integer
            // params.push(n)
            params.push(Number(row[table.fields[n - 1]]))
          } else if (table.fieldsType[n - 1] === "VARCHAR"
            || table.fieldsType[n - 1] === "TEXT"
            || table.fieldsType[n - 1] === "TIMESTAMP") {
            // params.push(n)
            params.push(row[table.fields[n - 1]])
          } else {
            console.warn("Caution: Datatype not Integer, Varchar or Text!")
          }
        }
        tr.executeSql(sqlInsertQry, params)
      }
    }).catch(error => {
      console.error(`Transaction Error: ${error.toString()}`)
    })

    if (table.getTableName() === DBC.DATABASE_TABLE_TASK) {
      Helper.taskTableUpdate = 1
    } else if (table.getTableName() === DBC.DATABASE_TABLE_ROUTE) {
      Helper.routeTableUpdate = 1
    } else if (table.getTableName() === DBC.DATABASE_TABLE_REL_ROUTE_TASK) {
      Helper.relTableUpdate = 1
    }

    //parent.setUpdateProgress(parent.getUpdateProgress() + 25);
  }
}