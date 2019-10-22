import { Injectable } from "@angular/core";
import { checkAvailability } from "@ionic-native/core";
import { SQLite } from '@ionic-native/sqlite';
import { Connection, createConnection, Repository } from "typeorm";

import { InitialMigration1513274191111 } from '../migration/1513274191111-InitialMigration';
import { FailedTaskMigration1515428187000 } from '../migration/1515428187000-failedTaskMigration';

import { User } from '../entity/User';
import { State } from '../entity/State';
import { Task } from '../entity/Task';
import { Route } from '../entity/Route';
import { AddImageUrlAndDownloadedFlagMigration1513679923000 } from '../migration/1513679923000-AddImageUrlAndDownloadedFlagMigration';
import { ImagesService } from './images-service';
import { CacheManagerMCM } from '../classes/CacheManagerMCM';
import { Score } from "../entity/Score";
import { TaskState } from "../entity/TaskState";
import { Task2Route } from '../entity/Task2Route';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'ionic-angular';
import { AddUnlockedColumn1516037215000 } from '../migration/1516037215000-AddUnlockedColumn';
import { AddCompletedColumn1519817905000 } from '../migration/1519817905000-AddCompletedColumn';
import { Subject } from 'rxjs/Subject';
import { DB_Handler } from '../classes/DB_Handler';
import {AddVisibleColumn1526306624000} from "../migration/1526306624000-AddVisibleColumn";
import {AddLangCodeColumn1526306730000} from "../migration/1526306730000-AddLangCodeColumn";
import {DB_Updater} from "../classes/DB_Updater";
import {Helper} from "../classes/Helper";

import {AddDownloadDateColumn15711518720000} from "../migration/15711518720000-AddDownloadDateColumn";
import {AddCompletedDateColumn15713974540000} from "../migration/15713974540000-AddCompletedDateColumn";

@Injectable()
export class OrmService {
    connection: Connection;
    public static INSTANCE: OrmService;
    public static EVENT_ROUTES_CHANGED = 'EVENT_ROUTES_CHANGED';
    private visibleRoutesCache : Route[];
    public eventEmitter = new Subject<String>();

    constructor(private imagesService: ImagesService, private spinner: SpinnerDialog,
                private translateService: TranslateService, private platform: Platform) {
        OrmService.INSTANCE = this;
    }

    async getConnection(): Promise<Connection> {
        if (this.connection) {
            return this.connection;
        }
        await this.platform.ready();
        await DB_Handler.getInstance().ready();
        const sqliteAvailable = checkAvailability(SQLite.getPluginRef(), null, SQLite.getPluginName()) === true;
        const entities = [
            User,
            Route,
            State,
            Task,
            Score,
            Task2Route
        ];

        // make sure to exclude Migration class names from UglifyJS to avoid name mangling (see config/uglifyjs.config.js)
        const migrations = [
            InitialMigration1513274191111,
            AddImageUrlAndDownloadedFlagMigration1513679923000,
            FailedTaskMigration1515428187000,
            AddUnlockedColumn1516037215000,
            AddCompletedColumn1519817905000,
            AddVisibleColumn1526306624000,
            AddLangCodeColumn1526306730000,
            AddDownloadDateColumn15711518720000,
            AddCompletedDateColumn15713974540000
        ];
        if (sqliteAvailable) {
            return this.connection = await createConnection({
                type: 'cordova',
                location: 'default',
                database: 'mcm_db.sqlite3',
                logging: ['error', /*'query', 'schema'*/],
                logger: 'simple-console',
                synchronize: false,
                entities: entities,
                migrationsRun: true,
                migrations: migrations
            });
        } else {
            return this.connection = await createConnection({
                type: 'websql',
                version: '1.0',
                description: 'MCM DB',
                size: 2 * 1024 * 1024,
                database: 'mcm',
                logging: ['error', /*'query', 'schema'*/],
                logger: 'simple-console',
                synchronize: false,
                entities: entities,
                migrationsRun: true,
                migrations: migrations
            });
        }
    }

    async getTaskRepository(): Promise<Repository<Task>> {
        let connection = await this.getConnection();
        return connection.getRepository(Task);
    }

    async getStateRepository(): Promise<Repository<State>> {
        let connection = await this.getConnection();
        return connection.getRepository(State);
    }

    async getScoreRepository(): Promise<Repository<Score>> {
        let connection = await this.getConnection();
        return connection.getRepository(Score);
    }

