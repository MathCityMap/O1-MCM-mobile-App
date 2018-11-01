import { Injectable } from '@angular/core'
import { FileTransfer } from '@ionic-native/file-transfer'
import 'rxjs/add/operator/toPromise'
import * as Collections from 'typescript-collections'

import { DBC } from './DBC'
import { Helper } from './Helper'
import { DBC_Plan } from './DBC_Plan'
import { DB_Handler } from './DB_Handler'
import { ImagesService } from '../services/images-service';
import { checkAvailability } from '@ionic-native/core';
import { OrmService } from '../services/orm-service';
import { Route } from "../entity/Route";

@Injectable()
export class DB_Updater {
    constructor(private imagesService: ImagesService, private ormService: OrmService, private helper: Helper) {
    }

    /*
      Compare online and offline table versions and update if necessary
      14.05.2018 - Do not sync the tasks table anymore! (Gurjanow)
    */
    public async checkForUpdates() {
        let dbHandler = DB_Handler.getInstance()
        await dbHandler.ready();
        let db = dbHandler.getDB();
        let data = await this.helper.invokeApi('getVersionsV2'); // Gets table versions for mcm_route and mcm_rel_route_task
        if (!data) {
            return;
        }
        console.log("WAITING FOR offlineVersions")
        let offlineVersions = await dbHandler.getTableVersions()
        console.log("OFFLINE versions", offlineVersions)

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
        if (Number(offlineVersions.getValue("version_route")) < Number(onlineVersions.getValue("version_route"))) {
            // load routes with flags which need to be restored
            let downloadedRoutes = await this.ormService.getDownloadedRoutes();
            let unlockedRoutes = await this.ormService.getUnlockedRoutes();
            let completedRoutes = await this.ormService.getCompletedRoutes();

            // Routes need update
            await this.insertJSONinSQLiteDB(await this.helper.invokeApi('getRoutes'), DBC.DB_ROUTE);

            // Update local table
            console.log("UPDATING version_route VERSION!", onlineVersions.getValue("version_route"))
            await db.executeSql(sqlUpdateQuery,
                [
                    onlineVersions.getValue("version_route"),
                    "version_route"
                ]);
            let routesToSave = [];
            let alreadyVisitedIds = {};
            for (let oldRoute of downloadedRoutes.concat(unlockedRoutes).concat(completedRoutes)) {
                if (alreadyVisitedIds[oldRoute.id]) {
                    // this id has already been visited
                    continue;
                }
                let newRoute = await this.ormService.findRouteById(oldRoute.id);
                if (newRoute) {
                    newRoute.downloaded = oldRoute.downloaded;
                    newRoute.unlocked = oldRoute.unlocked;
                    newRoute.completed = oldRoute.completed;
                    alreadyVisitedIds[oldRoute.id] = true;
                    routesToSave.push(newRoute);
                }
            }
            let repo = await this.ormService.getRouteRepository();
            await repo.save(routesToSave);
            console.log("UPDATED VERSION!", "version_route");
        }
        if (Number(offlineVersions.getValue("version_rel_route_task")) < Number(onlineVersions.getValue("version_rel_route_task"))) {
            // Relation needs update
            await this.insertJSONinSQLiteDB(await this.helper.invokeApi('getRelations'), DBC.DB_RELROUTETASK);
            // Update local table
            console.log("UPDATING version_rel_route_task VERSION!", onlineVersions.getValue("version_rel_route_task"))
            await db.executeSql(sqlUpdateQuery,
                [
                    onlineVersions.getValue("version_rel_route_task"),
                    "version_rel_route_task"
                ]);
            console.log("UPDATED VERSION!", "version_rel_route_task")
        }
    }

    /*
      Get Rows in JSON form and a table definition
      Inserts Data from MYSQL online (represented as JSON) into sqlite database of app
    */
    private async insertJSONinSQLiteDB(data: any, table: DBC_Plan) {
        let sqlInsertQry = `INSERT INTO ${table.getTableName()} ${table.getFieldsInScopes()} VALUES ${table.getFieldsPlaceholders()};`
        let sqlReplaceIntoQry = `REPLACE INTO ${table.getTableName()} ${table.getFieldsInScopes()} VALUES ${table.getFieldsPlaceholders()};`
        let dbh = DB_Handler.getInstance()
        let db = dbh.getDB();
        if(table.getTableName() !== DBC.DATABASE_TABLE_TASK){
            await db.executeSql(`DELETE FROM ${table.getTableName()}`, null)
        }
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
                if(table.getTableName() !== DBC.DATABASE_TABLE_TASK){
                    tr.executeSql(sqlInsertQry, params)
                }
                else{
                    // For tasks: Replace rows when refreshing the trail
                    tr.executeSql(sqlReplaceIntoQry, params)
                }
            }
        }).catch(error => {
            console.error(`Transaction Error: ${error.toString()}`)
        })
    }

    /*
    Gets table data for a given route via API call "downloadTrail"
     */
    public async downloadRouteTasksData(route: Route, lang_code: string){
        let user_id = 0;
        let postparams = "&route_id=" + route.id + "&user_id=" + user_id + "&lang_code=" + lang_code;
        await this.insertJSONinSQLiteDB(await this.helper.invokeApi('downloadTrail', postparams), DBC.DB_TASK);
        // refresh the tasks
        route.tasks = await (await OrmService.INSTANCE.findRouteById(route.id)).getTasks();
    }

    /*
     Gets table data updates for a given route via API call "updateTrail"
     */
    public async updateRouteTasksData(route_id: number, lang_code: string){
        if(Helper.isOnline){
            let user_id = 0;
            let postparams = "&route_id=" + route_id + "&user_id=" + user_id + "&lang_code=" + lang_code;
            await this.insertJSONinSQLiteDB(await this.helper.invokeApi('updateTrail', postparams), DBC.DB_TASK);
        }
    }
}