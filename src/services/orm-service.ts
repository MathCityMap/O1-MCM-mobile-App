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

@Injectable()
export class OrmService {
    connection: Connection;
    private min_zoom: number = 16;
    private max_zoom: number = 19;
    public static INSTANCE: OrmService;

    constructor(private imagesService: ImagesService, private spinner: SpinnerDialog,
                private translateService: TranslateService, private platform: Platform) {
        OrmService.INSTANCE = this;
    }

    async getConnection(): Promise<Connection> {
        if (this.connection) {
            return this.connection;
        }
        await this.platform.ready();
        const sqliteAvailable = checkAvailability(SQLite.getPluginRef(), null, SQLite.getPluginName()) === true;
        const entities = [
            User,
            Route,
            State,
            Task,
            Score,
            Task2Route
        ];
        const migrations = [
            InitialMigration1513274191111,
            AddImageUrlAndDownloadedFlagMigration1513679923000,
            FailedTaskMigration1515428187000,
            AddUnlockedColumn1516037215000
        ];
        if (sqliteAvailable) {
            return this.connection = await createConnection({
                type: 'cordova',
                location: 'default',
                database: 'mcm_db.sqlite3',
                logging: ['error', 'query', 'schema'],
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
                logging: ['error', 'query', 'schema'],
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
        return await repo.findOneById(id);
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

    async getVisibleRoutes(showSpinner = true, compareFn = null): Promise<Route[]> {
        if (showSpinner) this.spinner.show(null, this.translateService.instant('a_toast_routes_loading'), true);
        let repo = await this.getRouteRepository();
        let result = await repo.createQueryBuilder('r').where('r.public = 1').orWhere('r.unlocked = 1').getMany();
        if (compareFn) {
            result.sort(compareFn);
        }
        if (showSpinner) this.spinner.hide();
        return result;
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

    async downloadRoute(route: Route, statusCallback) {
        try {
            statusCallback(0, 0, 'a_rdl_title_map');
            await CacheManagerMCM.downloadTiles(route.getBoundingBoxLatLng(), this.min_zoom, this.max_zoom, statusCallback);
            statusCallback(0, 0, 'a_rdl_title_img');
            await this.imagesService.downloadURLs(this.getDownloadImagesForTasks(await route.getTasks()), false, statusCallback);
            route.downloaded = true;
            const repo = await this.getRouteRepository();
            await repo.save(route);
        } catch (e) {
            console.log("download failed or was aborted");
            if (e.message) {
                console.log(e.message);
            }
            console.log(e);
            await this.removeDownloadedRoute(route);
        }
    }

    private getDownloadImagesForTasks(tasks: Task[]) {
        let result = [];
        tasks.map(task => task.getImagesForDownload()).map(images => {
            result = result.concat(images);
        });
        return result;
    }

    async removeDownloadedRoute(route: Route) {
        CacheManagerMCM.removeDownloadedTiles(route.getBoundingBoxLatLng(), this.min_zoom, this.max_zoom);
        this.imagesService.removeDownloadedURLs(this.getDownloadImagesForTasks(await route.getTasks()), false);
        route.downloaded = false;
        const repo = await this.getRouteRepository();
        await repo.save(route);
    }
}