    async getRouteRepository(): Promise<Repository<Route>> {
        let connection = await this.getConnection();
        return connection.getRepository(Route);
    }

    async getUserRepository(): Promise<Repository<User>> {
        let connection = await this.getConnection();
        return connection.getRepository(User);
    }

    public async findRouteById(id: number): Promise<Route> {
        let repo = await this.getRouteRepository();
        let route = await repo.findOneById(id);
        return route;
    }

    public async findRouteByCode(code: string): Promise<Route> {
        let repo = await this.getRouteRepository();
        return await repo.findOne({where: {code: code}});
    }

    public async findScoreByRoute(id: number): Promise<Score> {
        let repo = await this.getScoreRepository();
        return await repo.findOne({where: {routeId: id}});
    }

    public async getAllTasks() {
        let repo = await this.getTaskRepository();
        let tasks = await repo.find({relations: ["routes"]});
        var solutionTypes: Array<string> = [];
        tasks.forEach(task => {
            if (solutionTypes.indexOf(task.solutionType) == -1) {
                solutionTypes.push(task.solutionType);
            }
            if (task.solutionType == "gps" && task.public == "1") {

                task.routes.forEach(route => {
                    if (route.public == "1") {
                        console.log(route);
                        console.log(task);
                    }
                });
            }

        })

    }

    public async findTaskById(id: number): Promise<Task> {
        let repo = await this.getTaskRepository();
        return await repo.findOneById(id);
    }


    async insertOrUpdateTaskState(score: Score, detailsToSave: TaskState) {
        let repo = await this.getScoreRepository();
        score.addTaskStateForTask(score.getTaskState(), detailsToSave);
        let user = await this.getActiveUser();
        score.userId = user.id;
        await repo.save(score);
        this.eventEmitter.next(OrmService.EVENT_ROUTES_CHANGED);
    }

    async deleteUserScore(score: Score) {
        let repo = await this.getScoreRepository();
        await repo.deleteById(score.id);
    }

    async setNewActiveUser(userName: string): Promise<User> {
        let repo = await this.getUserRepository();
        let user = new User();
        user.name = userName;

        await this.setActiveUser(userName);
        await repo.save(user);
        return user;
    }

    async setActiveUser(userName: string) {
        let repo = await this.getStateRepository();
        let state: State = await repo.findOne({where: {option: 'active_user'}})
        if (!state) {
            state = new State();
            state.option = "active_user";
        }
        state.value = userName;
        await repo.save(state);
    }

    async getActiveUser(): Promise<User> {
        let repo = await this.getStateRepository();
        let state = await repo.findOne({where: {option: 'active_user'}});
        let user = null;
        if (state && state.value) {
            user = await this.getUserByName(state.value);
        }
        return user;
    }

    async checkUsername(userName: string): Promise<boolean> {
        let user = await this.getUserByName(userName);
        if (user) {
            return true;
        }
        return false;
    }

    private async getUserByName(userName: string): Promise<User> {
        let repo = await this.getUserRepository();
        return await repo.findOne({where: {name: userName}});
    }

    async getVisibleRoutes(showSpinner = true, compareFn = null, forceUpdateFromDb = false): Promise<Route[]> {
        if (showSpinner) this.spinner.show(null, this.translateService.instant('a_toast_routes_loading'), true);
        if (!forceUpdateFromDb && this.visibleRoutesCache) {
            return new Promise<Route[]>(success => {
                setTimeout(() => {
                    if (compareFn) {
                        this.visibleRoutesCache.sort(compareFn);
                    }
                    if (showSpinner) {
                        setTimeout(() => {
                            this.spinner.hide();
                        }, 100);
                    }
                    success(this.visibleRoutesCache);
                }, 100);
            });
        }
        let repo = await this.getRouteRepository();
        let result = await repo.createQueryBuilder('r').where('r.public = 1').orWhere('r.unlocked = 1').getMany();
        if (compareFn) {
            result.sort(compareFn);
        }
        if (!this.visibleRoutesCache) {
            this.visibleRoutesCache = result;
        } else {
            // add objects to existing array (because it is referenced by views)
            this.visibleRoutesCache.splice(0, this.visibleRoutesCache.length);
            result.map(route => this.visibleRoutesCache.push(route));
        }
        if (showSpinner) {
            setTimeout(() => {
                this.spinner.hide();
            }, 100);
        }
        return this.visibleRoutesCache;
    }

    async getDownloadedRoutes(): Promise<Route[]> {
        let repo = await this.getRouteRepository();
        let result = await repo.find({
            where: {
                downloaded: '1'
            }
        });
        return result;
    }

    async getUnlockedRoutes(): Promise<Route[]> {
        let repo = await this.getRouteRepository();
        let result = await repo.find({
            where: {
                unlocked: '1'
            }
        });
        return result;
    }

    async getCompletedRoutes(): Promise<Route[]> {
        let repo = await this.getRouteRepository();
        let result = await repo.find({
            where: {
                completed: '1'
            }
        });
        return result;
    }

    async downloadRoute(route: Route, statusCallback, dbUpdater: DB_Updater) {
        let alreadyDownloadedUrls = [];
        try {
            // 15.04.18 - get data rows for route tasks from online DB first
            await dbUpdater.downloadRouteTasksData(route, this.translateService.instant("a_language_code"));
            statusCallback(0, 0, 'a_rdl_title_map');
            await CacheManagerMCM.downloadTiles(route.getBoundingBoxLatLng(), Helper.min_zoom, Helper.max_zoom, (done, total, url) => {
                alreadyDownloadedUrls.push(url);
                return statusCallback(done, total);
            });
            statusCallback(0, 0, 'a_rdl_title_img');
            await this.imagesService.downloadURLs(this.getDownloadImagesForTasks(await route.getTasks()), false, (done, total, url) => {
                alreadyDownloadedUrls.push(url);
                return statusCallback(done, total);
            });
            route.downloaded = true;
            route.downloadedDate = new Date().toDateString();
            const repo = await this.getRouteRepository();
            await repo.save(route);
            this.updateRouteInCache(route);
        } catch (e) {
            console.log("download failed or was aborted");
            if (e.message) {
                console.log(e.message);
            }
            console.log(e);
            await this.imagesService.removeDownloadedURLs(alreadyDownloadedUrls, false);
        }
    }

    getTileURLs(route: Route) {
        return CacheManagerMCM.getTileURLs(route.getBoundingBoxLatLng(), Helper.min_zoom, Helper.max_zoom);
    }

    getTileURLsAsObject(route: Route) {
        let tiles = this.getTileURLs(route);
        let result = {};
        for (let tile of tiles) {
            result[tile] = true;
        }
        return result;
    }

    private getDownloadImagesForTasks(tasks: Task[]) {
        let result = [];
        tasks.map(task => task.getImagesForDownload()).map(images => {
            result = result.concat(images);
        });
        return result;
    }

    async removeDownloadedRoute(route: Route, removeTiles = false): Promise<Route> {
        // Reset route before removing
        let user = await this.getActiveUser();
        await this.deleteUserScore((await this.findRouteById(route.id)).getScoreForUser(user));
        if (removeTiles) {
            await this.imagesService.removeDownloadedURLs(this.getTileURLs(route), false);
        }
        this.imagesService.removeDownloadedURLs(this.getDownloadImagesForTasks(await route.getTasks()), false);
        route.downloaded = false;
        route.downloadedDate = null;
        const repo = await this.getRouteRepository();
        await repo.save(route);
        this.updateRouteInCache(route);
        return route;
    }

    async unlockRoute(route: Route) {
        route.unlocked = true;
        (await this.getRouteRepository()).save(route);
        this.imagesService.downloadURLs([route.image], true);
        this.updateRouteInCache(route);
    }

    async saveAndFireChangedEvent(route: Route) {
        await (await this.getRouteRepository()).save(route);
        this.updateRouteInCache(route);
        this.eventEmitter.next(OrmService.EVENT_ROUTES_CHANGED);
    }

    async removeAllDownloadedData() {
        let routes = await this.getDownloadedRoutes();
        for (let route of routes) {
            await this.removeDownloadedRoute(route, true);
        }
        this.eventEmitter.next(OrmService.EVENT_ROUTES_CHANGED);
    }

    private updateRouteInCache(routeToUpdate: Route) {
        if (this.visibleRoutesCache) {
            for (let i = 0; i < this.visibleRoutesCache.length; i++) {
                if (this.visibleRoutesCache[i].id == routeToUpdate.id) {
                    this.visibleRoutesCache[i] = routeToUpdate;
                    break;
                }
            }
        }
        this.eventEmitter.next(OrmService.EVENT_ROUTES_CHANGED);
    }
}
